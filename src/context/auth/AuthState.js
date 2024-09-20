import React, { useState } from 'react';
import AuthContext from './authContext';
import genLinks, { superadmin, student, editor, owner } from '../../libs/AllRoutes';

const AuthState = (props) => {

    const [islogedin, setIsloggedin] = useState(false);
    const [userType, setUserType] = useState("");
    const [allLinks, setAllLinks] = useState(genLinks);

    const setLinks = (type)=>{
        if(type === "superadmin"){
            setAllLinks(superadmin);
        }
        else if(type === "student"){
            setAllLinks(student)
        }
        else if(type === "editor"){
            setAllLinks(editor);
        }
        else if(type === "libowner"){
            setAllLinks(owner);
        }
        else{
            setAllLinks(genLinks);
        }
    }

    return (
        <AuthContext.Provider value={{
            islogedin, setIsloggedin,
            userType, setUserType,
            allLinks, setLinks
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;