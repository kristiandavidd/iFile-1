import { Head } from '@inertiajs/react';
import { Navbar } from '@/Components/navbar';
import { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';

export default function Home({ auth, kategori, mahasiswaData }) {
    const chartRef2021 = useRef(null);
    const chartRef2022 = useRef(null);
    const chartRef2023 = useRef(null);

    useEffect(() => {
        const generateChartData = (angkatan) => {
            const filteredData = mahasiswaData.filter(mahasiswa => mahasiswa.angkatan === angkatan);
            const statusCounts = {
                Aktif: 0,
                Lulus: 0,
                'Tidak Aktif': 0,
                Cuti: 0,
            };

            filteredData.forEach(mahasiswa => {
                statusCounts[mahasiswa.status]++;
            });

            return Object.values(statusCounts);
        };

        const createChart = (chartRef, angkatan) => {
            const ctx = chartRef.current.getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Aktif', 'Lulus', 'Tidak Aktif', 'Cuti'],
                    datasets: [{
                        label: `Angkatan ${angkatan}`,
                        data: generateChartData(angkatan),
                        backgroundColor: [
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(255, 205, 86, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                        ],
                        borderColor: [
                            'rgba(75, 192, 192, 1)',
                            'rgba(255, 99, 132, 1)',
                            'rgba(255, 205, 86, 1)',
                            'rgba(54, 162, 235, 1)',
                        ],
                        borderWidth: 1,
                    }],
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            });
        };

        if (chartRef2021.current) {
            createChart(chartRef2021, 2021);
        }

        if (chartRef2022.current) {
            createChart(chartRef2022, 2022);
        }

        if (chartRef2023.current) {
            createChart(chartRef2023, 2023);
        }
    }, [mahasiswaData]);

    return (
        <>
            <Head title="Home" />
            <div className='flex w-full'>
                <Navbar auth={auth} kategori={kategori} />
                <div className='w-4/5 p-10'>
                    <div className='w-3/5 m-auto'>
                        <p className="text-4xl font-semibold text-center">Selamat Datang di iFile</p>
                        <p className='my-2 text-center'>
                            Sistem Informasi ini akan membantu anda terkait pengelolaan file di lingkungan Departemen
                            Informatika Universitas Diponegoro.
                        </p>
                    </div>
                    <div className='grid grid-cols-2 w-full'>

                        <div className="my-4">
                            <canvas ref={chartRef2021} width="400" height="200"></canvas>
                        </div>
                        <div className="my-4">
                            <canvas ref={chartRef2022} width="400" height="200"></canvas>
                        </div>
                        <div className="my-4">
                            <canvas ref={chartRef2023} width="400" height="200"></canvas>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}
