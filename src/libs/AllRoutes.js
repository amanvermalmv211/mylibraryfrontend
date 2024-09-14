const genLinks = [
    { name: "About", link: "" },
    { name: "Result", link: "/results" },
    { name: "E-Books", link: "/ebooks" },
    { name: "Contact Us", link: "/contactus" }
]

export const student = () => {
    return [
        { name: "Result", link: "/results" },
        { name: "E-Books", link: "/ebooks" },
        { name: "Library", link: "/" }
    ]
};

export const owner = () => {
    return [
        { name: "Result", link: "/results" },
        { name: "Library", link: "/" },
        { name: "Dashboard", link: "/" },
        { name: "Management", link: "/" }
    ]
};

export const editor = () => {
    return [
        { name: "Result", link: "/results" },
        { name: "E-Books", link: "/ebooks" },
        { name: "Requests", link: "/" }
    ]
};

export const superadmin = () => {
    return [
        { name: "Libraries", link: "/results" },
        { name: "Dashboard", link: "/" },
        { name: "Requests", link: "/" }
    ]
};

export default genLinks;