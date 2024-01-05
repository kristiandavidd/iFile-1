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
import { IconUpload } from '@tabler/icons-react';
import KategoriDropdown from '@/Components/KategoriDropdown.';

export default function Addfile({ auth, kategori }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        namaFile: '',
        deskripsi: '',
        kategori: '',
        file: null,
        jenisFile: '',
        link: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if ((!data.namaFile || !data.deskripsi || !data.kategori) && (!data.file || !data.link)) {
            alert('Semua kolom harus diisi');
            return;
        }

        const formData = new FormData();
        formData.append('namaFile', data.namaFile);
        formData.append('deskripsi', data.deskripsi);
        formData.append('kategori', data.kategori);
        formData.append('file', data.file);
        console.log(data.kategori);

        post(route('tambah-file.store'), formData);
    };

    return <>
        <Head title="Tambah File"></Head>
        <div className='flex w-full'>
            {auth && auth.user && auth.user.role === 'admin' ? (
                <NavbarAdmin auth={auth} kategori={kategori} />
            ) : (
                <Navbar auth={auth} kategori={kategori} />
            )}
            <div className='w-4/5 p-10'>
                <div className="w-1/2 p-4 m-auto rounded-md shadow-md shadow-i-pink-500/20">
                    <p className='text-lg font-bold text-center text-i-pink-500'>Tambah File</p>
                    <form action="" method='post' className='flex flex-col justify-center'>
                        <div>
                            <InputLabel className='text-i-pink-500' htmlFor="namaFile" value="Nama File" />

                            <TextInput
                                id="namaFile"
                                type="text"
                                name="namaFile"
                                value={data.namaFile}
                                className="block w-full mt-1"
                                autoComplete="current-namaFile"
                                isFocused={true}
                                placeholder='Nama File'
                                onChange={(e) => setData('namaFile', e.target.value)}
                            />

                            <InputError message={errors.namaFile} className="mt-2 text-[#ff0000]" />
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


                        <div className="mt-4">
                            <InputLabel className='text-i-pink-500' htmlFor="jenisFile" value="Jenis File" />
                            <div className="mt-2">
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        name="jenisFile"
                                        value="upload"
                                        checked={data.jenisFile === 'upload'}
                                        onChange={() => setData('jenisFile', 'upload')}
                                        className="form-radio text-i-pink-500"
                                    />
                                    <span className="ml-2">Upload File</span>
                                </label>
                                <label className="inline-flex items-center ml-6">
                                    <input
                                        type="radio"
                                        name="jenisFile"
                                        value="link"
                                        checked={data.jenisFile === 'link'}
                                        onChange={() => setData('jenisFile', 'link')}
                                        className="form-radio text-i-pink-500"
                                    />
                                    <span className="ml-2">Link</span>
                                </label>
                            </div>
                        </div>
                        {data.jenisFile === 'link' && (
                            <div className="mt-4">
                                <InputLabel className='text-i-pink-500' htmlFor="link" value="Link" />
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
                            <button type="submit" className="flex items-center gap-2 py-2 text-white text-gray-600 rounded-md px-7 h-fit hover:text-gray-900 focus:bg-i-pink-500/60 bg-i-pink-500"
                                onClick={handleSubmit}>
                                <IconUpload size={16} />
                                Unggah File
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
}