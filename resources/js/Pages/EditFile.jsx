import {
    Head,
    useForm
} from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { Navbar, NavbarAdmin } from '@/Components/navbar'
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import Dropdown from '@/Components/Dropdown';
import { IconEdit, IconPencil, IconUpload } from '@tabler/icons-react';

export default function EditFile({ auth, file, kategori }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        nama_file: file.nama_file,
        deskripsi: file.deskripsi,
        kategori: file.kategori,
        file: '',
        jenisFile: file.jenis_file,
        link: file.url,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if ((!data.nama_file || !data.deskripsi || !data.kategori) && (!data.file || !data.link)) {
            alert('Semua kolom harus diisi');
            return;
        }

        const formData = new FormData();
        formData.append('nama_file', data.nama_file);
        formData.append('deskripsi', data.deskripsi);
        formData.append('kategori', data.kategori);
        formData.append('file', data.file);
        formData.append('link', data.link)

        post(route('edit-file.update', { id: file.id }), formData);
    };

    return <>
        <Head title="Edit File"></Head>

        {auth && auth.user && auth.user.role === 'admin' ? (
            <NavbarAdmin auth={auth} />
        ) : (
            <Navbar auth={auth} />
        )}
        <div className="px-10">
            <div className="w-1/2 p-4 m-auto rounded-md shadow-md shadow-i-pink-500/20">
                <p className='text-lg font-bold text-center text-i-pink-500'>Edit File</p>
                <form action="" method='post' className='flex flex-col justify-center'>
                    <div>
                        <InputLabel className='text-i-pink-500' htmlFor="nama_file" value="Nama File" />

                        <TextInput
                            id="nama_file"
                            type="text"
                            name="nama_file"
                            value={data.nama_file}
                            className="block w-full mt-1"
                            autoComplete="current-nama_file"
                            isFocused={true}
                            placeholder='Nama File'
                            onChange={(e) => setData('nama_file', e.target.value)}
                        />

                        <InputError message={errors.nama_file} className="mt-2 text-[#ff0000]" />
                    </div>

                    <div className="mt-4">
                        <InputLabel className='text-i-pink-500' htmlFor="deskripsi" value="Deskripsi" />

                        <TextInput
                            id="deskripsi"
                            type="text"
                            name="deskripsi"
                            value={data.deskripsi}
                            className="block w-full mt-1"
                            autoComplete="current-deskripsi"
                            placeholder="Deskripsi file"
                            onChange={(e) => setData('deskripsi', e.target.value)}
                        />

                        <InputError message={errors.deskripsi} className="mt-2 text-[#ff0000]" />

                    </div>
                    <div className="mt-4">
                        <InputLabel className='text-i-pink-500' htmlFor="kategori" value="Kategori" />
                        <select
                            name="kategori"
                            id="kategori"
                            className='block w-full mt-1 rounded-md border-i-pink-500'
                            value={data.kategori}
                            onChange={(e) => setData('kategori', e.target.value)}
                        >
                            <option value="">Pilih Kategori</option>
                            {kategori && kategori.map((k) => (
                                <option key={k.id} value={k.id}>{k.kategori}</option>
                            ))}
                        </select>
                    </div>
                    {data.jenisFile === 'link' && (
                        <div className="mt-4">
                            <InputLabel className='text-i-pink-500' htmlFor="link" value="link" />
                            <input
                                type="text"
                                name="link"
                                id="link"
                                placeholder='Masukkan link di sini'
                                value={data.link}
                                onChange={(e) => setData('link', e.target.value)}
                                className='w-full mt-1 border-i-pink-500'
                            />
                        </div>
                    )}
                    {data.jenisFile === 'upload' && (
                        <div className="mt-4">
                            <InputLabel className='text-i-pink-500' htmlFor="file" value="Pilih File" />
                            <input
                                type="file"
                                name="file"
                                id="file"
                                onChange={(e) => setData('file', e.target.files[0])}
                                className='w-full mt-1 border-i-pink-500'
                            />
                            <InputError message={errors.file} className="mt-2 text-[#ff0000]" />
                        </div>
                    )}
                    <div className="self-center mt-4">
                        <button type="submit" className="flex py-2 text-white text-gray-600 rounded-md px-7 h-fit hover:text-gray-900 focus:bg-i-pink-500/60 bg-i-pink-500"
                            onClick={handleSubmit}>
                            <IconPencil size={20} />
                            Edit File
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </>
}