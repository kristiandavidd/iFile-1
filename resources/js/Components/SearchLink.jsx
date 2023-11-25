import React from 'react'
import TextInput from '@/Components/TextInput';
import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';

export default function SearchLink() {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    return (
        <>
            <div className='w-full px-10 py-5'>

                <form action="" className='flex gap-4'>
                    <TextInput
                        id="search"
                        type="search"
                        name="search"
                        className="block w-1/4 rounded-md border-i-pink-300 outline-i-pink-500 focus:ring-i-pink-500 focus:border-i-pink-500 sm:text-sm"
                        autoComplete="current-password"
                        placeholder='Cari Link'
                    />
                    <button type='submit' className='px-4 py-2 text-white text-gray-600 rounded-md hover:text-gray-900 focus:bg-i-pink-500/60 bg-i-pink-500'>
                        Cari
                    </button>
                    <select name="kategori" id="kategori" className='rounded-md border-i-pink-300 fill-i-pink-500 focus:ring-i-pink-500 focus:border-i-pink-500'>
                        <option value="kategori">kategori</option>
                        <option value="kategori">Pengajaran</option>
                        <option value="kategori">Penelitian</option>
                        <option value="kategori">Pengabdian Masyarakat</option>
                    </select>

                </form>

            </div>
        </>

    )
}