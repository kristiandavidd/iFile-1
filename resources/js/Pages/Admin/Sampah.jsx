import React, { useRef, useState, useEffect } from 'react'
import { Head } from "@inertiajs/react"
import { NavbarAdmin } from "@/Components/navbar"
import LinkCard from "@/Components/LinkCard"
import { IconTrash, IconRotateClockwise, IconUserCircle, IconCalendarPlus, IconArrowUpRight, IconCornerDownRight } from '@tabler/icons-react';
import SearchLink from "@/Components/SearchLink";
import Swal from 'sweetalert2';

export default function Sampah({ auth, files, kategori }) {
    const contentRef = useRef(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [filteredFiles, setFilteredFiles] = useState(files);

    useEffect(() => {
        let filtered = files;

        if (searchQuery.trim() !== '') {
            filtered = filtered.filter((file) =>
                ['nama_file', 'url', 'deskripsi'].some((field) =>
                    String(file[field]).toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
        }

        if (selectedCategory !== '') {
            filtered = filtered.filter((file) => file.kategori.id === Number(selectedCategory));
        }

        setFilteredFiles(filtered);
    }, [searchQuery, selectedCategory, files]);

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

    const handleDeletePermanen = (id) => {
        Swal.fire({
            title: 'Konfirmasi Hapus Permanen File',
            text: 'Anda yakin ingin menghapus permanen file ini?',
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
                window.location.href = route('delete-permanen', { id: id });
            }
        });
    };

    const truncateString = (url, maxLength = 24) => {
        if (url.length > maxLength) {
            return `${url.slice(0, maxLength)}...`;
        }
        return url;
    };

    return (
        <>
            <Head title="Sampah"></Head>
            <div className='flex w-full'>
                <NavbarAdmin auth={auth} kategori={kategori} />
                <div className='w-4/5 p-10'>

                    <div className='flex items-center gap-4'>
                        <SearchLink
                            onChange={(e) => setSearchQuery(e.target.value)}
                            value={searchQuery}
                        />
                        <select
                            name="kategori"
                            id="kategori"
                            className='block mt-1 w-[250px] rounded-md border-i-pink-500 h-fit'
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            <option value="">Pilih Kategori</option>
                            {kategori && kategori.map((k) => (
                                <option key={k.id} value={k.id}>{k.kategori}</option>
                            ))}
                        </select>
                    </div>
                    <table className='w-full my-3 text-sm rounded-md table-auto text-wrap border-spacing-y-2'>
                        <thead className=''>
                            <tr className='border-b-[1.5px] border-i-pink-500 bg-i-pink-100'>
                                <th className='py-3 font-semibold'>File</th>
                                <th className='font-semibold'>Deskripsi</th>
                                <th className='font-semibold'>Tanggal</th>
                                <th className='font-semibold'>Waster</th>
                                <th className='px-4 font-semibold'>Action</th>
                            </tr>
                        </thead>
                        {filteredFiles && filteredFiles.map((file) => (
                            <tbody>
                                <tr className='bg-i-pink-50'>
                                    <td className='px-2 font-semibold'>
                                        {file.nama_file}
                                    </td>
                                    <td>{truncateString(file.deskripsi)}</td>
                                    <td className='text-center'>{file.formattedDate}</td>
                                    <td className='px-4 text-center'>
                                        <p className='px-2 py-1 bg-white rounded-md'>{file.waster.username}</p>
                                    </td>
                                    <td className='flex items-center justify-center gap-2 px-4 py-2'>
                                        <a onClick={() => handleRestoreClick(file.id)} className={`cursor-pointer px-2 py-2 text-center text-white rounded-md hover:text-gray-900  bg-i-yellow-500`}>
                                            <IconRotateClockwise size={16} />
                                        </a>
                                        <a onClick={() => handleDeletePermanen(file.id)} className={`cursor-pointer px-2 py-2 flex items-center text-center text-white rounded-md hover:text-gray-900  bg-i-orange-500`}>
                                            <IconTrash size={16} />
                                        </a>
                                    </td>
                                </tr>
                                <tr className='' >
                                    <td className='w-full px-2 py-2 border-b-[1.5px] border-i-pink-500' colSpan='5'>
                                        <div className='flex items-center gap-2'>
                                            <IconCornerDownRight size={20} />
                                            <a href={file.url} target='_blank' className='text-[12px] px-4 py-1 rounded-md bg-i-pink-50 flex hover:text-i-pink-500 items-center'>{truncateString(file.url)}<IconArrowUpRight size={18} strokeWidth={1.2} /></a>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>

                        ))}
                    </table>
                </div>
            </div>
        </>
    )
}