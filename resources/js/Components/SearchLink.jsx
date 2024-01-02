import React from 'react'
import TextInput from '@/Components/TextInput';
import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';

export default function SearchLink({ onChange, value }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    return (
        <input
            type="text"
            placeholder="Cari file di sini..."
            value={value}
            onChange={onChange}
            className="block w-[250px] mt-1 rounded-md border-i-pink-500 h-fit"
        />
    );
}