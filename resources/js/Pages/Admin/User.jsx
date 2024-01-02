import {
    Head,
    Link
} from '@inertiajs/react';
import SearchLink from '@/Components/SearchLink';
import { NavbarAdmin } from '@/Components/navbar'
import LinkCard from '@/Components/LinkCard';
import { IconCopy, IconTrash, IconPencil } from '@tabler/icons-react';
import React, { useRef, useState, useEffect } from 'react'
import Swal from 'sweetalert2';

export default function User({ auth, users }) {
    const contentRef = useRef(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredUsers, setFilteredUser] = useState(users);

    const handleDeleteUser = (id) => {
        Swal.fire({
            title: 'Konfirmasi Penghapusan User',
            text: 'Anda yakin ingin menghapus permanen pengguna ini?',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#F8B9CF',
            confirmButtonColor: '#E91E63',
            confirmButtonText: 'Hapus',
            cancelButtonText: '<span style="color: #E91E63;">cancel</span>',
            reverseButtons: true,
            customClass: {
                confirmButton: 'custom-confirm-button-class',
            }
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = route('delete-user', { id: id });
            }
        });
    };

    const searchFilter = () => {
        if (searchQuery.trim() === '') {
            setFilteredUser(users);
        } else {
            const filtered = Object.values(users).filter((user) => {
                return ['username', 'role'].some((field) => {
                    const fieldValue = user[field];
                    return fieldValue && fieldValue.toLowerCase().includes(searchQuery.toLowerCase());
                });
            });
            setFilteredUser(filtered);
        }
    };

    useEffect(() => {
        searchFilter();
    }, [searchQuery, users]);

    return (
        <>
            <Head title="Pengguna" />
            <NavbarAdmin auth={auth} />
            <div className='px-10'>
                <div className='flex items-center justify-between'>
                    <SearchLink
                        onChange={(e) => setSearchQuery(e.target.value)}
                        value={searchQuery}
                    />
                    <Link href={route('tambah-user')} className='px-4 py-2 text-white text-gray-600 rounded-md h-fit hover:text-gray-900 focus:bg-i-pink-500/60 bg-i-pink-500'>
                        +Tambah User
                    </Link>
                </div>
                <div className='grid grid-flow-row grid-cols-1 gap-4 py-4 sm:grid-cols-2 lg:grid-cols-3'>
                    {Object.entries(filteredUsers).map(([userId, user]) => (
                        <div className='flex p-4 rounded-md shadow-md shadow-i-pink-500/20'>
                            <div className='w-2/3'>
                                <p className='font-semibold truncate'>{user.username}</p>
                                <p>{user.role}</p>
                            </div>
                            <div className='flex items-center w-1/3 gap-4'>
                                <a className='flex justify-center w-full gap-2 p-2 text-white rounded-md bg-i-yellow-500'
                                    href={route('edit-user', { id: user.id })} >
                                    <IconPencil size={20} />
                                </a>
                                <a className='flex justify-center w-full gap-2 p-2 text-white rounded-md cursor-pointer bg-i-orange-500'
                                    onClick={() => handleDeleteUser(user.id)}>
                                    <IconTrash size={20} />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </>
    )
}