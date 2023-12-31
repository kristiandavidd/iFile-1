import {
    Head,
    useForm
} from '@inertiajs/react';
import { useEffect, useState } from 'react';
import Navbar from '@/Components/navbar'
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
        <Navbar auth={auth} />
        <div className="px-10">
            <div className="m-auto w-1/2 p-4 rounded-md shadow-i-pink-500/20 shadow-md">
                <p className='font-bold text-center text-i-pink-500 text-lg'>Edit File</p>
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
                            className='w-full rounded-md block mt-1 border-i-pink-500'
                            value={data.kategori}
                            onChange={(e) => setData('kategori', e.target.value)}
                        >
                            <option value="">Pilih Kategori</option>
                            {kategori && kategori.map((k) => (
                                <option key={k.id} value={k.id}>{k.kategori}</option>
                            ))}
                        </select>
                    </div>


                    {/* <div className="mt-4">
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
                    </div> */}
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
                    <div className="mt-4 self-center">
                        <button type="submit" className="px-7 py-2 h-fit text-white text-gray-600 rounded-md hover:text-gray-900 focus:bg-i-pink-500/60 bg-i-pink-500 flex"
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