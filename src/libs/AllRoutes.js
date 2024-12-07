export const userType = () =>{
    return localStorage.getItem("type");
}

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
        { name: "Library", link: "/libowner" },
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
        { name: "Libraries", link: "/alllibraries" },
        { name: "Requests", link: "/request" },
        { name: "Dashboard", link: "/" }
    ]
};

const genLinks = [
    { name: "About", link: "/" },
    { name: "Result", link: "/results" },
    { name: "E-Books", link: "/ebooks" },
    { name: "Contact Us", link: "/contactus" }
]


export default genLinks;