import React, { useEffect, useState } from 'react';
import apiList from '../../libs/apiLists';
import { toast } from 'react-toastify';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import DeleteModal, { FormModal } from '../notificationmessage/Modal';
import { EbookValidation } from '../../libs/Validation';
import { BiEdit } from 'react-icons/bi';
import { RiDeleteBack2Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const Ebooks = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "E-books - ML";
        getEbooks();
    }, []);

    const [open, setOpen] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [openDel, setOpenDel] = useState(false);
    const [spinLoading, setSpinLoading] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    const [ebooks, setEbooks] = useState([]);

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

    const [ebookDetails, setEbookDetails] = useState({
        name: "",
        authname: "",
        published: "",
        ebooklink: ""
    });

    const handleOnChange = (key, value) => {
        setEbookDetails({
            ...ebookDetails,
            [key]: value
        })
    };

    const handleOpen = (ebook, openPass) => {
        if (openPass) {
            setOpenUpdate(true);
        }
        else {
            setOpenDel(true);
        }
        setEbookDetails(ebook);
    };

    const handleSetFalse = () => {
        setSpinLoading(false);
        setOpen(!open);
        setIsClicked(false);
        setEbookDetails({ name: "", authname: "", published: "", ebooklink: "" })
    };

    const handleAddBook = async () => {

        if (!EbookValidation(ebookDetails)) { return }

        if (!isClicked) {
            setIsClicked(true);
            try {
                setSpinLoading(true);
                const response = await fetch(apiList.addebooks, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'authtoken': localStorage.getItem("authtoken")
                    },
                    body: JSON.stringify(ebookDetails)
                });

                const json = await response.json();
                if (json.success) {
                    toast.success(json.message);
                    handleSetFalse();
                    setEbooks(ebooks.concat(json.ebook))
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

        if (!EbookValidation(ebookDetails)) { return }
        setSpinLoading(true);
        if (!isClicked) {
            setIsClicked(true);
            try {
                const response = await fetch(apiList.updateebooks + `/${ebookDetails._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'authtoken': localStorage.getItem("authtoken")
                    },
                    body: JSON.stringify(ebookDetails)
                });

                const json = await response.json();
                if (json.success) {
                    toast.success(json.message);
                    for (let i = 0; i < ebooks.length; i++) {
                        if (ebooks[i]._id === json.data._id) {
                            ebooks[i] = json.data
                            break;
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
                toast.warn("Internal Server Error");
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
                const response = await fetch(apiList.deleteebooks + `/${ebookDetails._id}`, {
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
                    setEbooks(ebooks.filter((ebook) => { return ebook._id !== ebookDetails._id }))
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

    const getEbooks = async () => {
        try {
            const response = await fetch(apiList.getebooks, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const json = await response.json();
            if (json.success) {
                setEbooks(json.ebooks)
            }
            else {
                toast.warn(json.message);
            }
        }
        catch (err) {
            toast.warn("Internal Server Error");
        }

    }

    const formTemplate = (buttonText, funcPass) => {
        return (
            <form className="space-y-4 pb-4" onSubmit={(e) => e.preventDefault()}>
                <div className={`space-y-2`}>

                    <div>
                        <label htmlFor="name" className="block ml-1">Book Name</label>
                        <div className='flex'>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                autoComplete="name"
                                required
                                placeholder="Enter the name of book"
                                className={`appearance-none rounded-md relative flex-1 block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                                value={ebookDetails.name}
                                onChange={(event) => { handleOnChange("name", event.target.value) }}
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="author" className="block ml-1">Author Name</label>
                        <div className='flex'>
                            <input
                                type="text"
                                id="author"
                                name="author"
                                autoComplete="author"
                                required
                                placeholder="Enter the name of author"
                                className={`appearance-none rounded-md relative flex-1 block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                                value={ebookDetails.authname}
                                onChange={(event) => { handleOnChange("authname", event.target.value) }}
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="published" className="block ml-1">Published Date</label>
                        <div className='flex'>
                            <input
                                type="date"
                                id="published"
                                name="published"
                                autoComplete="published"
                                required
                                placeholder="Enter published date"
                                className={`appearance-none rounded-md relative flex-1 block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                                value={ebookDetails.published}
                                onChange={(event) => { handleOnChange("published", event.target.value) }}
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="ebooklink" className="block ml-1">E-book Link</label>
                        <div className='flex'>
                            <input
                                type="text"
                                id="ebooklink"
                                name="ebooklink"
                                autoComplete="ebooklink"
                                required
                                placeholder="Enter the link of ebook"
                                className={`appearance-none rounded-md relative flex-1 block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                                value={ebookDetails.ebooklink}
                                onChange={(event) => { handleOnChange("ebooklink", event.target.value) }}
                            />
                        </div>
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
                    <h1 className='text-2xl md:text-4xl font-bold text-center text-gray-700 mb-8'>Read free E-books ({ebooks.length})</h1>

                    {
                        localStorage.getItem("type") === "editor" &&
                        <>
                            <div className='text-center my-8'>
                                <button onClick={handleSetFalse} className='rounded-lg bg-blue-600 px-14 py-2.5 font-semibold text-white hover:bg-blue-700'>Add E-book</button>
                            </div>

                            <FormModal open={open} setOpen={setOpen} fromHeading={"Add details for E-book"}>
                                {
                                    formTemplate("Add E-Book", true)
                                }
                            </FormModal>

                            <FormModal open={openUpdate} setOpen={setOpenUpdate} fromHeading={"Update E-book details"}>
                                {
                                    formTemplate("Update E-Book", false)
                                }
                            </FormModal>

                            <DeleteModal open={openDel} setOpen={setOpenDel} handleDeleteEbook={handleDeleteEbook}>
                                <div className='pb-2 flex items-center justify-center'>
                                    <h1 className='text-xl text-center pb-2'><span className='font-semibold'>Book :</span> {ebookDetails.name}</h1>
                                </div>
                            </DeleteModal>

                        </>
                    }


                    <div className='flex flex-wrap items-center justify-center gap-6'>

                        {/* <EbookAnim/> */}

                        {
                            ebooks.map((ebook, idx) => {
                                return <div key={idx} className='border border-gray-300 rounded-lg overflow-hidden w-full md:w-72 bg-gray-200 text-gray-700 relative'>

                                    <div className={`absolute top-0 left-0 p-1 ${localStorage.getItem("type") === 'editor' ? "block" : "invisible"}`}> <BiEdit size={20} className='hover:scale-110 cursor-pointer transition-all duration-200' onClick={() => { handleOpen(ebook, true) }} /> </div>

                                    <div className={`absolute top-0 right-0 p-1 ${localStorage.getItem("type") === 'editor' ? "block" : "invisible"}`}> <RiDeleteBack2Line size={20} className='hover:scale-110 cursor-pointer transition-all duration-200' onClick={() => { handleOpen(ebook, false) }} /> </div>

                                    <div className='p-2 overflow-y-auto h-28 nobar'>
                                        <h4 className='font-semibold text-xl text-center p-1'>{ebook.name}</h4>
                                        <p className='text-start font-semibold'>Author : <span className='font-normal'>{ebook.authname}</span></p>
                                        <p className='text-start font-semibold'>Published On : <span className='font-normal'>{ebook.published}</span></p>
                                    </div>
                                    <Link to={ebook.ebooklink} target='_blank' className='w-full block text-center p-1.5 bg-blue-500 hover:bg-blue-600 text-white'>Read Now</Link>
                                </div>
                            })
                        }

                    </div>

                </div>

            </div>
        </div>
    )
}

export default Ebooks;