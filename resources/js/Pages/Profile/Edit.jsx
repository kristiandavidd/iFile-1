import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';

export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <>
            <Head title="Profile" />

            <Navbar auth={auth} />

            <div className="w-4/5 py-12 m-auto md:w-1/2">
                <p className='text-2xl font-semibold'>Profil Anda</p>
                <div className="mx-auto space-y-6 ">
                    <div className="p-4 bg-white shadow sm:rounded-lg">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="p-4 bg-white shadow sm:p-8 sm:rounded-lg">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="p-4 text-white shadow bg-i-pink-500 sm:p-8 sm:rounded-lg">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </>
    );
}
