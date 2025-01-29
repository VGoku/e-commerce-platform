import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { HeartIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'
import useAuthStore from '../stores/useAuthStore'
import useActivityStore from '../stores/useActivityStore'
import useCartStore from '../stores/useCartStore'
import toast from 'react-hot-toast'

export default function WishlistView() {
    const navigate = useNavigate()
    const { user } = useAuthStore()
    const { getWishlist, removeFromWishlist } = useActivityStore()
    const addItem = useCartStore((state) => state.addItem)
    const wishlistItems = user ? getWishlist(user.id) : []

    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
    }, [user, navigate])

    const handleRemoveFromWishlist = (productId) => {
        removeFromWishlist(user.id, productId)
        toast.success('Removed from wishlist')
    }

    const handleAddToCart = (product) => {
        addItem(product, 1)
        toast.success('Added to cart')
    }

    if (!user) return null

    return (
        <div className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">My Wishlist</h1>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                        {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'}
                    </span>
                </div>

                {wishlistItems.length === 0 ? (
                    <div className="text-center py-12">
                        <HeartIcon className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No items in wishlist</h3>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Start adding some items to your wishlist!
                        </p>
                        <div className="mt-6">
                            <button
                                onClick={() => navigate('/products')}
                                className="btn btn-primary"
                            >
                                Browse Products
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {wishlistItems.map((product) => (
                            <div
                                key={product.id}
                                className="group relative bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
                            >
                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden">
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="h-full w-full object-contain object-center"
                                        onError={(e) => {
                                            e.target.src = 'https://placehold.co/400x400/png?text=Product+Image'
                                        }}
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                                        <span onClick={() => navigate(`/products/${product.id}`)} className="cursor-pointer hover:text-primary-600">
                                            {product.title}
                                        </span>
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{product.description}</p>
                                    <div className="mt-2 flex items-center justify-between">
                                        <p className="text-lg font-medium text-gray-900 dark:text-white">
                                            ${product.price.toFixed(2)}
                                        </p>
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => handleAddToCart(product)}
                                                className="btn btn-primary btn-sm"
                                            >
                                                <ShoppingCartIcon className="h-5 w-5 mr-1" />
                                                Add to Cart
                                            </button>
                                            <button
                                                onClick={() => handleRemoveFromWishlist(product.id)}
                                                className="btn btn-outline btn-sm text-red-600 hover:text-white hover:bg-red-600"
                                            >
                                                <HeartIcon className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
} 