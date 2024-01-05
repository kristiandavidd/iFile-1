import {
    Head,
} from '@inertiajs/react';
import SearchLink from '@/Components/SearchLink';
import { NavbarAdmin } from '@/Components/navbar'
import LinkCard from '@/Components/LinkCard';
import { IconCopy, IconPencil, IconTrash } from '@tabler/icons-react';
import { Link } from '@inertiajs/react';
import React, { useRef, useState, useEffect } from 'react'
import Swal from 'sweetalert2';


export default function Kategori({ auth, kategori }) {
    const contentRef = useRef(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterdedKategori, setfilterdedKategori] = useState(kategori);

    const handleDeleteKategori = (id) => {
        Swal.fire({
            title: 'Konfirmasi Hapus Permanen Kategori',
            text: 'Anda yakin ingin menghapus permanen kategori ini?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#F8B9CF',
            cancelButtonColor: '#E91E63',
            confirmButtonText: '<span style="color: #E91E63;">Hapus</span>',
            reverseButtons: true,
            customClass: {
                confirmButton: 'custom-confirm-button-class',
            }
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = route('delete-kategori', { id: id });
            }
        });
    }

    const searchFilter = () => {
        if (searchQuery.trim() === '') {
            setfilterdedKategori(kategori);
        } else {
            const filtered = kategori.filter((k) =>
                ['kategori', 'keterangan'].some((field) =>
                    k[field].toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
            setfilterdedKategori(filtered);
        }
    };

    useEffect(() => {
        searchFilter();
    }, [searchQuery, kategori]);

    const truncateString = (url, maxLength = 64) => {
        if (url.length > maxLength) {
            return `${url.slice(0, maxLength)}...`;
        }
        return url;
    };

    return (
        <>
            <Head title="Kategori" />
            <div className='flex w-full'>
                <NavbarAdmin auth={auth} kategori={kategori} />
                <div className='w-4/5 p-10'>
                    <div className='flex items-center justify-between'>
                        <SearchLink
                            onChange={(e) => setSearchQuery(e.target.value)}
                            value={searchQuery}
                        />
                        <Link href={route('tambah-kategori')} className='px-4 py-2 text-white text-gray-600 rounded-md h-fit hover:text-gray-900 focus:bg-i-pink-500/60 bg-i-pink-500'>
                            +Tambah Kategori
                        </Link>
                    </div>
                    <table className='w-full my-3 text-sm rounded-md table-auto text-wrap border-spacing-y-2'>
                        <thead className=''>
                            <tr className='border-b-[1.5px] border-i-pink-500 bg-i-pink-100'>
                                <th className='py-3 font-semibold'>Kategori</th>
                                <th className='font-semibold'>Keterangan</th>
                                <th className='font-semibold'>Action</th>
                            </tr>
                        </thead>
                        {filterdedKategori && filterdedKategori.map((k) => (
                            <tbody>
                                <tr>
                                    <td className='px-4 py-4 border-b-[1.5px] border-i-pink-500 font-semibold'>{k.kategori}</td>
                                    <td className='border-b-[1.5px] border-i-pink-500'>{truncateString(k.keterangan)}</td>
                                    <td className='border-b-[1.5px] border-i-pink-500'>
                                        <div className='flex w-full gap-4 px-4 '>
                                            <a href={route('edit-kategori', { id: k.id })} className='flex items-center justify-center w-full gap-2 p-2 text-white rounded-md bg-i-yellow-500'>
                                                <IconPencil size={16} />
                                            </a>
                                            <a onClick={() => handleDeleteKategori(k.id)} className='flex items-center justify-center w-full gap-2 p-2 text-white rounded-md cursor-pointer bg-i-orange-500'>
                                                <IconTrash size={16} />
                                            </a>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        ))}
                    </table>
                </div>
            </div>
        </>
    )
}