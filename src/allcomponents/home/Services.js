import React from 'react';

const Services = () => {

    const serviceList = [
        { serviceName: "Desk and Chair", imgLink: "https://www.pngkit.com/png/full/62-628117_elegant-beach-with-chairs-pictures-16-png-furniture.png", imgWidth: "w-36", colorFrom: "from-orange-300", colorTo: "to-orange-50", content: "Spacious desks and ergonomic chairs provide a comfortable setup for reading, studying, and working, ensuring proper posture and a productive environment for long study sessions." },

        { serviceName: "Drinking Water", imgLink: "https://static.vecteezy.com/system/resources/previews/020/002/950/non_2x/drinking-water-graphic-clipart-design-free-png.png", imgWidth: "w-24", colorFrom: "from-blue-300", colorTo: "to-blue-50", content: "Clean and purified drinking water is available to keep you hydrated throughout your study sessions, ensuring a refreshing and healthy library experience." },

        { serviceName: "Desk Lamp", imgLink: "https://static.vecteezy.com/system/resources/previews/009/356/449/original/table-lamp-clipart-design-illustration-free-png.png", imgWidth: "w-14", colorFrom: "from-yellow-200", colorTo: "to-yellow-50", content: "Individual desk lamps provide focused lighting, reducing eye strain and creating the perfect ambiance for reading, studying, or working without distractions." },

        { serviceName: "Wi-Fi Access", imgLink: "https://static.vecteezy.com/system/resources/previews/021/621/126/non_2x/3d-icon-illustration-router-with-wifi-network-png.png", imgWidth: "w-32", colorFrom: "from-violet-300", colorTo: "to-violet-50", content: "Stay connected with our high-speed internet, ensuring seamless research, uninterrupted online study, and smooth access to digital resources for an enhanced learning experience." },

        { serviceName: "Power Outlets", imgLink: "https://pngimg.com/d/power_socket_PNG19309.png", imgWidth: "w-20", colorFrom: "from-pink-300", colorTo: "to-pink-50", content: "Convenient charging stations ensure your devices stay powered throughout your study sessions, allowing uninterrupted work on laptops, tablets, and other electronic essentials." },

        { serviceName: "AC Room", imgLink: "https://totalpng.com//public/uploads/preview/hd-ac-png-air-conditioner-png-images-clipart-11664625497zy0t29bonc.png", imgWidth: "w-48", colorFrom: "from-cyan-300", colorTo: "to-cyan-50", content: "Enjoy a comfortable reading environment with fully air-conditioned rooms, ensuring a pleasant and distraction-free atmosphere for studying or working with your favorite books." },

        { serviceName: "Silent Zone", imgLink: "https://static.vecteezy.com/system/resources/previews/051/989/853/non_2x/no-sound-sign-indicating-silence-zone-or-no-sound-area-sign-and-mute-free-png.png", imgWidth: "w-24", colorFrom: "from-green-300", colorTo: "to-green-50", content: "A dedicated noise-free space designed for deep focus, ensuring a peaceful and distraction-free environment for studying, reading, or working efficiently." },

        { serviceName: "News Papers", imgLink: "https://pngimg.com/uploads/newspaper/newspaper_PNG11.png", imgWidth: "w-28", colorFrom: "from-gray-300", colorTo: "to-gray-50", content: "Stay updated with the latest news and current affairs with a daily newspaper, available for readers to stay informed and enhance their general knowledge." }
    ]

    return (
        <div className='my-12 text-gray-700'>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'>
                <div className='flex items-center'>
                    <h3 className='text-3xl md:text-5xl font-bold'>We offer the best facilities</h3>
                </div>

                {
                    serviceList.map((service, idx) => {
                        return <div key={idx} className={`border border-gray-300 rounded-lg relative h-44 bg-gradient-to-t ${service.colorFrom} ${service.colorTo} flex flex-col justify-around overflow-hidden`}>
                            <h4 className='text-xl md:text-2xl font-semibold text-center h-[25%] flex items-center justify-center'>{service.serviceName}</h4>
                            <div className='h-[75%] flex items-center justify-center relative group'>
                                <img src={service.imgLink} alt="" className={`${service.imgWidth} object-contain`} />
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