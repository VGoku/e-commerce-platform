import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { StarIcon, ShoppingCartIcon } from '@heroicons/react/20/solid'
import { HeartIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid'
import useProductStore from '../stores/useProductStore'
import useCartStore from '../stores/useCartStore'
import useAuthStore from '../stores/useAuthStore'
import useActivityStore from '../stores/useActivityStore'
import ProductReviews from '../components/ProductReviews'
import toast from 'react-hot-toast'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ProductDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { products, loading, error, fetchProducts } = useProductStore()
    const addItem = useCartStore((state) => state.addItem)
    const { user } = useAuthStore()
    const { addToRecentlyViewed, addToWishlist, removeFromWishlist, getWishlist } = useActivityStore()
    const [selectedQuantity, setSelectedQuantity] = useState(1)
    const [imageLoaded, setImageLoaded] = useState(false)

    useEffect(() => {
        if (products.length === 0) {
            fetchProducts()
        }
    }, [fetchProducts, products.length])

    const product = products.find(p => p.id === parseInt(id))
    const wishlistItems = user ? getWishlist(user.id) : []
    const isInWishlist = wishlistItems.some(item => item.id === parseInt(id))

    useEffect(() => {
        if (user && product) {
            addToRecentlyViewed(user.id, product)
        }
    }, [user, product, addToRecentlyViewed])

    const handleAddToCart = (e) => {
        e.preventDefault()
        const productToAdd = {
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            quantity: selectedQuantity
        }

        if (!user) {
            // Store the product in session storage before redirecting
            sessionStorage.setItem('pendingCartItem', JSON.stringify(productToAdd))
            toast.error('Please sign in to add items to cart')
            navigate('/login', { state: { from: `/products/${id}` } })
            return
        }

        addItem(productToAdd)
        toast.success('Added to cart!')
        navigate('/cart')
    }

    const toggleWishlist = () => {
        if (!user) {
            toast.error('Please sign in to add items to wishlist')
            navigate('/login', { state: { from: `/products/${id}` } })
            return
        }

        if (isInWishlist) {
            removeFromWishlist(user.id, product.id)
            toast.success('Removed from wishlist')
        } else {
            addToWishlist(user.id, product)
            toast.success('Added to wishlist')
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-lg text-gray-600">Loading product details...</div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-lg text-red-600">Error: {error}</div>
            </div>
        )
    }

    if (!product) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-lg text-gray-600">Product not found</div>
            </div>
        )
    }

    return (
        <div className="bg-white dark:bg-gray-900">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
                    {/* Image gallery */}
                    <div className="flex flex-col-reverse">
                        <div className="aspect-h-1 aspect-w-1 w-full">
                            <div className="relative h-full w-full rounded-lg border border-gray-200 bg-white p-4">
                                {!imageLoaded && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                                        <div className="text-gray-400">Loading image...</div>
                                    </div>
                                )}
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className={`h-full w-full object-contain transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                                    onLoad={() => setImageLoaded(true)}
                                    onError={(e) => {
                                        console.log('Image failed to load:', product.image)
                                        e.target.src = 'https://placehold.co/400x400/png?text=Product+Image'
                                        setImageLoaded(true)
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Product info */}
                    <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                        <div className="flex justify-between items-start">
                            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">{product.title}</h1>
                            <button
                                onClick={toggleWishlist}
                                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                {isInWishlist ? (
                                    <HeartSolid className="h-6 w-6 text-red-500" />
                                ) : (
                                    <HeartIcon className="h-6 w-6 text-gray-400 hover:text-red-500" />
                                )}
                            </button>
                        </div>

                        <div className="mt-3">
                            <h2 className="sr-only">Product information</h2>
                            <p className="text-3xl tracking-tight text-gray-900 dark:text-white">${product.price.toFixed(2)}</p>
                        </div>

                        {/* Reviews */}
                        <div className="mt-3">
                            <h3 className="sr-only">Reviews</h3>
                            <div className="flex items-center">
                                <div className="flex items-center">
                                    {[0, 1, 2, 3, 4].map((rating) => (
                                        <StarIcon
                                            key={rating}
                                            className={classNames(
                                                product.rating?.rate > rating ? 'text-yellow-400' : 'text-gray-300',
                                                'h-5 w-5 flex-shrink-0'
                                            )}
                                            aria-hidden="true"
                                        />
                                    ))}
                                </div>
                                <p className="ml-2 text-sm text-gray-500">
                                    {product.rating?.rate} ({product.rating?.count} reviews)
                                </p>
                            </div>
                        </div>

                        <div className="mt-6">
                            <h3 className="sr-only">Description</h3>
                            <p className="text-base text-gray-900 dark:text-gray-300">{product.description}</p>
                        </div>

                        <form className="mt-6" onSubmit={handleAddToCart}>
                            {/* Quantity */}
                            <div className="mt-8">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-medium text-gray-900 dark:text-gray-300">Quantity</h3>
                                </div>

                                <div className="mt-2">
                                    <select
                                        value={selectedQuantity}
                                        onChange={(e) => setSelectedQuantity(parseInt(e.target.value))}
                                        className="input max-w-[100px]"
                                    >
                                        {[1, 2, 3, 4, 5].map((num) => (
                                            <option key={num} value={num}>
                                                {num}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="mt-8 flex w-full items-center justify-center btn btn-primary"
                            >
                                <ShoppingCartIcon className="h-5 w-5 mr-2" />
                                Add to cart
                            </button>
                        </form>
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="mt-16">
                    <ProductReviews productId={product.id} />
                </div>
            </div>
        </div>
    )
} 