import { Head } from "@inertiajs/react"
import Navbar from "@/Components/navbar"
import LinkCard from "@/Components/LinkCard"
import { IconRotateClockwise } from '@tabler/icons-react';
import SearchLink from "@/Components/SearchLink";

export default function Sampah({ auth, files }) {
    const icons = [
        {
            component: <IconRotateClockwise size={20} />,
            action: () => {
                console.log('Edit clicked');
            },
            color: 'i-yellow-500',
        },
    ];
    return (
        <>
            <Head title="Sampah"></Head>
            <Navbar auth={auth} />
            <div className="px-10">
                <SearchLink />
                <div className='grid grid-flow-row grid-cols-1 gap-4 py-4 sm:grid-cols-2 lg:grid-cols-3'>
                    {files && files.map((file) => (
                        <LinkCard key={file.id} icons={icons} file={file} />
                    ))}
                </div>
            </div>
        </>
    )
}