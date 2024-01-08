import { Head } from '@inertiajs/react';
import { Navbar } from '@/Components/navbar';
import { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';

export default function Home({ auth, kategori, mahasiswaData }) {
    const [isLoading, setIsLoading] = useState(true);
    const chartRefs = useRef([]);

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

        const createChart = (angkatan, chartRef) => {
            const ctx = chartRef.getContext('2d');

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
                    layout: {
                        padding: {
                            left: 10,
                            right: 10,
                            top: 10,
                            bottom: 10,
                        },
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                    plugins: {
                        legend: {
                            display: false,
                        },
                    },
                },
            });
        };

        const uniqueAngkatan = [...new Set(mahasiswaData.map(mahasiswa => mahasiswa.angkatan))];
        uniqueAngkatan.sort((a, b) => a - b);

        uniqueAngkatan.forEach(angkatan => {
            const chartRef = document.createElement('canvas');
            chartRef.width = 400;
            chartRef.height = 200;

            chartRefs.current.push({ angkatan, chartRef });
        });

        chartRefs.current.forEach(({ angkatan, chartRef }) => {
            createChart(angkatan, chartRef);
        });

        setIsLoading(false);

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
                    <div className='grid grid-cols-2 w-full gap-4'>
                        {chartRefs.current.map(({ angkatan, chartRef }, index) => (
                            <div key={index} className="my-4 flex flex-col">
                                <p className="text-center font-semibold mb-2">Angkatan {angkatan}</p>
                                <canvas ref={(ref) => ref && ref.replaceWith(chartRef)} className='w-fit h-fit' />
                                <a href={route('detail-angkatan', { angkatan: angkatan })} className='py-2 px-5 m-auto bg-i-pink-500 rounded-md text-white'>Detail Mahasiswa {angkatan}</a>
                            </div>

                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
