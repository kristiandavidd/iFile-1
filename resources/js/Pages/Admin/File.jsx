import {
    Head,
} from '@inertiajs/react';
import SearchLink from '@/Components/SearchLink';
import { NavbarAdmin } from '@/Components/navbar'
import LinkCard from '@/Components/LinkCard';
import { IconCopy, IconUserCircle, IconCalendarPlus, IconPencil, IconTrash } from '@tabler/icons-react';
import { Link } from '@inertiajs/react';
import React, { useRef, useState, useEffect } from 'react'
import Swal from 'sweetalert2';


export default function File({ auth, files, kategori }) {
    const contentRef = useRef(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredFiles, setFilteredFiles] = useState(files);

    const handleDeleteClick = (id) => {
        Swal.fire({
            title: 'Konfirmasi Hapus File',
            text: 'Anda yakin ingin menghapus file ini?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#F8B9CF',
            cancelButtonColor: '#E91E63',
            confirmButtonText: '<span style="color: #E91E63;">Hapus</span>',
            reverseButtons: true,
            customClass: {
                confirmButton: 'custom-confirm-button-class',
            }
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = route('delete-file', { id: id });
            }
        });
    };

    const handleCopyClick = (content) => {
        navigator.clipboard.writeText(content);
    };

    const searchFilter = () => {
        if (searchQuery.trim() === '') {
            setFilteredFiles(files);
        } else {
            const filtered = files.filter((file) =>
                ['nama_file', 'url', 'deskripsi'].some((field) =>
                    file[field].toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
            setFilteredFiles(filtered);
        }
    };

    useEffect(() => {
        searchFilter();
    }, [searchQuery, files]);

    return (
        <>
            <Head title="File Manajemen" />
            <NavbarAdmin auth={auth} />
            <div className='px-10'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-4'>
                        <SearchLink
                            onChange={(e) => setSearchQuery(e.target.value)}
                            value={searchQuery}
                        />
                        <select
                            name="kategori"
                            id="kategori"
                            className='block mt-1 rounded-md w-[250px] border-i-pink-500 h-fit'
                            onChange={(e) => setData('kategori', e.target.value)}
                        >
                            <option value="">Pilih Kategori</option>
                            {kategori && kategori.map((k) => (
                                <option key={k.id} value={k.id}>{k.kategori}</option>
                            ))}
                        </select>
                    </div>
                    <Link href={route('tambah-file')} className='px-4 py-2 text-white text-gray-600 rounded-md h-fit hover:text-gray-900 focus:bg-i-pink-500/60 bg-i-pink-500'>
                        +Tambah File
                    </Link>
                </div>

                <div className='grid grid-flow-row grid-cols-1 gap-4 py-4 sm:grid-cols-2 lg:grid-cols-3'>
                    {filteredFiles && filteredFiles.map((file) => (
                        <div className='w-full overflow-hidden shadow-md shadow-i-pink-500/20 rounded-xl'>
                            <div className=' flex justify-between px-4 text-[12px] text-i-pink-500 relative top-4'>
                                <p className='flex items-center gap-1'><IconUserCircle size={16} strokeWidth={1.2} ></IconUserCircle>
                                    {file.userRole === 'uploader' ? (file.uploader ? file.uploader.username : 'Unknown Uploader') : file.waster.username}
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

                                    <a href={file.url} target='_blank' className="w-full px-4 py-2 text-center text-white text-gray-600 truncate rounded-md hover:text-gray-900 focus:bg-i-pink-500/60 bg-i-pink-500">
                                        {file.url}
                                    </a>
                                    <button onClick={() => handleCopyClick(file.url)} className={`px-2 py-2 text-center text-white rounded-md hover:text-gray-900  bg-i-pink-300 active:bg-i-pink-100`}>
                                        <IconCopy />
                                    </button>
                                    <a
                                        className={`px-2 py-2 text-center text-white rounded-md hover:text-gray-900  bg-i-yellow-500`}
                                        href={route('edit-file', { id: file.id })}>
                                        <IconPencil size={20} />
                                    </a>
                                    <a
                                        className={`cursor-pointer px-2 py-2 text-center text-white rounded-md hover:text-gray-900  bg-i-orange-500`}
                                        onClick={() => handleDeleteClick(file.id)}
                                    >
                                        <IconTrash size={20} />
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