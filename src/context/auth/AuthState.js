import React, { useState } from 'react';
import AuthContext from './authContext';
import genLinks, { superadmin, student, editor, owner, userType } from '../../libs/AllRoutes';

const AuthState = (props) => {

    const [islogedin, setIsloggedin] = useState(localStorage.getItem("authtoken"));
    const [userProfile, setUserProfile] = useState("login");
    const [loading, setLoading] = useState(false);
    const [allLinks, setAllLinks] = useState(genLinks);

    const setLinks = ()=>{
        if(userType() === "superadmin"){
            setAllLinks(superadmin);
        }
        else if(userType() === "student"){
            setAllLinks(student)
        }
        else if(userType() === "editor"){
            setAllLinks(editor);
        }
        else if(userType() === "libowner"){
            setAllLinks(owner);
        }
        else{
            setAllLinks(genLinks);
        }
    }

    return (
        <AuthContext.Provider value={{
            allLinks, setLinks,
            loading, setLoading,
            islogedin, setIsloggedin,
            userProfile, setUserProfile
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;