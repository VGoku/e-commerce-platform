import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid'
import useProductStore from '../stores/useProductStore'
import useAuthStore from '../stores/useAuthStore'
import useActivityStore from '../stores/useActivityStore'
import toast from 'react-hot-toast'

export default function Products() {
    const navigate = useNavigate()
    const { products, loading, error, fetchProducts } = useProductStore()
    const { user } = useAuthStore()
    const { addToWishlist, removeFromWishlist, getWishlist, addToRecentlyViewed } = useActivityStore()
    const [sortBy, setSortBy] = useState('id')
    const [imageLoadStates, setImageLoadStates] = useState({})
    const wishlistItems = user ? getWishlist(user.id) : []

    useEffect(() => {
        if (products.length === 0) {
            fetchProducts()
        }
    }, [fetchProducts, products.length])

    const handleImageLoad = (productId) => {
        setImageLoadStates(prev => ({
            ...prev,
            [productId]: true
        }))
    }

    const handleImageError = (e, product) => {
        console.log('Image failed to load:', product.image)
        e.target.src = product.fallbackImage || 'https://placehold.co/400x400/png?text=Product+Image'
        handleImageLoad(product.id)
    }

    const toggleWishlist = (product) => {
        if (!user) {
            toast.error('Please sign in to add items to wishlist')
            navigate('/login')
            return
        }

        const isInWishlist = wishlistItems.some(item => item.id === product.id)
        if (isInWishlist) {
            removeFromWishlist(user.id, product.id)
            toast.success('Removed from wishlist')
        } else {
            addToWishlist(user.id, product)
            toast.success('Added to wishlist')
        }
    }

    const handleProductClick = (product) => {
        if (user) {
            addToRecentlyViewed(user.id, product)
        }
        navigate(`/products/${product.id}`)
    }

    const sortedProducts = [...products].sort((a, b) => {
        switch (sortBy) {
            case 'price-asc':
                return a.price - b.price
            case 'price-desc':
                return b.price - a.price
            case 'title':
                return a.title.localeCompare(b.title)
            default:
                return b.id - a.id
        }
    })

    if (loading) return (
        <div className="flex justify-center items-center min-h-[50vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        </div>
    )

    if (error) return (
        <div className="text-center text-red-600">
            Error: {error}
        </div>
    )

    return (
        <div className="bg-white dark:bg-gray-900">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Products</h2>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="input"
                    >
                        <option value="id">Latest</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="title">Name</option>
                    </select>
                </div>

                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {sortedProducts.map((product) => (
                        <div key={product.id} className="group relative">
                            <div className="relative aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-700">
                                {!imageLoadStates[product.id] && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
                                    </div>
                                )}
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className={`h-full w-full object-contain object-center transition-opacity duration-300 ${imageLoadStates[product.id] ? 'opacity-100' : 'opacity-0'
                                        }`}
                                    onLoad={() => handleImageLoad(product.id)}
                                    onError={(e) => handleImageError(e, product)}
                                    loading="lazy"
                                />
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        toggleWishlist(product)
                                    }}
                                    className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800"
                                >
                                    {wishlistItems.some(item => item.id === product.id) ? (
                                        <HeartSolid className="h-6 w-6 text-red-500" />
                                    ) : (
                                        <HeartOutline className="h-6 w-6 text-gray-400 hover:text-red-500" />
                                    )}
                                </button>
                            </div>
                            <div
                                className="mt-4 cursor-pointer"
                                onClick={() => handleProductClick(product)}
                            >
                                <h3 className="text-sm text-gray-700 dark:text-gray-300">{product.title}</h3>
                                <p className="mt-1 text-lg font-medium text-gray-900 dark:text-white">${product.price.toFixed(2)}</p>
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{product.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
} 