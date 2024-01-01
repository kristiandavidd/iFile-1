import {
    Head,
} from '@inertiajs/react';
import Search from '@/Components/SearchLink';
import { NavbarAdmin } from '@/Components/navbar'
import LinkCard from '@/Components/LinkCard';


export default function Home({ auth }) {
    return (
        <>
            <Head title="Dashboard" />
            <NavbarAdmin auth={auth} />
            <div className='w-3/5 m-auto'>
                <p class="my-4 text-4xl font-semibold text-center">Selamat Datang di Sistem Informasi Manajemen File</p>
                <p className='my-2 text-center'>Sistem Informasi Manajemen File akan membantu anda dalam memanajemen file-file keperluan administrasi di lingkungan Departemen Informatika Universitas Diponegoro.</p>
            </div>
            <div className='flex w-3/5 gap-4 m-auto my-4 px-7'>
                <div className='h-[300px] w-full bg-i-pink-100 rounded-md p-4'></div>
                <div className='h-[300px] w-full bg-i-pink-100 rounded-md p-4'></div>
                <div className='h-[300px] w-full bg-i-pink-100 rounded-md p-4'></div>
            </div>


        </>
    )
}