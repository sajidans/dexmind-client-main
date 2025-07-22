import React, { useEffect, useState } from 'react'
import { GlowButton } from '../../components/ui/Buttons'
import { getAllBanners } from '../../api/user-api';
import { formatDateTime } from '../../utils/dateFunctions';

const Announcement = () => {
    const [allData, setAllData] = useState([]);
    const [selected, setSelected] = useState(null);

    const fetchAnnouncement = async () => {
        try {
            const response = await getAllBanners();
            console.log(response)
            setAllData(response?.data || []);
            setSelected(response?.data?.[0]);
        } catch (error) {
            console.log(error);
        }
    }



    useEffect(() => {
        fetchAnnouncement();
    }, []);

    return (
        <div className='space-y-10 p-4 md:p-10 max-w-screen-xl mx-auto'>
            <GlowButton text="Announcement" onClick={() => { }} />

            <div className='border-2 border-[#00d5e6] rounded-3xl p-4 sm:p-6 bg-black/20'>
                <div className='flex flex-col lg:flex-row gap-8'>
                    {/* Left Side - Announcements List */}
                    <div className='w-full lg:w-1/2 space-y-6'>
                        {allData.map((item, index) => (
                            <div
                                onClick={() => setSelected(item)}
                                key={index}
                                className='flex justify-between gap-4 p-4 border-2 border-gray-400 rounded-3xl cursor-pointer hover:border-[#00d5e6]'
                            >
                                <div className='space-y-3 flex-1'>
                                    <h2 className='text-xl font-semibold'>{item.title}</h2>
                                    <button className='bg-white text-black hover:bg-[#00d5e6] transition-all duration-300 px-4 py-2 rounded-lg text-base font-semibold'>
                                        {item.desription}
                                    </button>
                                    <p className='text-sm'>{formatDateTime(item?.createdAt)}</p>

                                </div>
                                <div className='flex-shrink-0'>
                                    <img src={item.imageUrl} alt="notice" className='h-32 w-32 sm:h-40 sm:w-40 object-cover object-top rounded-xl' />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right Side - Selected Announcement */}
                    {selected && (
                        <div className='w-full lg:w-1/2'>
                            <div>
                                <img src={selected.imageUrl} alt="eid" className='h-80 w-full max-w-md object-cover object-top mx-auto rounded-xl' />
                            </div>
                            <div className='text-center mt-6 space-y-3 px-2'>
                                <h2 className='text-xl md:text-2xl font-semibold'>{selected.title}</h2>
                                <p className='text-base md:text-lg'>{selected.desription}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Announcement;
