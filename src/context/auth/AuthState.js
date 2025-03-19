import React, { useState } from 'react';
import AuthContext from './authContext';
import genLinks, { superadmin, student, editor, owner, userType } from '../../libs/AllRoutes';
import { toast } from 'react-toastify';
import apiList from '../../libs/apiLists';

const AuthState = (props) => {

    const [islogedin, setIsloggedin] = useState(localStorage.getItem("authtoken"));
    const [userProfile, setUserProfile] = useState("login");
    const [loading, setLoading] = useState(true);
    const [activeStd, setActiveStd] = useState(100);
    const [studentDetails, setStudentDetails] = useState({});
    const [libraryDetails, setLibraryDetails] = useState({});
    const [allLinks, setAllLinks] = useState(genLinks);
    const [searchLibRes, setSearchLibRes] = useState([]);

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
        setStudentDetails({});
        setLibraryDetails({});
    }

    const getLibOwner = async () => {
        setLoading(true);
        if (localStorage.getItem("isallowed") !== "true") {
            return;
        }
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
                let count = 0;
                for (let i = 0; i < json.data.floors.length; i++) {
                    let floor = json.data.floors[i];
                    for (let j = 0; j < floor.shifts.length; j++) {
                        let shift = floor.shifts[j];
                        for (let k = 0; k < shift.numberOfSeats.length; k++) {
                            let seatData = shift.numberOfSeats[k];
                            if (seatData.isBooked) {
                                count += 1;
                            }
                        }
                    }
                }
                setActiveStd(count);
                localStorage.setItem("expiryDate", json.data.subscriptionDetails.expiryDate);
                localStorage.setItem("subscriptionDate", json.data.subscriptionDetails.subscriptionDate);
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

    const getStudent = async () => {
        setLoading(true);

        try {
            const response = await fetch(apiList.getstudent, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authtoken': localStorage.getItem("authtoken")
                }
            });

            const json = await response.json();
            if (json.success) {
                setStudentDetails(json.data);
                setLoading(false);
            }
            else {
                toast.warn(json.message);
            }
        }
        catch (err) {
            toast.warn(`StudentProfile : ${err.message}`);
        }
    };

    return (
        <AuthContext.Provider value={{
            allLinks, setLinks,
            loading, setLoading,
            activeStd, setActiveStd,
            islogedin, setIsloggedin,
            searchLibRes, setSearchLibRes,
            userProfile, setUserProfile, invalidUser,
            libraryDetails, setLibraryDetails, getLibOwner,
            studentDetails, setStudentDetails, getStudent
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;