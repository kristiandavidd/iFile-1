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

export default function Addfile({ auth, kategori }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        namaFile: '',
        deskripsi: '',
        kategori: '',
        file: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!data.namaFile || !data.deskripsi || !data.kategori || !data.file) {
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
        <Navbar auth={auth} />
        <div className="px-10">
            <div className="m-auto w-1/2 p-4 rounded-md shadow-i-pink-500/20 shadow-md">
                <p className='font-bold text-center text-i-pink-500 text-lg'>Tambah File</p>
                <form action="" method='post'>
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
                    <div class="mt-4">
                        <button type="submit" class="px-4 py-2 h-fit text-white text-gray-600 rounded-md hover:text-gray-900 focus:bg-i-pink-500/60 bg-i-pink-500"
                            onClick={handleSubmit}>
                            +Tambah File
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </>
}