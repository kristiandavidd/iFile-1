import {
    Head,
} from '@inertiajs/react';
import SearchLink from '@/Components/SearchLink';
import Navbar from '@/Components/navbar'
import LinkCard from '@/Components/LinkCard';
import { IconCopy, IconUserCircle, IconCalendarPlus } from '@tabler/icons-react';
import { Link } from '@inertiajs/react';
import React, { useRef } from 'react'


export default function Eksplor({ auth, files }) {
    console.log('Files:', files);
    const contentRef = useRef(null);
    const icons = [
        {
            component: <IconCopy size={20} />,
            action: () => {
                console.log('Edit clicked');
            },
            color: 'i-pink-300',
        },
    ];

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
            <Head title="Eksplor" />
            <Navbar auth={auth} />
            <div className='px-10'>

                <div>
                    <SearchLink />
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