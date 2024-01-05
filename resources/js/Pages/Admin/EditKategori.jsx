import {
    Head,
    useForm
} from '@inertiajs/react';
import { NavbarAdmin } from "@/Components/Navbar";
import { IconPencil } from "@tabler/icons-react";
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';

export default function EditKategori({ auth, kategori, allKategori }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        kategori: kategori.kategori,
        keterangan: kategori.keterangan,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if ((!data.kategori || !data.keterangan)) {
            alert('Semua kolom harus diisi');
            return;
        }

        const formData = new FormData();
        formData.append('kategori', data.kategori);
        formData.append('keterangan', data.keterangan);

        post(route('edit-kategori.update', { id: kategori.id }), formData);
    }

    return (
        <>
            <Head title="Edit Kategori"></Head>
            <div className='flex w-full'>
                <NavbarAdmin auth={auth} kategori={allKategori} />
                <div className="w-4/5 p-10">
                    <div className="w-1/2 p-4 m-auto rounded-md shadow-md shadow-i-pink-500/20">
                        <p className='text-lg font-bold text-center text-i-pink-500'>Tambah Kategori</p>
                        <form action="" method='post' className='flex flex-col justify-center'>
                            <div>
                                <InputLabel className='text-i-pink-500' htmlFor="kategori" value="Nama Kategori" />

                                <TextInput
                                    id="kategori"
                                    type="text"
                                    name="kategori"
                                    value={data.kategori}
                                    className="block w-full mt-1"
                                    autoComplete="current-kategori"
                                    isfocused={true}
                                    placeholder='Nama kategori'
                                    onChange={(e) => setData('kategori', e.target.value)}
                                />

                                <InputError message={errors.kategori} className="mt-2 text-[#ff0000]" />
                            </div>

                            <div className="mt-4">
                                <InputLabel className='text-i-pink-500' htmlFor="keterangan" value="Keterangan" />

                                <TextInput
                                    id="keterangan"
                                    type="text"
                                    name="keterangan"
                                    value={data.keterangan}
                                    className="block w-full mt-1"
                                    autoComplete="current-keterangan"
                                    placeholder='Keterangan'
                                    onChange={(e) => setData('keterangan', e.target.value)}
                                />

                                <InputError message={errors.keterangan} className="mt-2 text-[#ff0000]" />
                            </div>
                            <div className="self-center mt-4">
                                <button type="submit" className="flex items-center gap-2 py-2 text-white text-gray-600 rounded-md px-7 h-fit hover:text-gray-900 focus:bg-i-pink-500/60 bg-i-pink-500"
                                    onClick={handleSubmit}>
                                    <IconPencil size={20} />
                                    Edit Kategori
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}