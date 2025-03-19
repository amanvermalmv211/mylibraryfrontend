export const userType = () => {
    return localStorage.getItem("type");
}

export const monthsname = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export const getStTime = (shift) => {
    return Number(shift.stTime) === 0 ? `12 AM` : Number(shift.stTime) < 12 ? `${shift.stTime} AM` : Number(shift.stTime) === 12 ? `${shift.stTime} PM` : `${Number(shift.stTime) - 12} PM`;
}

export const getEndTime = (shift) => {
    return Number(shift.endTime) === 0 ? `12 AM` : Number(shift.endTime) < 12 ? `${shift.endTime} AM` : Number(shift.endTime) === 12 ? `${shift.endTime} PM` : `${Number(shift.endTime) - 12} PM`;
}

export const footerLinks = () => {
    return [
        { name: "About", link: "/about" },
        { name: "Result", link: "/sarkari-results" },
        { name: "E-Books", link: "/ebooks" },
        { name: "Contact Us", link: "/contact" },
        { name: "Terms & Conditions", link: "/terms-and-conditions" }
    ]
};

export const student = () => {
    return [
        { name: "Result", link: "/sarkari-results" },
        { name: "E-Books", link: "/ebooks" },
        { name: "Library", link: "/student/subscription" }
    ]
};

export const owner = () => {
    return [
        { name: "Result", link: "/sarkari-results" },
        { name: "Library", link: "/libowner/library" },
        { name: "Requests", link: "/libowner/library/requests" },
        { name: "Students", link: "/libowner/library/students" }
    ]
};

export const editor = () => {
    return [
        { name: "Result", link: "/sarkari-results" },
        { name: "E-Books", link: "/ebooks" },
        { name: "Requests", link: "/" }
    ]
};

export const superadmin = () => {
    return [
        { name: "Libraries", link: "/admin/alllibraries" },
        { name: "Requests", link: "/admin/request" },
        { name: "Dashboard", link: "/" }
    ]
};

const genLinks = [
    { name: "About", link: "/about" },
    { name: "Result", link: "/sarkari-results" },
    { name: "E-Books", link: "/ebooks" },
    { name: "Contact Us", link: "/contact" }
]


export default genLinks;