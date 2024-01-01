import React, { useRef } from 'react'
import { Head, Link } from "@inertiajs/react"
import { Navbar } from "@/Components/navbar"
import LinkCard from "@/Components/LinkCard"
import { IconRotateClockwise, IconUserCircle, IconCalendarPlus } from '@tabler/icons-react';
import SearchLink from "@/Components/SearchLink";
import Swal from 'sweetalert2';

export default function Sampah({ auth, files }) {
    const contentRef = useRef(null);

    const handleRestoreClick = (id) => {
        Swal.fire({
            title: 'Konfirmasi Pemulihan File',
            text: 'Anda yakin ingin memulihkan file ini?',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#F8B9CF',
            confirmButtonColor: '#E91E63',
            confirmButtonText: 'Pulihkan',
            cancelButtonText: '<span style="color: #E91E63;">cancel</span>',
            reverseButtons: true,
            customClass: {
                confirmButton: 'custom-confirm-button-class',
            }
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = route('restore-file', { id: id });
            }
        });
    };

    return (
        <>
            <Head title="Sampah"></Head>
            <Navbar auth={auth} />
            <div className="px-10">
                <SearchLink />


                <div className='grid grid-flow-row grid-cols-1 gap-4 py-4 sm:grid-cols-2 lg:grid-cols-3'>
                    {files && files.map((file) => (
                        <div className='w-full overflow-hidden shadow-md shadow-i-pink-500/20 rounded-xl'>
                            <div className=' flex justify-between px-4 text-[12px] text-i-pink-500 relative top-4'>
                                <p className='flex items-center gap-1'><IconUserCircle size={16} strokeWidth={1.2} ></IconUserCircle>
                                    {file.userRole === 'uploader' ? (file.uploader ? file.uploader.name : 'Unknown Uploader') : file.waster.name}
                                </p>
                                <p className='flex items-center gap-1'><IconCalendarPlus size={16} strokeWidth={1.2} ></IconCalendarPlus> {file.formattedDate}</p>
                            </div>

                            <div className='bg-i-pink-100 w-[70px] h-[70px] rounded-full m-auto z-10 relative top-[35px]'>

                            </div>
                            <div className='flex flex-col items-center h-4/5 p-5 pt-10 text-sm bg-i-pink-50 z-[-1] '>
                                <p className='px-4 py-2 text-[12px] bg-white rounded-full text-i-pink-500 '>{file.kategori.kategori}</p>
                                <div className='py-3'>
                                    <p className='py-1 font-semibold text-center'>{file.nama_file}</p>
                                    <p className='py-1 text-[12px] text-center'>{file.deskripsi}</p>

                                </div>
                                <div className='flex w-full gap-2' ref={contentRef}>

                                    <a href={file.url} target='_blank' className="w-full px-4 py-2 text-center text-white text-gray-600 truncate rounded-md hover:text-gray-900 focus:bg-i-pink-500/60 bg-i-pink-500"
                                    >
                                        {file.url}
                                    </a>
                                    <a onClick={() => handleRestoreClick(file.id)} className={`px-2 py-2 text-center text-white rounded-md hover:text-gray-900  bg-i-yellow-500`}>
                                        <IconRotateClockwise size={20} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}