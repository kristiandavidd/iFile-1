import {
    Head,
} from '@inertiajs/react';
import Search from '@/Components/SearchLink';
import Navbar from '@/Components/navbar'
import LinkCard from '@/Components/LinkCard';


export default function dashboard({ auth }) {
    return (
        <>
            <Head title="Dashboard" />
            <Navbar auth={auth} />
            <div className='grid grid-flow-row grid-cols-1 gap-4 px-10 py-4 sm:grid-cols-2 lg:grid-cols-3'>

            </div>


        </>
    )
}