// TODO(FW-2827): types
export class OverlayBaseController {
    ctrl;
    constructor(ctrl) {
        this.ctrl = ctrl;
    }
    /**
     * Creates a new overlay
     */
    create(opts) {
        return this.ctrl.create((opts || {}));
    }
    /**
     * When `id` is not provided, it dismisses the top overlay.
     */
    dismiss(data, role, id) {
        return this.ctrl.dismiss(data, role, id);
    }
    /**
     * Returns the top overlay.
     */
    getTop() {
        return this.ctrl.getTop();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmxheS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2NvbW1vbi9zcmMvdXRpbHMvb3ZlcmxheS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSx1QkFBdUI7QUFRdkIsTUFBTSxPQUFPLHFCQUFxQjtJQUNaO0lBQXBCLFlBQW9CLElBQW9DO1FBQXBDLFNBQUksR0FBSixJQUFJLENBQWdDO0lBQUcsQ0FBQztJQUU1RDs7T0FFRztJQUNILE1BQU0sQ0FBQyxJQUFXO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFRLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxPQUFPLENBQUMsSUFBVSxFQUFFLElBQWEsRUFBRSxFQUFXO1FBQzVDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxNQUFNO1FBQ0osT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQzVCLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbIi8vIFRPRE8oRlctMjgyNyk6IHR5cGVzXG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29udHJvbGxlclNoYXBlPE9wdHMsIEhUTUxFbG0+IHtcbiAgY3JlYXRlKG9wdGlvbnM6IE9wdHMpOiBQcm9taXNlPEhUTUxFbG0+O1xuICBkaXNtaXNzKGRhdGE/OiBhbnksIHJvbGU/OiBzdHJpbmcsIGlkPzogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPjtcbiAgZ2V0VG9wKCk6IFByb21pc2U8SFRNTEVsbSB8IHVuZGVmaW5lZD47XG59XG5cbmV4cG9ydCBjbGFzcyBPdmVybGF5QmFzZUNvbnRyb2xsZXI8T3B0cywgT3ZlcmxheT4gaW1wbGVtZW50cyBDb250cm9sbGVyU2hhcGU8T3B0cywgT3ZlcmxheT4ge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGN0cmw6IENvbnRyb2xsZXJTaGFwZTxPcHRzLCBPdmVybGF5Pikge31cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBvdmVybGF5XG4gICAqL1xuICBjcmVhdGUob3B0cz86IE9wdHMpOiBQcm9taXNlPE92ZXJsYXk+IHtcbiAgICByZXR1cm4gdGhpcy5jdHJsLmNyZWF0ZSgob3B0cyB8fCB7fSkgYXMgYW55KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXaGVuIGBpZGAgaXMgbm90IHByb3ZpZGVkLCBpdCBkaXNtaXNzZXMgdGhlIHRvcCBvdmVybGF5LlxuICAgKi9cbiAgZGlzbWlzcyhkYXRhPzogYW55LCByb2xlPzogc3RyaW5nLCBpZD86IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLmN0cmwuZGlzbWlzcyhkYXRhLCByb2xlLCBpZCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgdG9wIG92ZXJsYXkuXG4gICAqL1xuICBnZXRUb3AoKTogUHJvbWlzZTxPdmVybGF5IHwgdW5kZWZpbmVkPiB7XG4gICAgcmV0dXJuIHRoaXMuY3RybC5nZXRUb3AoKTtcbiAgfVxufVxuIl19