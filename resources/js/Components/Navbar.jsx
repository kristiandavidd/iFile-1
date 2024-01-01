import {
    Link,
    usePage
} from '@inertiajs/react';
import React from 'react'
import { IconUserCircle, } from '@tabler/icons-react';

export function Navbar({ auth }) {
    const { url } = usePage();
    const isRouteActive = (path) => {
        return url === path;
    };
    return (
        <>
            <div className="" >
                <div className="flex items-center justify-between w-full px-10 py-6 text-sm">
                    <a className="navbar-brand" href="/">
                        <img src="/images/logomark.svg" width={100} alt='ifile' className="align-text-top d-inline-block me-0" />
                    </a>
                    <div className='flex'>
                        <ul className='flex items-center justify-center gap-4'>
                            <li className={url === '/' ? 'text-i-pink-500 bg-i-pink-50 py-2 px-4 rounded-md' : 'hover:text-i-pink-500 px-4 py-2'}><a href={'/'} >Beranda</a></li>
                            <li className={url === '/eksplor' ? 'text-i-pink-500 bg-i-pink-50 py-2 px-4 rounded-md' : 'hover:text-i-pink-500 px-4 py-2'}><a href={'/eksplor'} >Eksplor</a></li>
                            <li className={url === '/file-saya' ? 'text-i-pink-500 bg-i-pink-50 py-2 px-4 rounded-md' : 'hover:text-i-pink-500 px-4 py-2'}><a href={'file-saya'} >File Saya</a></li>
                            <li className={url === '/sampah' ? 'text-i-pink-500 bg-i-pink-50 py-2 px-4 rounded-md' : 'hover:text-i-pink-500 px-4 py-2'}><a href={'sampah'}>Sampah</a></li>
                            {
                                auth.user ? (
                                    <>

                                        <Link method='post' href={
                                            route('logout')
                                        }
                                            className="px-4 py-2 text-white text-gray-600 rounded-md hover:text-gray-900 focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500 bg-i-pink-500" >
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
                                            className="px-4 py-2 text-white text-gray-600 rounded-md hover:text-gray-900 focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500 bg-i-pink-500" >
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
                        <ul className='flex items-center justify-center gap-4'>
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
                                            className="px-4 py-2 text-white text-gray-600 rounded-md hover:text-gray-900 focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500 bg-i-pink-500" >
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
                                            className="px-4 py-2 text-white text-gray-600 rounded-md hover:text-gray-900 focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500 bg-i-pink-500" >
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