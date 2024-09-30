import { toast } from "react-toastify";

const isEmpty = (value, name) => {
    if (!value) {
        toast.warn(`Please enter the ${name}`);
        return true;
    }

    return false;
};

const isValidEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
        toast.warn("Please enter a valid Email");
        return true;
    }

    return false;
};

const isValidContact = (value) => {
    const emailRegex = /^\d{10}$/;
    if (!emailRegex.test(value)) {
        toast.warn("Please enter a valid contact number");
        return true;
    }

    return false;
};

export const libownerProfileValidation = (ProfileDet) => {
    if (isEmpty(ProfileDet.name, "name")) { return false; }
    if (isEmpty(ProfileDet.firmname, "Library Name")) { return false; }
    if (isEmpty(ProfileDet.contactnum, "contact number")) { return false; }
    if (ProfileDet.contactnum.length !== 10) {
        toast.warn("Please enter the 10 digit phone number");
        return false;
    }
    if (isValidContact(ProfileDet.contactnum)) { return false; }
    if (ProfileDet.emgcontactnum) {
        if (ProfileDet.emgcontactnum.length !== 10) {
            toast.warn("Please enter the 10 digit secondary phone number");
            return false;
        }
        if (isValidContact(ProfileDet.emgcontactnum)) { return false; }
    }

    if (isEmpty(ProfileDet.address, "address")) { return false; }
    if (isEmpty(ProfileDet.maplink, "embed map link")) { return false; }

    return true;
};

export const loginValidation = (loginDet) => {
    if (isEmpty(loginDet.email, "email")) { return false; }
    if (isValidEmail(loginDet.email)) { return false; }
    if (isEmpty(loginDet.password, "password")) { return false; }
    if (loginDet.password.length < 8) {
        toast.warn("Password should be at least 8 characters long");
        return false;
    }

    return true;
};

export const EbookValidation = (ebookDetail) => {
    if (isEmpty(ebookDetail.name, "E-book name")) { return false; }
    if (isEmpty(ebookDetail.authname, "author name")) { return false; }
    if (isEmpty(ebookDetail.published, "published date")) { return false; }
    if (isEmpty(ebookDetail.ebooklink, "ebook link")) { return false; }

    return true;
};

export const resultsValidation = (appDetails) => {
    if (isEmpty(appDetails.appname, "application name")) { return false; }
    if (isEmpty(appDetails.formlink, "form link")) { return false; }
    if (isEmpty(appDetails.youtubelink, "youtube link")) { return false; }
    if (isEmpty(appDetails.endformdate, "last date")) { return false; }
    if (isEmpty(appDetails.expirydate, "expiry date")) { return false; }

    return true;
};

const signupValidation = (signupDet) => {
    if (isEmpty(signupDet.name, "name")) { return false; }
    if (isEmpty(signupDet.email, "email")) { return false; }
    if (isValidEmail(signupDet.email)) { return false; }
    if (isEmpty(signupDet.password, "password")) { return false; }
    if (signupDet.password.length < 8) {
        toast.warn("Password should be at least 8 characters long");
        return false;
    }
    if (isEmpty(signupDet.confPassword, "confirm password")) { return false; }
    if (signupDet.password !== signupDet.confPassword) {
        toast.warn("Confirm password do not match!");
        return false;
    }

    return true;
};

export default signupValidation;