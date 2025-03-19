import React, { useEffect, useState } from 'react';
import { FaRegIdBadge, FaWhatsapp } from "react-icons/fa";
import { BiLogoGmail, BiSolidPhoneCall } from "react-icons/bi";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { contactValidation } from '../../libs/Validation';
import apiList from '../../libs/apiLists';
import { SuccessModal } from '../notificationmessage/Modal';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import InputBox from '../notificationmessage/InputBox';
import contact from '../images/contact.svg';
import contactus from '../images/contactus.svg';
import { Helmet } from 'react-helmet-async';

const Contact = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const initDetails = { name: "", contactnum: "", email: "", address: "", message: "" }

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

    const message = "Your contact details has been saved";

    const benifites = [{
        heading: "Empowering Libraries",
        content: "Building and managing a library can be challenging—but not when you're with us. We offer dedicated support at every step, from setup to smooth operations. Our team will assist you, manage your space efficiently, and handle the details, so you can focus on what matters most—providing a great support. We're here for you!"
    },
    {
        heading: "Expand Your Reach",
        content: "Connect with a wider audience of students who are actively looking for library subscriptions by leveraging our marketing tools and promotional features to boost your visibility. Showcase the resources and offerings of your library to effectively attract members and create a vibrant community around your services."
    },
    {
        heading: "Effortless Management",
        content: "Effortlessly manage library resources and student subscriptions with our streamlined tools. Easily track student engagement and gather feedback to enhance your services. With automated subscription management, you can focus more on growing your library and less on administrative tasks. We take care of the details for you!"
    }];

    const buttonLinks = [{ name: "WhatsApp", link: "https://wa.me/918188879731", bg: "bg-green-500", hover: "hover:bg-green-600", border: "border-green-300", icon: <FaWhatsapp /> },
    { name: "Call", link: "tel:+918188879731", bg: "bg-gray-500", hover: "hover:bg-gray-600", border: "border-gray-300", icon: <BiSolidPhoneCall /> },
    { name: "Gmail", link: "mailto:merilibrary.in@gmail.com", bg: "bg-yellow-400", hover: "hover:bg-yellow-500", border: "border-yellow-300", icon: <BiLogoGmail /> },
    { name: "Register", link: "/signup/library-owner", bg: "bg-blue-500", hover: "hover:bg-blue-600", border: "border-blue-300", icon: <FaRegIdBadge /> }
    ]

    return (
        <div className='bg-gray-50 pb-6 sm:pb-8 lg:pb-12'>

            <Helmet>
                <title>Contact Us | meriLibrary - Your Study Partner</title>
                <meta name="description" content="Need help with library subscriptions or management? Contact meriLibrary for support. We’re here to assist students and library owners." />
            </Helmet>

            <div className='mx-auto max-w-screen-2xl px-4 md:px-8 pt-28 text-gray-700'>

                <section className="flex max-lg:flex-col justify-around">

                    <div className='lg:w-2/3'>
                        <h2 className='text-xl text-blue-600 font-semibold mb-2'>meriLibrary for Enterpreneurs!</h2>

                        <h1 className='mb-2 text-4xl font-bold md:text-5xl'>Wanna join us?</h1>
                        <p className='text-gray-700 text-justify'>If you’re planning to start your own library but are still unsure how to proceed, join us! We will guide you in establishing a successful library and help you connect with students. Our mission is to support library owners across the country in joining our platform and enhancing their services. Reach out to learn more!</p>
                    </div>

                    <div className='md:h-72'>
                        <img src={contact} alt="" className='w-full h-full object-cover md:object-contain' />
                    </div>
                </section>

                <section className='my-12'>
                    <SuccessModal open={open} setOpen={setOpen} fromHeading={message}>
                        <div className='font-semibold'>Our team will contact you soon!</div>
                    </SuccessModal>
                    <div>
                        <h2 className='text-center text-4xl font-bold text-gray-700 mb-2'>Fill Up The Contact Info.</h2>
                    </div>
                    <div className='flex items-center justify-center space-x-2 text-gray-700'>
                        <div className='max-w-xl w-full'>
                            <form onSubmit={(e) => { e.preventDefault() }} className='space-y-3'>
                                <div className='flex max-md:flex-col justify-between max-md:space-y-3 md:space-x-8'>
                                    <InputBox name="Name" id="name" type="text" value={formDetails.name} placeholder="Enter your name" handleOnChange={handleOnChange} />

                                    <InputBox name="Contact No." id="contactnum" type="text" value={formDetails.contactnum} placeholder="Enter your contact number" handleOnChange={handleOnChange} />
                                </div>

                                <div className='flex max-md:flex-col justify-between max-md:space-y-3 md:space-x-8'>
                                    <InputBox name="E-mail Address" id="email" type="email" value={formDetails.email} placeholder="Enter your email address" handleOnChange={handleOnChange} />

                                    <InputBox name="Address" id="address" type="text" value={formDetails.address} placeholder="Enter your address" handleOnChange={handleOnChange} />
                                </div>

                                <div className='flex flex-col items-center space-y-6'>

                                    <label htmlFor="message" className='w-full'>
                                        Message
                                        <textarea id='message' type="text" className="appearance-none rounded-md relative block w-full h-20 p-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder='Write message for us' value={formDetails.message} onChange={(e) => { handleOnChange("message", e.target.value) }} />
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
                        {
                            benifites.map((data, idx) => {
                                return <div key={idx} className='border rounded-lg overflow-hidden text-justify bg-gradient-to-tl from-blue-100 via-blue-50 to-blue-50'>
                                    <h1 className='text-center font-semibold text-xl bg-blue-500 text-white p-1'>{data.heading}</h1>
                                    <p className='p-1.5'>{data.content}</p>
                                </div>
                            })
                        }
                    </div>
                </section>

                <section className='border border-gray-300 my-12 rounded-2xl flex items-center flex-col lg:flex-row bg-gradient-to-tl from-blue-100 to-gray-50'>
                    <div className='lg:w-2/5 h-72'>
                        <img src={contactus} alt="" className='w-full h-full object-cover max-lg:scale-125' />
                    </div>

                    <div className='flex flex-col lg:w-3/5 p-2 max-lg:mb-4'>
                        <div>
                            <h1 className='text-4xl font-bold text-blue-700'>Contact Us On</h1>
                            <p className='mb-4 font-semibold text-justify'>You can directly contect us on following platforms for the faster communication!</p>
                            <ul className='flex max-lg:justify-center flex-wrap text-white'>
                                {
                                    buttonLinks.map((data, idx) => {
                                        return <Link key={idx} to={data.link} target={`${idx === 3 ? "_self" : "_blank"}`} className={`flex items-center justify-center space-x-1 border ${data.border} p-2 rounded-lg ${data.bg} ${data.hover} w-32 m-1`}><span>{data.name}</span> {data.icon}</Link>
                                    })
                                }
                            </ul>
                        </div>

                    </div>
                </section>

            </div>

        </div>
    )
}

export default Contact;