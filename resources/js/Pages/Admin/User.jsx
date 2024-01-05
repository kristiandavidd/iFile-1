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

export default function User({ auth, users, kategori }) {
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
            <div className='flex w-full'>
                <NavbarAdmin auth={auth} kategori={kategori} />
                <div className='w-4/5 p-10'>
                    <div className='flex items-center justify-between'>
                        <SearchLink
                            onChange={(e) => setSearchQuery(e.target.value)}
                            value={searchQuery}
                        />
                        <Link href={route('tambah-user')} className='px-4 py-2 text-white text-gray-600 rounded-md h-fit hover:text-gray-900 focus:bg-i-pink-500/60 bg-i-pink-500'>
                            +Tambah User
                        </Link>
                    </div>
                    <table className='w-full my-3 text-sm rounded-md table-auto text-wrap border-spacing-y-2'>
                        <thead className=''>
                            <tr className='border-b-[1.5px] border-i-pink-500 bg-i-pink-100'>
                                <th className='py-3 font-semibold'>Username</th>
                                <th className='font-semibold'>Peran</th>
                                <th className='font-semibold'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(filteredUsers).map(([userId, user]) => (
                                <tr >
                                    <td className='px-4 border-b-[1.5px] border-i-pink-500 font-semibold'>{user.username}</td>
                                    <td className='text-center border-b-[1.5px] border-i-pink-500'>{user.role}</td>
                                    <td className='flex justify-center border-b-[1.5px] border-i-pink-500 py-2'>
                                        <div className='flex items-center justify-center w-1/3 gap-4'>
                                            <a className='flex justify-center w-full gap-2 p-2 text-white rounded-md bg-i-yellow-500'
                                                href={route('edit-user', { id: user.id })} >
                                                <IconPencil size={20} />
                                            </a>
                                            <a className='flex justify-center w-full gap-2 p-2 text-white rounded-md cursor-pointer bg-i-orange-500'
                                                onClick={() => handleDeleteUser(user.id)}>
                                                <IconTrash size={20} />
                                            </a>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}