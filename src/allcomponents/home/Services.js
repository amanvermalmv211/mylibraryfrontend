import React from 'react';
import ac from '../images/ac.svg';
import desklamp from '../images/desklamp.svg';
import newspaper from '../images/newspaper.svg';
import wifirouter from '../images/wifirouter.svg';
import studytable from '../images/studytable.svg';
import powersocket from '../images/powersocket.svg';
import drinkingwater from '../images/drinkingwater.svg';
import { IoReaderOutline } from 'react-icons/io5';

const Services = () => {

    const serviceList = [
        { serviceName: "Desk and Chair", imgLink: studytable, bgColor: "bg-orange-400", colorFrom: "from-orange-300", colorTo: "to-orange-50", content: "Spacious desks and ergonomic chairs provide a comfortable setup for reading, studying, and working, ensuring proper posture and a productive environment for long study sessions." },

        { serviceName: "Drinking Water", imgLink: drinkingwater, bgColor: "bg-blue-400", colorFrom: "from-blue-300", colorTo: "to-blue-50", content: "Clean and purified drinking water is available to keep you hydrated throughout your study sessions, ensuring a refreshing and healthy library experience." },

        { serviceName: "Desk Lamp", imgLink: desklamp, bgColor: "bg-yellow-400", colorFrom: "from-yellow-200", colorTo: "to-yellow-50", content: "Individual desk lamps provide focused lighting, reducing eye strain and creating the perfect ambiance for reading, studying, or working without distractions." },

        { serviceName: "Wi-Fi Access", imgLink: wifirouter, bgColor: "bg-purple-400", colorFrom: "from-violet-300", colorTo: "to-violet-50", content: "Stay connected with our high-speed internet, ensuring seamless research, uninterrupted online study, and smooth access to digital resources for an enhanced learning experience." },

        { serviceName: "Power Outlets", imgLink: powersocket, bgColor: "bg-pink-400", colorFrom: "from-pink-300", colorTo: "to-pink-50", content: "Convenient charging stations ensure your devices stay powered throughout your study sessions, allowing uninterrupted work on laptops, tablets, and other electronic essentials." },

        { serviceName: "AC Room", imgLink: ac, bgColor: "bg-cyan-400", colorFrom: "from-cyan-300", colorTo: "to-cyan-50", content: "Enjoy a comfortable reading environment with fully air-conditioned rooms, ensuring a pleasant and distraction-free atmosphere for studying or working with your favorite books." },

        { serviceName: "Silent Zone", imgLink: "https://static.vecteezy.com/system/resources/previews/051/989/853/non_2x/no-sound-sign-indicating-silence-zone-or-no-sound-area-sign-and-mute-free-png.png", bgColor: "bg-green-400", colorFrom: "from-green-300", colorTo: "to-green-50", content: "A dedicated noise-free space designed for deep focus, ensuring a peaceful and distraction-free environment for studying, reading, or working efficiently." },

        { serviceName: "News Papers", imgLink: newspaper, bgColor: "bg-gray-300", colorFrom: "from-gray-300", colorTo: "to-gray-50", content: "Stay updated with the latest news and current affairs with a daily newspaper, available for readers to stay informed and enhance their general knowledge." }
    ]

    return (
        <div className='my-12 text-gray-700'>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
                <div className='flex items-center'>
                    <h3 className='text-3xl md:text-5xl font-bold'>We offer the best facilities</h3>
                </div>

                {
                    serviceList.map((service, idx) => {
                        return <div key={idx} className={`border border-gray-300 rounded-lg relative h-44 bg-gradient-to-t ${service.colorFrom} ${service.colorTo} flex flex-col justify-around overflow-hidden`}>
                            <h4 className='text-xl md:text-2xl font-semibold h-[25%] p-2 z-10'>{service.serviceName}</h4>
                            <div className='h-[75%] flex items-center justify-between relative group'>
                                <div className={`${service.bgColor} shadow-md px-2 py-0.5 rounded-md mt-10 ml-4 w-28 text-center text-gray-700 group-hover:opacity-0`}>Read <IoReaderOutline className='inline-block mb-0.5'/></div>

                                <img src={service.imgLink} alt="" className={`object-contain w-full h-40 mb-8`} />
                                <div className='absolute bottom-[-100%] group-hover:bottom-0 p-2 transition-all duration-200 ease-in-out bg-black/65 text-white h-full overflow-y-auto rounded-b-lg'>{service.content}</div>
                            </div>
                        </div>
                    })
                }
            </div>

        </div>
    )
}

export default Services;