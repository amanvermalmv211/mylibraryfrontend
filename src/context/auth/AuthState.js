import React, { useState } from 'react';
import AuthContext from './authContext';
import genLinks, { superadmin, student, editor, owner, userType } from '../../libs/AllRoutes';
import { toast } from 'react-toastify';
import apiList from '../../libs/apiLists';

const AuthState = (props) => {

    const [islogedin, setIsloggedin] = useState(localStorage.getItem("authtoken"));
    const [userProfile, setUserProfile] = useState("login");
    const [loading, setLoading] = useState(true);
    const [libraryDetails, setLibraryDetails] = useState({});
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

    const getLibOwner = async () => {
        setLoading(true);
        try {
            const response = await fetch(apiList.getlibowner, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authtoken': localStorage.getItem("authtoken")
                }
            });

            const json = await response.json();
            if (json.success) {
                setLibraryDetails(json.data);
                setLoading(false);
            }
            else {
                toast.warn(json.message);
            }
        }
        catch (err) {
            toast.warn(`LibOwnerProfile : ${err.message}`);
        }
    };

    return (
        <AuthContext.Provider value={{
            allLinks, setLinks,
            loading, setLoading,
            islogedin, setIsloggedin,
            userProfile, setUserProfile, invalidUser,
            libraryDetails, setLibraryDetails, getLibOwner
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;