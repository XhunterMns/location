import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LandlordService } from '../../users/landlord.service';
import { firstValueFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-local',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-local.component.html',
  styleUrls: ['./add-local.component.css']
})
export class AddLocalComponent {
  constructor(private service: LandlordService, private router: Router) {}
  selectedFiles: File[] = [];
  uploadError = '';
  private readonly maxFileSizeMb = 5;
  private readonly maxFilesPerUpload = 6;

  public localForm = new FormGroup({
    titre: new FormControl('', [Validators.required]),
    adresse: new FormControl('', [Validators.required]),
    description: new FormControl('', []),
    prix: new FormControl(0, [Validators.required])
  });

  async submit() {
    if (this.localForm.valid) {
      this.uploadError = '';
      this.service.addLocal(this.localForm.value).subscribe({
        next: async (created: any) => {
          const localId = created?.id;
          if (localId && this.selectedFiles.length > 0) {
            try {
              for (const file of this.selectedFiles) {
                const res: any = await firstValueFrom(this.service.uploadImageFile(localId, file));
                if (!res || !res.count) {
                  throw new Error('Image upload did not return success');
                }
              }
              this.router.navigate(['/landlord']);
              return;
            } catch (err) {
              console.error('Error uploading images:', err);
              const httpErr = err as HttpErrorResponse;
              if (httpErr.status === 404) {
                this.uploadError = 'Upload route not found on backend. Restart backend server to load /image-binary.';
                return;
              }
              if (httpErr.status === 413) {
                this.uploadError = 'Image is too large for backend limit. Try a smaller image.';
                return;
              }
              this.uploadError = 'Image upload failed. Please try again.';
              return;
            }
          }
          this.router.navigate(['/landlord']);
        },
        error: (err) => console.error(err)
      });
    }
  }

  onFilesSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const files = input.files ? Array.from(input.files) : [];
    const maxBytes = this.maxFileSizeMb * 1024 * 1024;
    const limitedFiles = files.slice(0, this.maxFilesPerUpload);
    const oversized = limitedFiles.filter((f) => f.size > maxBytes);

    if (oversized.length) {
      this.uploadError = `Some files are too large. Max allowed is ${this.maxFileSizeMb}MB per image.`;
      this.selectedFiles = limitedFiles.filter((f) => f.size <= maxBytes);
      return;
    }

    if (files.length > this.maxFilesPerUpload) {
      this.uploadError = `Only the first ${this.maxFilesPerUpload} images will be uploaded.`;
      this.selectedFiles = limitedFiles;
      return;
    }

    this.uploadError = '';
    this.selectedFiles = limitedFiles;
  }

  close() {
    this.router.navigate(['/landlord']);
  }
}
