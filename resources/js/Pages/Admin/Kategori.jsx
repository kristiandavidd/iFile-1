import {
    Head,
} from '@inertiajs/react';
import SearchLink from '@/Components/SearchLink';
import { NavbarAdmin } from '@/Components/navbar'
import LinkCard from '@/Components/LinkCard';
import { IconCopy, IconPencil, IconTrash } from '@tabler/icons-react';
import { Link } from '@inertiajs/react';
import React, { useRef } from 'react';
import Swal from 'sweetalert2';


export default function Kategori({ auth, kategori }) {
    const contentRef = useRef(null);

    const handleCopyClick = () => {
        const range = document.createRange();
        range.selectNode(contentRef.current);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        document.execCommand('copy');
        window.getSelection().removeAllRanges();
    };

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

    return (
        <>
            <Head title="Kategori" />
            <NavbarAdmin auth={auth} />
            <div className='px-10'>
                <div className='flex items-center justify-between'>
                    <SearchLink />
                    <Link href={route('tambah-kategori')} className='px-4 py-2 text-white text-gray-600 rounded-md h-fit hover:text-gray-900 focus:bg-i-pink-500/60 bg-i-pink-500'>
                        +Tambah Kategori
                    </Link>
                </div>
                <div className='grid grid-flow-row grid-cols-1 gap-4 py-4 sm:grid-cols-2 lg:grid-cols-3'>
                    {kategori && kategori.map((k) => (
                        <div className='w-full p-4 rounded-md shadow-md shadow-i-pink-500/20'>
                            <div className='flex items-center gap-4 mb-4'>
                                <div>
                                    <div className='bg-i-pink-100 w-[70px] h-[70px] rounded-full m-auto'>
                                    </div>
                                </div>
                                <div>
                                    <p className='mb-1 font-semibold text-md'>{k.kategori}</p>
                                    <p className='text-sm'>{k.keterangan}</p>
                                </div>
                            </div>
                            <div className='flex w-full gap-4 '>
                                <a href={route('edit-kategori', { id: k.id })} className='flex justify-center w-full gap-2 p-2 text-white rounded-md bg-i-yellow-500'>
                                    <IconPencil size={20} />
                                    Edit
                                </a>
                                <a onClick={() => handleDeleteKategori(k.id)} className='flex justify-center w-full gap-2 p-2 text-white rounded-md cursor-pointer bg-i-orange-500'>
                                    <IconTrash size={20} />
                                    Delete
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

            </div>

        </>
    )
}