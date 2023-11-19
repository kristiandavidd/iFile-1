import { useEffect, useState } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    const [captchaNum, setCaptchaNum] = useState(0);
    const [num1, setNum1] = useState(0);
    const [num2, setNum2] = useState(0);
    const generateRandomNumber = () => {
        // const randomNum = Math.floor(Math.random() * 20);
        // const newCaptchaNum = captchaNum + randomNum;
        // setCaptchaNum(newCaptchaNum);
        const randomNum1 = Math.floor(Math.random() * 20) + 1;
        const randomNum2 = Math.floor(Math.random() * 20) + 1;
        setNum1(randomNum1);
        setNum2(randomNum2);
    };

    useEffect(() => {
        generateRandomNumber();
    }, []);

    const [captchaCheck, setCaptchaCheck] = useState('');
    const [loginError, setLoginError] = useState('');

    const handleCaptchaCheck = (e) => {
        setCaptchaCheck(e.target.value);
    };

    const checkCaptcha = (e) => {
        e.preventDefault();
        const userAnswer = parseInt(captchaCheck, 10)
        if (userAnswer === num1 + num2) {
            setLoginError('');
            post(route('login'));
        } else {
            setLoginError('Captcha salah.');
            generateRandomNumber();
        }
    };



    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && <div className="mb-4 text-sm font-medium text-green-600">{status}</div>}

            <form onSubmit={submit}>
                <div>
                    <InputLabel className='text-i-pink' htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="block w-full mt-1"
                        autoComplete="username"
                        isFocused={true}
                        placeholder='abc@gmail.com'
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel className='text-i-pink' htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="block w-full mt-1"
                        autoComplete="current-password"
                        placeholder="****"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2 text-[#ff0000]" />
                </div>
                <div className="mt-4 ">
                    <InputLabel className='text-i-pink' htmlFor="captcha" value="Captcha" />
                    <div className='flex items-center gap-4'>
                        <TextInput
                            id="captchaNum"
                            type="number"
                            disabled
                            name="num1"
                            value={num1}
                            className="block w-1/3 mt-1 text-center bg-i-light-pink"
                            autoComplete=""
                        />
                        <p>+</p>
                        <TextInput
                            id="captchaNum"
                            type="number"
                            disabled
                            name="num2"
                            value={num2}
                            className="block w-1/3 mt-1 text-center bg-i-light-pink"
                            autoComplete=""
                        />
                        <p>=</p>
                        <TextInput
                            id="captchaCheck"
                            type="number"
                            name="captchaCheck"
                            value={captchaCheck}
                            className="block w-1/3 mt-1"
                            autoComplete=""
                            onChange={handleCaptchaCheck}
                        />
                    </div>
                </div>
                <div className="mt-2 text-sm ">{loginError}</div>

                <div className="block mt-4">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        <span className="ml-2 text-sm text-gray-600">Remember me</span>
                    </label>
                </div>

                <div className="flex flex-col items-center justify-end mt-4">

                    <PrimaryButton className="w-full mb-4" disabled={processing} onClick={checkCaptcha}>
                        Log in
                    </PrimaryButton>
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="text-sm text-gray-600 hover:text-gray-900 focus:outline-none"
                        >
                            Forgot your password?
                        </Link>
                    )}
                </div>
            </form>
        </GuestLayout>
    );
}
