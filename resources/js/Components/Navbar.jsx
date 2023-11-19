import {
    Link,
} from '@inertiajs/react';
import React from 'react'

export default function Navbar({ auth }) {
    return (
        <>
            <div className="" >
                <div className="flex items-center justify-between w-full px-10 py-6 text-sm"><>
                    <a className="navbar-brand" href="/">
                        <img src="/images/logomark.svg" width={100} alt='ifile' className="align-text-top d-inline-block me-0" />
                    </a>
                    <div className='flex'>
                        <ul className='flex items-center justify-center gap-7'>
                            <li>Eksplor</li>
                            <li>File Saya</li>
                            <li><a href="/sampah">Sampah</a></li>
                            {
                                auth.user ? (
                                    <Link method='post' href={
                                        route('logout')
                                    }
                                        className="px-4 py-2 text-white text-gray-600 rounded-md hover:text-gray-900 focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500 bg-i-pink" >
                                        Log Out
                                    </Link>
                                ) : (
                                    <>
                                        <Link href={
                                            route('login')
                                        }
                                            className="px-4 py-2 text-white text-gray-600 rounded-md hover:text-gray-900 focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500 bg-i-pink" >
                                            Log in
                                        </Link>

                                        <Link href={
                                            route('register')
                                        }
                                            className="px-4 py-2 text-gray-600 border-2 rounded-md hover:text-gray-900 focus:outline bg-i-light-pink border-i-pink/40 focus:outline-2 focus:rounded-sm focus:outline-red-500">
                                            Register </Link>
                                    </>
                                )
                            }
                        </ul>
                    </div>
                </>
                </div>
            </div>
        </>
    )
}
