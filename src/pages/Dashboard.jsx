import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../stores/useAuthStore'
import useBalanceStore from '../stores/useBalanceStore'
import useQuoteStore from '../stores/useQuoteStore'
import useActivityStore from '../stores/useActivityStore'
import { ShoppingBagIcon, CreditCardIcon, UserCircleIcon, HeartIcon, ClockIcon, StarIcon } from '@heroicons/react/24/outline'

export default function Dashboard() {
    const navigate = useNavigate()
    const { user } = useAuthStore()
    const getBalance = useBalanceStore((state) => state.getBalance)
    const getDailyQuote = useQuoteStore((state) => state.getDailyQuote)
    const { getOrders, getWishlist, getRecentlyViewed } = useActivityStore()
    const balance = getBalance()
    const quote = getDailyQuote()

    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
    }, [user, navigate])

    const orders = user ? getOrders(user.id) : []
    const wishlistItems = user ? getWishlist(user.id) : []
    const recentlyViewed = user ? getRecentlyViewed(user.id) : []

    const stats = [
        { name: 'Available Balance', value: `$${balance.toFixed(2)}`, icon: CreditCardIcon, color: 'bg-green-500' },
        { name: 'Total Orders', value: orders.length.toString(), icon: ShoppingBagIcon, color: 'bg-purple-500' },
        {
            name: 'Wishlist Items',
            value: wishlistItems.length.toString(),
            icon: HeartIcon,
            color: 'bg-blue-500',
            onClick: () => navigate('/wishlist')
        },
        { name: 'Member Since', value: new Date(user?.created_at).toLocaleDateString(), icon: UserCircleIcon, color: 'bg-pink-500' },
    ]

    if (!user) return null

    return (
        <div className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Welcome Banner with Quote */}
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 shadow-lg">
                    <div className="absolute inset-0 bg-grid-white/10"></div>
                    <div className="relative p-8">
                        <h1 className="text-3xl font-bold text-white">
                            Welcome back, {user.user_metadata?.username || user.email}! 👋
                        </h1>
                        <p className="mt-2 text-lg text-white/90">
                            Here's what's happening with your account today.
                        </p>
                        {quote && (
                            <div className="mt-6 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                                <p className="text-white/90 italic">"{quote.text}"</p>
                                <p className="mt-2 text-white/80 text-sm">— {quote.author}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Stats Grid */}
                <dl className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {stats.map((item) => (
                        <div
                            key={item.name}
                            className={`relative overflow-hidden rounded-lg bg-white dark:bg-gray-800 px-4 py-5 shadow-md transition-transform hover:scale-105 sm:px-6 ${item.onClick ? 'cursor-pointer' : ''
                                }`}
                            onClick={item.onClick}
                        >
                            <dt>
                                <div className={`absolute rounded-md ${item.color} p-3`}>
                                    <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                                </div>
                                <p className="ml-16 truncate text-sm font-medium text-gray-500 dark:text-gray-400">{item.name}</p>
                            </dt>
                            <dd className="ml-16 flex items-baseline">
                                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{item.value}</p>
                            </dd>
                        </div>
                    ))}
                </dl>

                {/* Activity and Recommendations */}
                <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
                    {/* Recent Activity */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                                <ClockIcon className="h-5 w-5 mr-2 text-gray-400" />
                                Recent Activity
                            </h2>
                        </div>
                        <div className="space-y-4">
                            {orders.length > 0 ? (
                                orders.slice(0, 5).map((order, index) => (
                                    <div key={index} className="flex items-center space-x-4 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">
                                        <ShoppingBagIcon className="h-8 w-8 text-purple-500" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                Order #{order.id}
                                            </p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                {new Date(order.date).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div className="ml-auto">
                                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                                                ${order.total.toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                                    No recent activity to show
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Recently Viewed */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                                <StarIcon className="h-5 w-5 mr-2 text-gray-400" />
                                Recently Viewed
                            </h2>
                        </div>
                        <div className="space-y-4">
                            {recentlyViewed.length > 0 ? (
                                recentlyViewed.map((product) => (
                                    <div
                                        key={product.id}
                                        className="flex items-center space-x-4 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg cursor-pointer"
                                        onClick={() => navigate(`/products/${product.id}`)}
                                    >
                                        <div className="flex-shrink-0 h-12 w-12">
                                            <img
                                                src={product.image}
                                                alt={product.title}
                                                className="h-full w-full object-cover rounded-md"
                                                onError={(e) => {
                                                    e.target.src = 'https://placehold.co/400x400/png?text=Product+Image'
                                                }}
                                            />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                                {product.title}
                                            </p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                ${product.price.toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                                    No items viewed yet
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-8">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        <button
                            onClick={() => navigate('/profile')}
                            className="btn btn-secondary flex items-center justify-center gap-2 py-4"
                        >
                            <UserCircleIcon className="h-5 w-5" />
                            Update Profile
                        </button>
                        <button
                            onClick={() => navigate('/products')}
                            className="btn btn-primary flex items-center justify-center gap-2 py-4"
                        >
                            <ShoppingBagIcon className="h-5 w-5" />
                            Browse Products
                        </button>
                        <button
                            onClick={() => navigate('/wishlist')}
                            className="btn btn-secondary flex items-center justify-center gap-2 py-4"
                        >
                            <HeartIcon className="h-5 w-5" />
                            View Wishlist
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
} 