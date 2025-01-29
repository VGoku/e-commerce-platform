import { Navigate, useLocation } from 'react-router-dom'
import useAuthStore from '../stores/useAuthStore'

export default function ProtectedRoute({ children }) {
    const { user, loading } = useAuthStore()
    const location = useLocation()

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
            </div>
        )
    }

    if (!user) {
        // Save the attempted URL for redirecting after login
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    return children
} 