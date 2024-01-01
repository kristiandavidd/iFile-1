import React, { useState } from 'react'
import { Head, usePage } from '@inertiajs/react'
import { Navbar } from '@/Components/navbar'
import LinkCard from '@/Components/LinkCard'
import { IconPencil, IconTrash } from '@tabler/icons-react';
import SearchLink from '@/Components/SearchLink';
import { Link } from '@inertiajs/react';
import Swal from 'sweetalert2';

export default function MyFile({ auth, files }) {
    const [fileId, setFileId] = useState(null);
    const icons = [
        {
            component: <IconPencil size={20} />,
            route: 'edit-file',
            color: 'i-yellow-500',
        },
        {
            component: <IconTrash size={20} />,
            route: 'delete-file',
            // action: () => handleDeleteClick(),
            color: 'i-orange-500',
        },
    ];

    const handleDeleteClick = () => {
        fileId.preventDefault();
        setDeleteFileId(fileId);
        console.log('delete file id', fileId);

        Swal.fire({
            title: 'Konfirmasi Hapus',
            text: 'Anda yakin ingin menghapus file ini?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#F8B9CF',
            cancelButtonColor: '#E91E63',
            // confirmButtonText: 'Ya, Hapus!',
            confirmButtonText: '<span style="color: #E91E63;">Ya, Hapus!</span>',
            reverseButtons: true,
            customClass: {
                confirmButton: 'custom-confirm-button-class',
            }
        }).then((result) => {
            if (result.isConfirmed) {
                console.log('delete file id', fileId);
                route('delete-file', { id: fileId });
            }
        });
    };

    return (
        <>
            <Head title='File Saya'></Head>
            <Navbar auth={auth} />
            <div className='px-10'>

                <div className='flex items-center justify-between'>
                    <SearchLink />
                    <Link href={route('tambah-file')} className='px-4 py-2 text-white text-gray-600 rounded-md h-fit hover:text-gray-900 focus:bg-i-pink-500/60 bg-i-pink-500'>
                        +Tambah File
                    </Link>
                </div>
                <div className='grid grid-flow-row grid-cols-1 gap-4 py-4 sm:grid-cols-2 lg:grid-cols-3'>
                    {files && files.map((file) => (
                        <LinkCard key={file.id} icons={icons} file={file} />
                    ))}
                </div>
            </div>
        </>

    )
}
