import React from 'react'
import { Head } from '@inertiajs/react'
import Navbar from '@/Components/navbar'

export default function MyFile({ auth }) {
    return (
        <>
            <Head title='File Saya'></Head>
            <Navbar auth={auth} />
        </>

    )
}
