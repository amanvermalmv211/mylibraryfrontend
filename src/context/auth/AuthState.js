import React, { useState } from 'react';
import AuthContext from './authContext';
import genLinks, { superadmin, student, editor, owner, userType } from '../../libs/AllRoutes';
import { toast } from 'react-toastify';

const AuthState = (props) => {

    const [islogedin, setIsloggedin] = useState(localStorage.getItem("authtoken"));
    const [userProfile, setUserProfile] = useState("login");
    const [loading, setLoading] = useState(false);
    const [allLinks, setAllLinks] = useState(genLinks);

    const setLinks = () => {
        if (userType() === "admin") {
            setAllLinks(superadmin);
        }
        else if (userType() === "student") {
            setAllLinks(student)
        }
        else if (userType() === "editor") {
            setAllLinks(editor);
        }
        else if (userType() === "libowner") {
            setAllLinks(owner);
        }
        else {
            setAllLinks(genLinks);
        }
    }

    const invalidUser = () => {
        localStorage.removeItem("type");
        localStorage.removeItem("authtoken");
        setLinks();
        setUserProfile("login")
        setIsloggedin(false);
        toast.warn("Invalid User");
    }

    return (
        <AuthContext.Provider value={{
            allLinks, setLinks,
            loading, setLoading,
            islogedin, setIsloggedin,
            userProfile, setUserProfile, invalidUser
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;