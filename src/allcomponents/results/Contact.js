import React, { useEffect, useState } from 'react';
import { FaWhatsapp } from "react-icons/fa";
import { BiLogoGmail, BiSolidPhoneCall } from "react-icons/bi";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { contactValidation } from '../../libs/Validation';
import apiList from '../../libs/apiLists';
import { SuccessModal } from '../notificationmessage/Modal';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const Contact = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Contact Us - ML";
    }, [])

    const initDetails = {
        name: "",
        contactnum: "",
        email: "",
        address: "",
        message: ""
    }

    const [open, setOpen] = useState(false);
    const [spinLoading, setSpinLoading] = useState(false);
    const [formDetails, setFormDetails] = useState(initDetails);

    useEffect(() => {
        if (open) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }

        return () => {
            document.body.classList.remove('modal-open');
        };

    }, [open]);

    const handleOnChange = (key, value) => {
        setFormDetails({
            ...formDetails,
            [key]: value
        })
    }

    const handleSubmit = async () => {
        if (!contactValidation(formDetails)) { return }
        setSpinLoading(true);
        try {
            const response = await fetch(apiList.savecontactdetails, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formDetails)
            });

            const json = await response.json();
            if (json.success) {
                setOpen(true);
                window.scrollTo(0, 0);
                setFormDetails(initDetails)
                setSpinLoading(false);
            }
            else {
                toast.warn(json.message);
                setSpinLoading(false);
            }
        }
        catch (err) {
            toast.error(`ContactPage: ${err.message}`)
            setSpinLoading(false);
        }
    }

    const message = "Your contact details has been saved"

    return (
        <div className='bg-gray-50 pb-6 sm:pb-8 lg:pb-12'>
            <div className='mx-auto max-w-screen-2xl px-4 md:px-8 pt-28 text-gray-700'>

                <section className="mb-12 flex max-lg:flex-col">

                    <div className='lg:w-3/5'>
                        <h2 className='text-xl text-blue-600 font-semibold mb-2'>myLibrary for Enterpreneurs!</h2>

                        <h1 className='mb-2 text-4xl font-bold md:text-5xl'>Wanna join us?</h1>
                        <p className='mb-4 text-gray-700 text-justify'>If you’re planning to start your own library but are still unsure how to proceed, join us! We will guide you in establishing a successful library and help you connect with students. Our mission is to support library owners across the country in joining our platform and enhancing their services. Reach out to learn more!</p>
                    </div>

                    <div className='lg:w-2/5 h-64 py-2 md:py-4'>
                        <img src="https://img.freepik.com/premium-vector/handshake-vector-concept_171919-1131.jpg" alt="" className='w-full h-full object-contain mix-blend-darken' />
                    </div>
                </section>

                <section className='my-16'>
                    <SuccessModal open={open} setOpen={setOpen} fromHeading={message}>
                        <div className='font-semibold'>Our team will contact you soon!</div>
                    </SuccessModal>
                    <div>
                        <h2 className='text-center text-4xl font-bold text-gray-700 mb-2'>Fill Up The Contact Info.</h2>
                    </div>
                    <div className='flex items-center justify-center text-gray-700'>
                        <div className='max-w-xl w-full'>
                            <form onSubmit={(e) => { e.preventDefault() }} className='space-y-3'>
                                <div className='flex max-md:flex-col justify-between max-md:space-y-3 md:space-x-8'>
                                    <label htmlFor="name" className='w-full'>
                                        Name
                                        <input type="text" id='name' className="appearance-none rounded-md relative block w-full p-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder='Enter your name' value={formDetails.name} onChange={(e) => { handleOnChange("name", e.target.value) }} />
                                    </label>
                                    <label htmlFor="contact" className='w-full'>
                                        Contact No.
                                        <input type="text" id='contact' className="appearance-none rounded-md relative block w-full p-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder='Enter your contact number' value={formDetails.contactnum} onChange={(e) => { handleOnChange("contactnum", e.target.value) }} />
                                    </label>
                                </div>

                                <div className='flex max-md:flex-col justify-between max-md:space-y-3 md:space-x-8'>
                                    <label htmlFor="email" className='w-full'>
                                        E-mail Address
                                        <input type="email" id='email' className="appearance-none rounded-md relative block w-full p-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder='Enter your email address' value={formDetails.email} onChange={(e) => { handleOnChange("email", e.target.value) }} />
                                    </label>
                                    <label htmlFor="address" className='w-full'>
                                        Address
                                        <input id='address' type="text" className="appearance-none rounded-md relative block w-full p-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder='Enter your address' value={formDetails.address} onChange={(e) => { handleOnChange("address", e.target.value) }} />
                                    </label>
                                </div>

                                <div className='flex flex-col items-center space-y-6'>

                                    <label htmlFor="message" className='w-full'>
                                        Message
                                        <textarea id='message' type="text" className="appearance-none rounded-md relative block w-full h-20 p-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder='Write message for us' value={formDetails.message} onChange={(e) => { handleOnChange("message", e.target.value) }} />
                                    </label>

                                    <button
                                        type="submit"
                                        className={`group relative w-full md:w-3/5 flex justify-center items-center py-2 px-4 border border-transparent font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 space-x-2`}
                                        onClick={handleSubmit}
                                    >
                                        <span>Submit</span>
                                        {spinLoading && <AiOutlineLoading3Quarters className="animate-spin" />}
                                    </button>

                                </div>

                            </form>
                        </div>
                    </div>
                </section>

                <section>
                    <h1 className='mb-4 text-4xl font-bold md:text-5xl'>Benifites of being with us!</h1>

                    <div className='grid lg:grid-cols-3 gap-6'>
                        <div className='border rounded-lg overflow-hidden text-justify bg-gradient-to-tl from-blue-100 via-blue-50 to-blue-50'>
                            <h1 className='text-center font-semibold text-xl bg-blue-500 text-white p-1'>Empowering Libraries</h1>
                            <p className='p-1.5'>Building and managing a library can be challenging—but not when you're with us. We offer dedicated support at every step, from setup to smooth operations. Our team will assist you, manage your space efficiently, and handle the details, so you can focus on what matters most—providing a great support. We're here for you!</p>
                        </div>

                        <div className='border rounded-lg overflow-hidden text-justify bg-gradient-to-tl from-blue-100 via-blue-50 to-blue-50'>
                            <h1 className='text-center font-semibold text-xl bg-blue-500 text-white p-1'>Expand Your Reach</h1>
                            <p className='p-1.5'>Connect with a wider audience of students who are actively looking for library subscriptions by leveraging our marketing tools and promotional features to boost your visibility. Showcase the resources and offerings of your library to effectively attract members and create a vibrant community around your services.</p>
                        </div>
                        <div className='border rounded-lg overflow-hidden text-justify bg-gradient-to-tl from-blue-100 via-blue-50 to-blue-50'>
                            <h1 className='text-center font-semibold text-xl bg-blue-500 text-white p-1'>Effortless Management</h1>
                            <p className='p-1.5'>Effortlessly manage library resources and student subscriptions with our streamlined tools. Easily track student engagement and gather feedback to enhance your services. With automated subscription management, you can focus more on growing your library and less on administrative tasks. We take care of the details for you!</p>
                        </div>

                    </div>
                </section>

                <section className='border border-gray-300 my-12 rounded-2xl flex items-center justify-center flex-col lg:flex-row bg-gradient-to-tl from-blue-100 to-gray-50 lg:mx-12'>
                    <div className='lg:w-2/5 h-60 lg:h-80 py-2 md:py-4'>
                        <img src="https://cdni.iconscout.com/illustration/premium/thumb/contact-us-5795988-4849052.png" alt="" className='w-full h-full object-contain mix-blend-darken' />
                    </div>

                    <div className='flex flex-col lg:w-3/5 p-2'>
                        <div className='my-4'>
                            <h1 className='text-4xl font-bold text-blue-700'>Contact Us On</h1>
                            <p className='mb-10 font-semibold text-justify'>You can directly contect us on following platforms for the faster communication</p>
                            <ul className='flex max-lg:justify-center flex-wrap text-white'>
                                <Link to="tel:+916306805527" className='flex items-center justify-center space-x-4 border border-green-300 p-2 rounded-lg bg-green-500 hover:bg-green-600 w-32 m-2'>WhatsApp <FaWhatsapp className='ml-1.5' /></Link>
                                <Link className='flex items-center justify-center space-x-4 border border-yellow-300 p-2 rounded-lg bg-yellow-400 hover:bg-yellow-500 w-32 m-2'>Gmail <BiLogoGmail className='ml-1.5' /></Link>
                                <Link to="tel:6306805527" className='flex items-center justify-center space-x-4 border bordergra4border-gray-300 p-2 rounded-lg bg-gray-500 hover:bg-gray-600 w-32 m-2'>Call <BiSolidPhoneCall className='ml-1.5' /></Link>
                            </ul>
                        </div>

                    </div>
                </section>

            </div>

        </div>
    )
}

export default Contact;