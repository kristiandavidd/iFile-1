import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput({ type = 'text', className = '', isFocused = false, ...props }, ref, placeholder) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <input
            {...props}
            type={type}
            className={
                'border-i-pink-500 focus:border-i-pink-500 focus:ring-i-pink-500 rounded-md shadow-sm' +
                className
            }
            ref={input}
        // placeholder={placeholder}
        />
    );
});
