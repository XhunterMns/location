/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
import { r as registerInstance, h, d as Host } from './index-tcQvqkiX.js';
import { c as createColorClasses } from './theme-DiVJyqlX.js';
import { b as getIonMode } from './ionic-global-Cp_eT4sZ.js';

const textCss = () => `:host(.ion-color){color:var(--ion-color-base)}`;

const Text = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    render() {
        const mode = getIonMode(this);
        return (h(Host, { key: 'bfaa49d35f43b8036725ae8a322c716fc6e43bdf', class: createColorClasses(this.color, {
                [mode]: true,
            }) }, h("slot", { key: 'c04880cd1935b42cbe60f58fd523b4d8a96072dc' })));
    }
};
Text.style = textCss();

export { Text as ion_text };
