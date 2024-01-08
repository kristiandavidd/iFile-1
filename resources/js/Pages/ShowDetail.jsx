import { Head, useForm } from "@inertiajs/react"
import { Navbar, NavbarAdmin } from "@/Components/navbar"
import { useState, useEffect } from "react";

export default function ShowDetail({ auth, kategori, mahasiswa, angkatan }) {
    const { post } = useForm();
    const [selectedStatus, setSelectedStatus] = useState({});

    useEffect(() => {
        if (mahasiswa) {
            const initialStatusValues = {};
            mahasiswa.forEach((m) => {
                initialStatusValues[m.nim] = m.status || '';
            });
            setSelectedStatus(initialStatusValues);
        }
    }, [mahasiswa]);

    const handleStatusChange = async (nim, updatedStatus) => {
        try {
            return post(route('update-status', { nim: nim, status: updatedStatus }));
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    return (
        <>
            <Head title={`Detail Mahasiswa ${angkatan}`}></Head>
            <div className="flex w-full">
                {auth && auth.user && auth.user.role === 'admin' ? (
                    <NavbarAdmin auth={auth} kategori={kategori} />
                ) : (
                    <Navbar auth={auth} kategori={kategori} />
                )}

                <div className="w-4/5 p-10 flex flex-col">
                    <p className="font-semibold text-lg mb-3">Detail mahasiswa {angkatan}</p>
                    <table>
                        <thead>
                            <tr className="bg-i-pink-100 ">
                                <th className="p-2 font-semibold">NIM</th>
                                <th className="font-semibold">Nama</th>
                                <th className="font-semibold">Jenis Kelamin</th>
                                <th className="font-semibold">Agama</th>
                                <th className="font-semibold">Jalur Masuk</th>
                                <th className="p-2 font-semibold">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mahasiswa && mahasiswa.map((m, index) => (
                                <tr key={index} className={`text-center ${index % 2 === 0 ? 'bg-i-pink-50' : 'bg-white'}`}>
                                    <td className="py-3 pl-2">{m.nim}</td>
                                    <td>{m.nama}</td>
                                    <td>{m.jenis_kelamin}</td>
                                    <td>{m.agama}</td>
                                    <td>{m.jalur_masuk}</td>
                                    <td className="pr-2 py-3">
                                        <select
                                            value={selectedStatus[m.nim] || ''}
                                            onChange={(event) => {
                                                handleStatusChange(m.nim, event.target.value);
                                            }}
                                            onBlur={(event) => handleStatusChange(m.nim, event.target.value)}
                                            className={`rounded-md border-i-pink-500 ${index % 2 === 0 ? 'bg-i-pink-50' : 'bg-white'}`}
                                        >
                                            <option value="" disabled>Pilih Status</option>
                                            <option value="Aktif">Aktif</option>
                                            <option value="Tidak Aktif">Tidak Aktif</option>
                                            <option value="Lulus">Lulus</option>
                                            <option value="Cuti">Cuti</option>
                                        </select>

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
