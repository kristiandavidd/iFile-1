import React from 'react'
import { Head } from '@inertiajs/react'
import Navbar from '@/Components/navbar'
import LinkCard from '@/Components/LinkCard'
import { IconPencil, IconTrash } from '@tabler/icons-react';

export default function MyFile({ auth }) {
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
    return (
        <>
            <Head title='File Saya'></Head>
            <Navbar auth={auth} />
            <div className='grid grid-flow-row grid-cols-1 gap-4 px-10 py-4 sm:grid-cols-2 lg:grid-cols-3'>
                <LinkCard icons={icons} />
                <LinkCard icons={icons} />
                <LinkCard icons={icons} />
                <LinkCard icons={icons} />
            </div>
        </>

    )
}
