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
        toast.warn("Please enter a valid 10 digits contact number");
        return true;
    }

    return false;
};

export const libownerProfileValidation = (ProfileDet) => {
    if (isEmpty(ProfileDet.name, "name")) { return false; }
    if (isEmpty(ProfileDet.firmname, "Library Name")) { return false; }
    if (isEmpty(ProfileDet.contactnum, "contact number")) { return false; }
    if (isValidContact(ProfileDet.contactnum)) { return false; }
    if (ProfileDet.emgcontactnum) {
        if (isValidContact(ProfileDet.emgcontactnum)) { return false; }
    }

    if (isEmpty(ProfileDet.address, "address")) { return false; }
    if (isEmpty(ProfileDet.maplink, "embed map link")) { return false; }

    return true;
};

export const contactValidation = (contactDetails) => {
    if (isEmpty(contactDetails.name, "name")) { return false; }
    if (isEmpty(contactDetails.contactnum, "contact number")) { return false; }
    if (isValidContact(contactDetails.contactnum)) { return false; }
    if (isEmpty(contactDetails.email, "email")) { return false; }
    if (isValidEmail(contactDetails.email)) { return false; }
    if (isEmpty(contactDetails.message, "message")) { return false; }

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