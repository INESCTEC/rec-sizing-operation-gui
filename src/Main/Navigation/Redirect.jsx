import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Redirect = () => {
    const navigateTo = useNavigate();

    useEffect(() => {
        navigateTo('/dashboard/meters');
    });

    return null;
};