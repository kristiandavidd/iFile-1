import React, { useRef, useState, useEffect } from 'react'
import { Head, Link } from "@inertiajs/react"
import { Navbar, NavbarAdmin } from "@/Components/navbar"
import LinkCard from "@/Components/LinkCard"
import { IconPencil, IconUserCircle, IconCalendarPlus, IconCopy, IconTrash, IconCornerDownRight, IconArrowUpRight } from '@tabler/icons-react';
import SearchLink from "@/Components/SearchLink";
import Swal from 'sweetalert2';

export default function ShowKategori({ auth, files, kategori }) {
    const contentRef = useRef(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredFiles, setFilteredFiles] = useState(files);

    const handleCopyClick = (content) => {
        navigator.clipboard.writeText(content);
    };

    const truncateString = (url, maxLength = 24) => {
        if (url.length > maxLength) {
            return `${url.slice(0, maxLength)}...`;
        }
        return url;
    };

    useEffect(() => {
        let filtered = files;

        if (searchQuery.trim() !== '') {
            filtered = filtered.filter((file) =>
                ['nama_file', 'url', 'deskripsi'].some((field) =>
                    String(file[field]).toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
        }

        setFilteredFiles(filtered);
    }, [searchQuery, files]);

    return (
        <>
            <Head title="Home" />
            <div className='flex w-full'>
                {auth && auth.user && auth.user.role === 'admin' ? (
                    <NavbarAdmin auth={auth} kategori={kategori} />
                ) : (
                    <Navbar auth={auth} kategori={kategori} />
                )}
                <div className='w-4/5 p-10'>
                    <div className='flex items-center gap-4'>
                        <SearchLink
                            onChange={(e) => setSearchQuery(e.target.value)}
                            value={searchQuery}
                        />
                    </div>
                    <table className='w-full my-3 text-sm rounded-md table-auto text-wrap border-spacing-y-2'>
                        <thead className=''>
                            <tr className='border-b-[1.5px] border-i-pink-500 bg-i-pink-100'>
                                <th className='py-3 font-semibold'>File</th>
                                <th className='font-semibold'>Deskripsi</th>
                                <th className='font-semibold'>Tanggal</th>
                                <th className='font-semibold'>Uploader</th>
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
                                        <p className='px-2 py-1 bg-white rounded-md'>{file.uploader.username}</p>
                                    </td>
                                    <td className='flex items-center justify-center gap-2 px-4 py-2'>

                                        <a
                                            className={`px-2 py-2 text-center text-white rounded-md hover:text-gray-900  bg-i-yellow-500`}
                                            href={route('edit-file', { id: file.id })}>
                                            <IconPencil size={16} />
                                        </a>
                                        <a
                                            className={`cursor-pointer px-2 py-2 text-center text-white rounded-md hover:text-gray-900  bg-i-orange-500`}
                                            onClick={() => handleDeleteClick(file.id)}
                                        >
                                            <IconTrash size={16} />
                                        </a>
                                    </td>
                                </tr>
                                <tr className='' >
                                    <td className='w-full px-2 py-2 border-b-[1.5px] border-i-pink-500' colSpan='5'>
                                        <div className='flex items-center gap-2'>
                                            <IconCornerDownRight size={20} />
                                            <a href={file.url} target='_blank' className='text-[12px] px-4 py-1 rounded-md bg-i-pink-50 flex hover:text-i-pink-500 items-center'>{truncateString(file.url)}<IconArrowUpRight size={18} strokeWidth={1.2} /></a>
                                            <button onClick={() => handleCopyClick(file.url)} className={`px-1 py-1 text-center  rounded-md hover:text-gray-900  bg-i-pink-100 active:bg-i-pink-500 hover:text-white duration-300 transition-opacity hover:bg-i-pink-300`}>
                                                <IconCopy size={18} strokeWidth={1.2} />
                                            </button>
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