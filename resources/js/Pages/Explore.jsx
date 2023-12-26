import {
    Head,
} from '@inertiajs/react';
import SearchLink from '@/Components/SearchLink';
import Navbar from '@/Components/navbar'
import LinkCard from '@/Components/LinkCard';
import { IconCopy } from '@tabler/icons-react';


export default function Explore({ auth }) {
    const icons = [
        {
            component: <IconCopy size={20} />,
            action: () => {
                console.log('Edit clicked');
            },
            color: 'i-pink-300',
        },
    ];

    return (
        <>
            <Head title="Explore" />
            <Navbar auth={auth} />
            <div>
                <SearchLink />
            </div>
            <div className='grid grid-flow-row grid-cols-1 gap-4 px-10 py-4 sm:grid-cols-2 lg:grid-cols-3'>
                <LinkCard icons={icons} />
                <LinkCard icons={icons} />
                <LinkCard icons={icons} />
                <LinkCard icons={icons} />
            </div>


        </>
    )
}