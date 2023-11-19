import {
    Head,
} from '@inertiajs/react';
import Search from '@/Components/search';
import Navbar from '@/Components/navbar'


export default function Home({ auth }) {
    return (
        <>
            <Head title="Home" />
            <Navbar auth={auth} />


        </>
    )
}