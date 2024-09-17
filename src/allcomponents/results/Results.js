import React, { useEffect, useRef, useState } from 'react'
import DeleteModal, { FormModal } from '../notificationmessage/Modal';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { RiDeleteBack2Line } from 'react-icons/ri';
import apiList from '../../libs/apiLists';
import { resultsValidation } from '../../libs/Validation';
import { toast } from 'react-toastify';

const Results = () => {

    const shouldDo = useRef(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Results - ML";
        if (shouldDo.current) {
            getResults();
            shouldDo.current = false;
        }
    }, []);

    const [govJob, setGovJob] = useState([]);
    const [OthJob, setOthJob] = useState([]);
    const [admitCard, setAdmitCard] = useState([]);
    const [open, setOpen] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [openDel, setOpenDel] = useState(false);
    const [spinLoading, setSpinLoading] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    const allData = [{
        name: "Government Jobs",
        data: govJob
    },
    {
        name: "Other Applications",
        data: OthJob
    },
    {
        name: "Admit Card",
        data: admitCard
    }]

    useEffect(() => {
        if (open || openUpdate || openDel) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }

        return () => {
            document.body.classList.remove('modal-open');
        };

    }, [open, openUpdate, openDel]);

    const [appDetails, setAppDetails] = useState({
        papername: "Government Jobs",
        appname: "",
        formlink: "",
        youtubelink: "",
        endformdate: "",
        expirydate: ""
    });

    const handleOnChange = (key, value) => {
        setAppDetails({
            ...appDetails,
            [key]: value
        })
    };

    const handleSetFalse = () => {
        setSpinLoading(false);
        setOpen(!open);
        setIsClicked(false);
        setAppDetails({ papername: "Government Jobs", appname: "", formlink: "", youtubelink: "", endformdate: "", expirydate: "" })
    };

    const handleOpen = (appDetails, openPass) => {
        if (openPass) {
            setOpenUpdate(true);
        }
        else {
            setOpenDel(true);
        }
        setAppDetails(appDetails);
    };

    const handleAddBook = async () => {
        if (!resultsValidation(appDetails)) { return }

        if (!isClicked) {
            setIsClicked(true);
            try {
                setSpinLoading(true);
                const response = await fetch(apiList.addapp, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'authtoken': localStorage.getItem("authtoken")
                    },
                    body: JSON.stringify(appDetails)
                });

                const json = await response.json();
                if (json.success) {
                    toast.success(json.message);
                    handleSetFalse();
                    if (appDetails.papername === "Government Jobs") {
                        setGovJob(govJob.concat(json.result));
                    }
                    else if (appDetails.papername === "Other Applications") {
                        setOthJob(OthJob.concat(json.result));
                    }
                    else {
                        setAdmitCard(admitCard.concat(json.result));
                    }
                }
                else {
                    toast.error(json.message);
                    handleSetFalse();
                }
            }
            catch (err) {
                toast.warn("Internal Server Error");
                handleSetFalse();
            }

        }
    };

    const handleUpdateEbook = async () => {
        if (!resultsValidation(appDetails)) { return }
        setSpinLoading(true);
        if (!isClicked) {
            setIsClicked(true);
            try {
                const response = await fetch(apiList.updateapp + `/${appDetails._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'authtoken': localStorage.getItem("authtoken")
                    },
                    body: JSON.stringify(appDetails)
                });

                const json = await response.json();
                if (json.success) {
                    toast.success(json.message);
                    if (appDetails.papername === "Government Jobs") {
                        for (let i = 0; i < govJob.length; i++) {
                            if (govJob[i]._id === json.data._id) {
                                govJob[i] = json.data
                                break;
                            }
                        }
                    }
                    else if (appDetails.papername === "Other Applications") {
                        for (let i = 0; i < OthJob.length; i++) {
                            if (OthJob[i]._id === json.data._id) {
                                OthJob[i] = json.data
                                break;
                            }
                        }
                    }
                    else {
                        for (let i = 0; i < admitCard.length; i++) {
                            if (admitCard[i]._id === json.data._id) {
                                admitCard[i] = json.data
                                break;
                            }
                        }
                    }
                    setOpenUpdate(false);
                    setIsClicked(false);
                    setSpinLoading(false);
                }
                else {
                    toast.error(json.message);
                    setOpenUpdate(false);
                    setIsClicked(false);
                    setSpinLoading(false);
                }
            }
            catch (err) {
                toast.warn(err.message);
                setOpenUpdate(false);
                setSpinLoading(false);
                setIsClicked(false);
            }

        }
    };

    const handleDeleteEbook = async () => {
        if (!isClicked) {
            setIsClicked(true);
            try {
                const response = await fetch(apiList.deleteapp + `/${appDetails._id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'authtoken': localStorage.getItem("authtoken")
                    }
                });

                const json = await response.json();
                if (json.success) {
                    toast.success(json.message);
                    setOpenDel(false);
                    setIsClicked(false);
                    if (appDetails.papername === "Government Jobs") {
                        setGovJob(govJob.filter((data) => { return data._id !== appDetails._id }))
                    }
                    else if (appDetails.papername === "Other Applications") {
                        setOthJob(OthJob.filter((data) => { return data._id !== appDetails._id }))
                    }
                    else {
                        setAdmitCard(admitCard.filter((data) => { return data._id !== appDetails._id }))
                    }
                }
                else {
                    toast.error(json.message);
                    setOpenDel(false);
                    setIsClicked(false);
                }
            }
            catch (err) {
                toast.warn("Internal Server Error");
                setOpenDel(false);
                setIsClicked(false);
            }

        }
    };

    const getResults = async () => {
        try {
            const response = await fetch(apiList.getresults, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const json = await response.json();
            if (json.success) {
                const results = json.results;
                setGovJob(results.filter((data) => { return data.papername === "Government Jobs" }));
                setOthJob(results.filter((data) => { return data.papername === "Other Applications" }));
                setAdmitCard(results.filter((data) => { return data.papername === "Admit Card" }));
            }
            else {
                toast.warn(json.message);
            }
        }
        catch (err) {
            toast.warn(err);
        }

    }

    const formTemplate = (buttonText, funcPass) => {
        return (
            <form className="space-y-4 pb-4" onSubmit={(e) => e.preventDefault()}>
                <div className={`space-y-2`}>

                    <div>
                        <label htmlFor="name" className="block ml-1">Application Type</label>
                        <select name="name" id="name" className='appearance-none rounded-md relative flex-1 block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm'
                            onChange={(e) => { handleOnChange("papername", e.target.value) }}
                            value={appDetails.papername}
                        >
                            <option value="Government Jobs">Government Jobs</option>
                            <option value="Other Applications">Other Applications</option>
                            <option value="Admit Card">Admit Card</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="appname" className="block ml-1">Application Name</label>
                        <input
                            type="text"
                            id="appname"
                            name="appname"
                            autoComplete="appname"
                            required
                            placeholder="Enter the application name"
                            className={`appearance-none rounded-md relative flex-1 block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                            value={appDetails.appname}
                            onChange={(event) => { handleOnChange("appname", event.target.value) }}
                        />
                    </div>

                    <div>
                        <label htmlFor="formlink" className="block ml-1">Application form link</label>
                        <input
                            type="text"
                            id="formlink"
                            name="formlink"
                            autoComplete="formlink"
                            required
                            placeholder="Enter the link for application"
                            className={`appearance-none rounded-md relative flex-1 block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                            value={appDetails.formlink}
                            onChange={(event) => { handleOnChange("formlink", event.target.value) }}
                        />
                    </div>

                    <div>
                        <label htmlFor="youtubelink" className="block ml-1">Youtube link</label>
                        <input
                            type="text"
                            id="youtubelink"
                            name="youtubelink"
                            autoComplete="youtubelink"
                            required
                            placeholder="Enter the youtube video link for application"
                            className={`appearance-none rounded-md relative flex-1 block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                            value={appDetails.youtubelink}
                            onChange={(event) => { handleOnChange("youtubelink", event.target.value) }}
                        />
                    </div>

                    <div>
                        <label htmlFor="endformdate" className="block ml-1">Form end date</label>
                        <input
                            type="date"
                            id="endformdate"
                            name="endformdate"
                            autoComplete="endformdate"
                            required
                            placeholder="Enter end date for form submition"
                            className={`appearance-none rounded-md relative flex-1 block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                            value={appDetails.endformdate}
                            onChange={(event) => { handleOnChange("endformdate", event.target.value) }}
                        />
                    </div>

                    <div>
                        <label htmlFor="expirydate" className="block ml-1">Form expiry date</label>
                        <input
                            type="date"
                            id="expirydate"
                            name="expirydate"
                            autoComplete="expirydate"
                            required
                            placeholder="Enter end date for form deletion"
                            className={`appearance-none rounded-md relative flex-1 block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                            value={appDetails.expirydate}
                            onChange={(event) => { handleOnChange("expirydate", event.target.value) }}
                        />
                    </div>

                </div>
                <div className='flex justify-around items-center space-x-4 text-white font-semibold text-sm'>
                    <div
                        className={`w-full text-center py-2 px-4 border rounded-md bg-gray-400 hover:bg-gray-500 cursor-pointer`}
                        onClick={() => { funcPass ? setOpen(false) : setOpenUpdate(false) }}
                    >
                        Cancel
                    </div>

                    <button
                        type="submit"
                        className={`w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md bg-blue-700 hover:bg-blue-800 space-x-2`}
                        onClick={() => { funcPass ? handleAddBook() : handleUpdateEbook() }}
                    >
                        <span>{buttonText}</span>
                        {spinLoading && <AiOutlineLoading3Quarters className="animate-spin" aria-hidden="true" />}
                    </button>
                </div>
            </form>
        )
    }

    return (
        <div className='bg-gray-50 pb-6 sm:pb-8 lg:pb-12'>
            <div className='mx-auto max-w-screen-2xl px-4 md:px-8'>
                <div className='pt-28'>
                    <h1 className='text-2xl md:text-4xl font-bold text-center text-gray-700 mb-8'>Government Jobs, Appilications and Admit Cards</h1>

                    {
                        localStorage.getItem("type") === "editor" &&
                        <>
                            <div className='text-center my-8'>
                                <button onClick={handleSetFalse} className='rounded-lg bg-blue-600 px-14 py-2.5 font-semibold text-white hover:bg-blue-700'>Add Application</button>
                            </div>

                            <FormModal open={open} setOpen={setOpen} fromHeading={"Add details for new Application"}>
                                {
                                    formTemplate("Add Application", true)
                                }
                            </FormModal>

                            <FormModal open={openUpdate} setOpen={setOpenUpdate} fromHeading={"Update application details"}>
                                {
                                    formTemplate("Update", false)
                                }
                            </FormModal>

                            <DeleteModal open={openDel} setOpen={setOpenDel} handleDeleteEbook={handleDeleteEbook}>
                                <div className='pb-2 flex items-center justify-center'>
                                    <h1 className='text-xl text-center pb-2'><span className='font-semibold'>Book :</span> {appDetails.appname}</h1>
                                </div>
                            </DeleteModal>

                        </>
                    }

                    <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-8'>

                        {
                            allData.map((alldata, idx) => {
                                return <div key={idx} className='border border-blue-300 rounded-xl overflow-hidden bg-gray-200'>

                                    <h4 className='font-semibold text-xl text-center p-3 bg-blue-700 text-white'>{alldata.name} ({alldata.data.length})</h4>

                                    {/* <ResultAnim /> */}

                                    <div className='h-[30rem] nobar overflow-y-auto'>
                                        {
                                            alldata.data.map((appData, idx) => {
                                                return <>
                                                    <div className={`p-1.5 ${idx % 2 === 0 ? "bg-gray-200" : "bg-gray-300"}`}>
                                                        <div className='flex items-center justify-between'>
                                                            {idx + 1}. {appData.appname}
                                                            <Link to="/" className='pr-1 text-blue-600 underline'>Link</Link>
                                                        </div>
                                                        <div className='flex items-center justify-between text-xs md:text-sm'>
                                                            <div className='flex items-center space-x-2'>
                                                                <Link to="/" className='underline'>YouTube Video Link</Link>
                                                                {
                                                                    localStorage.getItem("type") === "editor" && <div className='flex items-center space-x-2'>
                                                                        <div> <BiEdit size={17} className='hover:scale-110 cursor-pointer transition-all duration-200' onClick={() => { handleOpen(appData, true) }} /> </div>

                                                                        <div> <RiDeleteBack2Line size={17} className='hover:scale-110 cursor-pointer transition-all duration-200' onClick={() => { handleOpen(appData, false) }} /> </div>
                                                                    </div>
                                                                }
                                                            </div>
                                                            <div className='font-semibold'>Last date: <span className='text-red-500'>{new Date(appData.endformdate).getDate()}/{new Date(appData.endformdate).getMonth() + 1}/{new Date(appData.endformdate).getFullYear()}</span></div>
                                                        </div>
                                                    </div>
                                                </>
                                            })
                                        }
                                    </div>

                                </div>
                            })
                        }

                    </div>

                </div>
            </div>
        </div>
    )
}

export default Results;