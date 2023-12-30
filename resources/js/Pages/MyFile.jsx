import React from 'react'
import { Head } from '@inertiajs/react'
import Navbar from '@/Components/navbar'
import LinkCard from '@/Components/LinkCard'
import { IconPencil, IconTrash } from '@tabler/icons-react';
import SearchLink from '@/Components/SearchLink';
import { Link } from '@inertiajs/react';

export default function MyFile({ auth, files }) {
    const icons = [
        {
            component: <IconPencil size={20} />,
            action: () => {
                // Handle edit action
                console.log('Edit clicked');
            },
            color: 'i-yellow-500',
        },
        {
            component: <IconTrash size={20} />,
            action: () => {
                // Handle delete action
                console.log('Delete clicked');
            },
            color: 'i-orange-500',
        },
    ];

    const handleTambahFileClick = () => {
        return route('tambah-file');
    };

    return (
        <>
            <Head title='File Saya'></Head>
            <Navbar auth={auth} />
            <div className='px-10'>

                <div className='flex justify-between items-center'>
                    <SearchLink />
                    <Link href={route('tambah-file')} className='px-4 py-2 h-fit text-white text-gray-600 rounded-md hover:text-gray-900 focus:bg-i-pink-500/60 bg-i-pink-500'>
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
