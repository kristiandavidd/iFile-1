import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';
import { NavbarAdmin } from '@/Components/Navbar';

export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <>
            <Head title="Profil" />

            {auth && auth.user && auth.user.role === 'admin' ? (
                <NavbarAdmin auth={auth} />
            ) : (
                <Navbar auth={auth} />
            )}

            <div className="w-4/5 py-12 m-auto md:w-1/2">
                <p className='text-2xl font-semibold'>Profil Anda</p>
                <div className="mx-auto space-y-6 ">
                    <div className="p-8 bg-white rounded-md shadow-md shadow-i-pink-500/20">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="p-8 bg-white rounded-md shadow-md shadow-i-pink-500/20">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </>
    );
}
