/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
'use strict';

/**
 * Checks if the form element is in an invalid state based on
 * Ionic validation classes.
 *
 * @param el The form element to check.
 * @returns `true` if the element is invalid, `false` otherwise.
 */
const checkInvalidState = (el) => {
    const hasIonTouched = el.classList.contains('ion-touched');
    const hasIonInvalid = el.classList.contains('ion-invalid');
    return hasIonTouched && hasIonInvalid;
};

exports.checkInvalidState = checkInvalidState;
