import React, { useEffect, useState } from 'react';
import termsandconditions from '../images/termsandconditions.svg';
import { Helmet } from 'react-helmet-async';

const TermsConditions = (props) => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const { handleOnChange, handleLogin, istrue } = props;

    const [isChecked, setIsChecked] = useState(false);

    const terms = [
        {
            title: "1. Definitions",
            content: [
                '"Platform" refers to the meriLibrary website (merilibrary.in) and associated services.',
                '"Library Owner" refers to individuals or organizations managing a library through the platform.',
                '"Student" refers to users who register to find libraries and request subscriptions.',
                '"User" refers to any person accessing or using the platform, including Library Owners and Students.',
                '"Subscription" refers to the temporary service agreement between a Library Owner and a Student.',
                '"Registered Library" refers to libraries recognized and registered by local authorities.',
                '"Non-Registered Library" refers to libraries operating without formal registration with local authorities.'
            ],
        },
        {
            title: "2. Eligibility",
            content: [
                "By using the platform, you warrant that the information provided during registration is accurate and up-to-date.",
                "Library Owners must ensure they comply with local laws regarding library operations, whether registered or non-registered."
            ],
        },
        {
            title: "3. Account Responsibilities",
            content: [
                "Users are responsible for maintaining the confidentiality of their login credentials.",
                "meriLibrary is not liable for unauthorized account access resulting from user negligence.",
                "Any suspicious activity on an account should be reported immediately to meriLibrary support."
            ],
        },
        {
            title: "4. Services",
            content: [
                {
                    subtitle: "Library Owners can:",
                    subitems: [
                        "Add and manage their library details, including subscription pricing and available seats.",
                        "Approve or reject student subscription requests.",
                        "Receive notifications about expiring student subscriptions."
                    ],
                },
                {
                    subtitle: "Students can:",
                    subitems: [
                        "Search for nearby libraries based on location, price, and available seats.",
                        "Request subscriptions from listed libraries.",
                        "Receive notifications when their subscription is about to expire."
                    ],
                },
                {
                    subtitle: "MeriLibrary does not:",
                    subitems: [
                        "Guarantee the authenticity of non-registered libraries.",
                        "Intervene in disputes between Library Owners and Students.",
                        "Handle any financial transactions between student and Library owners."
                    ],
                }
            ],
        },
        {
            title: "5. Subscription Management",
            content: [
                "Library Owners must ensure accurate and timely updates to their library details and subscription statuses.",
                "Students are responsible for adhering to the terms set by the Library Owners for subscriptions.",
                "Expired subscriptions will be automatically detected by the system, and users will receive notifications accordingly.",
                "Library Owners will receive daily updates on expired student subscriptions.",
                "If a Student does not renew their subscription within 15 days of expiry, they may no longer receive renewal notifications."
            ],
        },
        {
            title: "6. Presence of Registered and Non-Registered Libraries",
            content: [
                "meriLibrary allows both registered and non-registered libraries to list their services on the platform.",
                "Users are advised to verify the legitimacy of a library before subscribing.",
                "MeriLibrary is not responsible for any legal issues arising due to a library's registration status."
            ],
        },
        {
            title: "7. Code of Conduct",
            content: [
                "Users must not engage in fraudulent activities or provide false information.",
                "Harassment, abuse, or any form of harmful behavior towards other users is strictly prohibited.",
                "Library Owners must not misrepresent their services or subscription terms."
            ],
        },
        {
            title: "8. Data Privacy & Security",
            content: [
                "User data will be stored securely and not shared with third parties without consent.",
                "MeriLibrary uses SendGrid to send automated notifications regarding subscription status updates.",
                "By using this platform, users consent to receive emails and messages related to their subscriptions."
            ],
        },
        {
            title: "9. Limitation of Liability",
            content: [
                "meriLibrary is a platform that connects students and library owners but does not endorse or validate any particular library.",
                "Users agree that meriLibrary is not responsible for any financial loss, disputes, or service-related issues arising from library subscriptions.",
                "In case of disputes, users should resolve the matter directly with the concerned Library Owner or Student."
            ],
        },
        {
            title: "10. Amendments",
            content: [
                "meriLibrary reserves the right to modify these terms at any time without prior notice.",
                "Users will be notified of major updates to the Terms & Conditions."
            ],
        }
    ];


    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
        handleOnChange("termsAndConditons", true);
    };

    return (
        <div className={`bg-white max-w-screen-md rounded-md p-4 mx-auto ${!istrue && "pt-28"}`}>

            {
                !istrue && <Helmet>
                    <title>Terms and Conditions | meriLibrary Usage Policy</title>
                    <meta name="description" content="Read the terms and conditions for using meriLibrary. Understand our policies on user accounts, subscriptions, payments, and content access before proceeding." />
                </Helmet>
            }

            <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 text-blue-600">
                Terms & Conditions
            </h1>
            <p className="text-sm text-gray-500 text-center mb-4">
                Effective Date: <span className="font-semibold">26 Feb, 2025</span>
            </p>

            <div className='w-full lg:h-80'>
                <img src={termsandconditions} alt="" className='w-full h-full object-cover lg:object-contain' />
            </div>

            <div className="space-y-8 text-gray-700">
                {terms.map((section, index) => (
                    <section key={index}>
                        <h2 className="text-xl font-semibold mb-2 text-blue-500">
                            {section.title}
                        </h2>
                        {Array.isArray(section.content) ? (
                            section.content.map((item, idx) =>
                                typeof item === "string" ? (
                                    <p key={idx} className="mb-2">
                                        {item}
                                    </p>
                                ) : (
                                    <div key={idx} className="mb-4">
                                        <h3 className="font-semibold mb-1">{item.subtitle}</h3>
                                        <ul className="list-disc pl-5">
                                            {item.subitems.map((subitem, subIdx) => (
                                                <li key={subIdx}>{subitem}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )
                            )
                        ) : (
                            <p>{section.content}</p>
                        )}
                    </section>
                ))}
            </div>
            {istrue &&
                <>
                    <div className="mt-6 flex items-center">
                        <input
                            type="checkbox"
                            id="agree"
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label
                            htmlFor="agree"
                            className="ml-3 text-gray-700 text-sm font-medium"
                        >
                            I have read and agree to the Terms and Conditions
                        </label>
                    </div>
                    <button
                        onClick={handleLogin}
                        disabled={!isChecked}
                        className={`mt-4 w-full py-2 text-white font-semibold rounded ${isChecked ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400"
                            }`}
                    >
                        Proceed
                    </button>
                </>
            }
        </div>
    );
};

export default TermsConditions;