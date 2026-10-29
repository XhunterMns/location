import type { ComponentInterface } from '../../stencil-public-runtime';
import type { SelectModalOption } from './select-modal-interface';
export declare class SelectModal implements ComponentInterface {
    el: HTMLIonSelectModalElement;
    private pendingEnterTarget;
    header?: string;
    /**
     * The text to display on the cancel button.
     */
    cancelText: string;
    multiple?: boolean;
    options: SelectModalOption[];
    private closeModal;
    private findOptionFromEvent;
    private getValues;
    private callOptionHandler;
    private setChecked;
    private renderRadioOptions;
    private renderCheckboxOptions;
    render(): any;
}
