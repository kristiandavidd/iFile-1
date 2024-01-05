import {
    Link,
    usePage
} from '@inertiajs/react';
import React from 'react'
import { IconFile, IconHome, IconHome2, IconSearch, IconTrash, IconUserCircle, } from '@tabler/icons-react';

export function Navbar({ auth, kategori }) {
    const { url } = usePage();
    const isRouteActive = (path) => {
        return url === path;
    };


    return (
        <>
            <div className="w-1/5 min-h-screen px-2 py-12 text-sm bg-i-pink-50">
                <div className='fixed flex flex-col items-center w-1/5 h-screen overflow-y-auto scrollbar-hidden'>
                    <a className="navbar-brand" href="/">
                        <img src="/images/logomark.svg" width={100} alt='ifile' className="align-text-top d-inline-block me-0" />
                    </a>
                    <div className='flex w-full mt-10 '>
                        <ul className='flex flex-col items-center justify-center w-full gap-4 px-6'>
                            <li className='flex flex-col w-full bg-white rounded-md'>
                                <Link href={route('profile.edit')} className='flex items-center gap-2 px-4 py-2 rounded-md hover:text-i-pink-500'>
                                    <IconUserCircle size={24} strokeWidth={1.5} className='text-i-pink-500' />
                                    <p className='text-sm font-semibold'>{auth.user.username}</p>
                                </Link>
                            </li>
                            <li className={`${url === '/' ? 'text-i-pink-500 gap-2 bg-white rounded-md w-full' : 'hover:text-i-pink-500  w-full gap-2'} flex items-center px-4 py-2`}>
                                <IconHome size={20} strokeWidth={1.5} />
                                <Link href={'/'} className='w-full h-full'>Beranda</Link>
                            </li>
                            <li className={`${url === '/eksplor' ? 'text-i-pink-500 gap-2 bg-white rounded-md w-full' : 'hover:text-i-pink-500  w-full gap-2'} flex items-center px-4 py-2`}>
                                <IconSearch size={20} strokeWidth={1.5} />
                                <Link href={'/eksplor'} >File</Link>
                            </li>
                            {kategori && kategori.map((k) => (
                                <>
                                    <li className={`${decodeURIComponent(url) === `/kategori/${k.kategori}` ? 'text-i-pink-500 gap-2 bg-white rounded-md w-full' : 'hover:text-i-pink-500  w-full gap-2'} flex items-start px-4 ml-10 py-1`}>
                                        <IconFile size={20} strokeWidth={1.5} />
                                        <Link href={`/kategori/${k.kategori}`} className='w-4/5'>{k.kategori}</Link>
                                    </li>
                                </>
                            ))}
                            <li className={`${url === '/sampah' ? 'text-i-pink-500 gap-2 bg-white rounded-md w-full' : 'hover:text-i-pink-500  w-full gap-2'} flex items-center px-4 py-2`}>
                                <IconTrash size={20} strokeWidth={1.5} />
                                <Link href={'/sampah'} >Sampah</Link>
                            </li>
                            <Link method='post' href={
                                route('logout')
                            }
                                className="w-full px-4 py-2 mt-5 mb-20 text-center text-white text-gray-600 rounded-md hover:text-gray-900 bg-i-pink-500" >
                                Log Out
                            </Link>
                        </ul>
                    </div>
                </div>
            </div >
        </>
    )
}

export function NavbarAdmin({ auth }) {
    const { url } = usePage();
    return (
        <>
            <div className="" >
                <div className="flex items-center justify-between w-full px-10 py-6 text-sm">
                    <a className="navbar-brand" href="/">
                        <img src="/images/logomark.svg" width={100} alt='ifile' className="align-text-top d-inline-block me-0" />
                    </a>
                    <div className='flex'>
                        <ul className='flex flex-col items-center justify-center gap-4'>
                            <li className={url === '/admin' ? 'text-i-pink-500 bg-i-pink-50 py-2 px-4 rounded-md' : 'hover:text-i-pink-500 px-4 py-2'}><a href={'/admin'} >Beranda</a></li>
                            <li className={url === '/admin/file' ? 'text-i-pink-500 bg-i-pink-50 py-2 px-4 rounded-md' : 'hover:text-i-pink-500 px-4 py-2'}><a href={'/admin/file'} >File</a></li>
                            <li className={url === '/admin/sampah' ? 'text-i-pink-500 bg-i-pink-50 py-2 px-4 rounded-md' : 'hover:text-i-pink-500 px-4 py-2'}><a href={'/admin/sampah'}>Sampah</a></li>
                            <li className={url === '/admin/kategori' ? 'text-i-pink-500 bg-i-pink-50 py-2 px-4 rounded-md' : 'hover:text-i-pink-500 px-4 py-2'}><a href={'/admin/kategori'}>Kategori</a></li>
                            <li className={url === '/admin/pengguna' ? 'text-i-pink-500 bg-i-pink-50 py-2 px-4 rounded-md' : 'hover:text-i-pink-500 px-4 py-2'}><a href={'/admin/pengguna'}>Pengguna</a></li>
                            {
                                auth.user ? (
                                    <>

                                        <Link method='post' href={
                                            route('logout')
                                        }
                                            className="px-4 py-2 text-white text-gray-600 rounded-md hover:text-gray-900 bg-i-pink-500" >
                                            Log Out
                                        </Link>

                                        <Link href={route('profile.edit')} className='flex items-center gap-2 px-4 py-2 rounded-md bg-i-pink-50 hover:text-i-pink-500'>
                                            {auth.user.username}
                                            <IconUserCircle size={20} strokeWidth={1.2} className='text-i-pink-500' />
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Link href={
                                            route('login')
                                        }
                                            className="px-4 py-2 text-white text-gray-600 rounded-md hover:text-gray-900 bg-i-pink-500" >
                                            Log in
                                        </Link>

                                        <Link href={
                                            route('register')
                                        }
                                            className="px-4 py-2 text-gray-600 border-2 rounded-md hover:text-gray-900 focus:outline bg-i-pink-50 border-i-pink-500/40 focus:outline-2 focus:rounded-sm focus:outline-red-500">
                                            Register </Link>
                                    </>
                                )
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

const DefaultNavbar = { Navbar, NavbarAdmin };

export default DefaultNavbar;