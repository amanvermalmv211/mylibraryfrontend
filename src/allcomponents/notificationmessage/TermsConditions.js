import React, { useEffect, useState } from 'react';
import termsandconditions from '../images/termsandconditions.svg';

const TermsConditions = (props) => {

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Terms and Conditions - ML";
    }, []);

    const { handleOnChange, handleLogin, istrue } = props;

    const [isChecked, setIsChecked] = useState(false);

    const terms = [
        {
            title: "1. Definitions",
            content: [
                '"Platform" refers to the BeyondBooks website and associated services.',
                '"Library Owner" refers to individuals or organizations managing a library through the platform.',
                '"Student" refers to users who register to find libraries and request subscriptions.',
                '"User" refers to any person accessing or using the platform, including Library Owners and Students.',
            ],
        },
        {
            title: "2. Eligibility",
            content: [
                "Users must be at least 18 years old or have parental/guardian consent to use the platform.",
                "By using the platform, you warrant that the information provided during registration is accurate and up-to-date.",
            ],
        },
        {
            title: "3. Account Responsibilities",
            content: [
                "Users are responsible for maintaining the confidentiality of their login credentials.",
                "BeyondBooks is not liable for unauthorized account access resulting from user negligence.",
            ],
        },
        {
            title: "4. Services",
            content: [
                {
                    subtitle: "Library Owners can:",
                    subitems: [
                        "Add and manage their library details.",
                        "Approve or reject student subscription requests.",
                    ],
                },
                {
                    subtitle: "Students can:",
                    subitems: [
                        "Search for libraries nearby.",
                        "Request subscriptions from listed libraries.",
                    ],
                },
            ],
        },
        {
            title: "5. Subscription Management",
            content: [
                "Library Owners must ensure accurate and timely updates to their library details and subscription statuses.",
                "Students are responsible for adhering to the terms set by the Library Owners for subscriptions.",
            ],
        }
    ];

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
        handleOnChange("termsAndConditons", true);
    };

    return (
        <div className={`bg-white max-w-screen-md rounded-md p-4 mx-auto ${!istrue && "pt-28"}`}>
            <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 text-blue-600">
                Terms & Conditions
            </h1>
            <p className="text-sm text-gray-500 text-center mb-4">
                Effective Date: <span className="font-semibold">12 Jan, 2025</span>
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