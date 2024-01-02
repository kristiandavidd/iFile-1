import {
    Head,
} from '@inertiajs/react';
import { Navbar } from '@/Components/navbar'


export default function Home({ auth, kategori }) {
    return (
        <>
            <Head title="Home" />
            <Navbar auth={auth} />
            <div className='px-10'>
                <div className='w-3/5 m-auto'>
                    <p class="my-4 text-4xl font-semibold text-center">Selamat Datang di iFile</p>
                    <p className='my-2 text-center'>Sistem Informasi ini akan membantu anda terkait pengelolaan file di lingkungan Departemen Informatika Universitas Diponegoro.</p>
                </div>
                <div className='w-4/5 m-auto'>
                    <p className='mt-5 text-lg font-semibold text-center'>Jelajahi iFile</p>

                    <div className='grid grid-flow-row grid-cols-1 gap-4 py-4 sm:grid-cols-2 lg:grid-cols-3'>
                        {kategori && kategori.map((k) => (
                            <div className='flex justify-between w-full p-4 rounded-md shadow-md shadow-i-pink-500/20'>
                                <div className='flex flex-col items-center gap-4 mb-4 text-center'>
                                    <div>
                                        <div className='bg-i-pink-100 w-[70px] h-[70px] rounded-full m-auto'>
                                        </div>
                                    </div>
                                    <div>
                                        <p className='mb-1 font-semibold text-md'>{k.kategori}</p>
                                        <p className='text-sm'>{k.keterangan}</p>
                                    </div>
                                    <a href={route('kategori.show', k.kategori)} className="w-full px-4 py-2 text-center text-white text-gray-600 truncate rounded-md hover:text-gray-900 focus:bg-i-pink-500/60 bg-i-pink-500"
                                    >
                                        Lihat Kategori
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}