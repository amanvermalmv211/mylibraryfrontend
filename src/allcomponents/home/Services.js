import React from 'react'

const Services = () => {

    const serviceList = [
        { serviceName: "AC Room", imgLink: "https://totalpng.com//public/uploads/preview/hd-ac-png-air-conditioner-png-images-clipart-11664625497zy0t29bonc.png", imgWidth: "w-48", colorFrom: "from-cyan-300", colorTo: "to-cyan-50" },
        { serviceName: "Desk and Chair", imgLink: "https://www.pngkit.com/png/full/62-628117_elegant-beach-with-chairs-pictures-16-png-furniture.png", imgWidth: "w-36", colorFrom: "from-orange-300", colorTo: "to-orange-50" },
        { serviceName: "Drinking Water", imgLink: "https://static.vecteezy.com/system/resources/previews/020/002/950/non_2x/drinking-water-graphic-clipart-design-free-png.png", imgWidth: "w-24", colorFrom: "from-green-300", colorTo: "to-green-50" },
        { serviceName: "Desk Lamp", imgLink: "https://static.vecteezy.com/system/resources/previews/009/356/449/original/table-lamp-clipart-design-illustration-free-png.png", imgWidth: "w-14", colorFrom: "from-yellow-200", colorTo: "to-yellow-50" },
        { serviceName: "News Papers", imgLink: "https://pngimg.com/uploads/newspaper/newspaper_PNG11.png", imgWidth: "w-28", colorFrom: "from-gray-300", colorTo: "to-gray-50" }
    ]

    return (
        <div className='my-12 text-gray-700'>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'>
                <div className='flex items-center'>
                    <h3 className='text-3xl md:text-5xl font-bold'>We provide best facilities</h3>
                </div>

                {
                    serviceList.map((service, idx) => {
                        return <div key={idx} className={`border border-gray-300 rounded-lg relative h-44 bg-gradient-to-t ${service.colorFrom} ${service.colorTo} flex flex-col justify-around overflow-hidden`}>
                            <h4 className='text-xl md:text-2xl font-semibold text-center h-[25%] flex items-center justify-center'>{service.serviceName}</h4>
                            <div className='h-[75%] flex items-center justify-center relative group'>
                                <img src={service.imgLink} alt="" className={`${service.imgWidth} object-contain`} />
                                <div className='absolute bottom-[-100%] group-hover:bottom-0 p-2 transition-all duration-200 ease-in-out bg-black/65 text-white h-full overflow-y-auto rounded-b-lg'>
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit aut quisquam doloremque, suscipit nobis iste animi vitae odit? Dignissimos aspernatur ex, quaerat nostrum iusto excepturi eaque doloribus recusandae explicabo veniam.
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>

        </div>
    )
}

export default Services;