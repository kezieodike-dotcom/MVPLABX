import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
    adminOnly?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ adminOnly = false }) => {
    const { user, isAdmin, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
                <Loader2 className="w-12 h-12 text-purple-500 animate-spin mb-4" />
                <p className="font-bold Outfit tracking-widest text-xs uppercase opacity-50">Checking Clearance...</p>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (adminOnly && !isAdmin) {
        console.warn("Unauthorized access attempt detected.");
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};
