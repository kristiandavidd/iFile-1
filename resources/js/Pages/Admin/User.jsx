import {
    Head,
} from '@inertiajs/react';
import SearchLink from '@/Components/SearchLink';
import { NavbarAdmin } from '@/Components/navbar'
import LinkCard from '@/Components/LinkCard';
import { IconCopy, IconUserCircle, IconCalendarPlus } from '@tabler/icons-react';
import { Link } from '@inertiajs/react';
import React, { useRef } from 'react'


export default function User({ auth }) {
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
            <Head title="Eksplor" />
            <NavbarAdmin auth={auth} />
            <div className='px-10'>
                <div>
                    <SearchLink />
                </div>

            </div>

        </>
    )
}