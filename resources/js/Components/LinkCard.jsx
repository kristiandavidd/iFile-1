import React, { useRef } from 'react'
import { IconUserCircle, IconCalendarPlus } from '@tabler/icons-react';
import { Link } from '@inertiajs/react';

export default function LinkCard({ icons }) {
    const contentRef = useRef(null);

    const handleCopyClick = () => {
        const range = document.createRange();
        range.selectNode(contentRef.current);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        document.execCommand('copy');
        window.getSelection().removeAllRanges();
    };

    return (

        <>
            <div className='w-full overflow-hidden shadow-md shadow-i-pink-500/20 rounded-xl'>
                <div className=' flex justify-between px-4 text-[12px] text-i-pink-500 relative top-4'>
                    <p className='flex items-center gap-1'><IconUserCircle size={16} strokeWidth={1.2} ></IconUserCircle> Sophie</p>
                    <p className='flex items-center gap-1'><IconCalendarPlus size={16} strokeWidth={1.2} ></IconCalendarPlus> 8 Okt 2023</p>
                </div>

                <div className='bg-i-pink-100 w-[70px] h-[70px] rounded-full m-auto z-10 relative top-[35px]'>

                </div>
                <div className='flex flex-col items-center h-4/5 p-5 pt-10 text-sm bg-i-pink-50 z-[-1] '>
                    <p className='px-4 py-2 text-[12px] bg-white rounded-full text-i-pink-500 '>Pengabdian Masyarakat</p>
                    <div className='py-3'>
                        <p className='py-1 font-semibold text-center'>SK Pengabdian Masyarakat Gasal 2023/2024</p>
                        <p className='py-1 text-[12px] text-center'>Surat Keterangan Pengabdian Masyarakat 2023/2024 Informatika Fakultas Sains dan Matematika UNDIP</p>

                    </div>
                    <div className='flex w-full gap-2' ref={contentRef}>

                        <Link className="w-full px-4 py-2 text-center text-white text-gray-600 rounded-md hover:text-gray-900 focus:bg-i-pink-500/60 bg-i-pink-500"
                            onClick={handleCopyClick}>
                            https://seadesign.site/
                        </Link>
                        {icons.map((icon, index) => (
                            <Link key={index} className={`px-2 py-2 text-center text-white rounded-md w-min hover:text-gray-900 bg-${icon.color}`} onClick={icon.action}>
                                {icon.component}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
