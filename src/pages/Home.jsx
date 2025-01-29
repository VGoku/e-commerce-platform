import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import useProductStore from '../stores/useProductStore'

export default function Home() {
    const { products, loading, fetchProducts } = useProductStore()

    useEffect(() => {
        if (products.length === 0) {
            fetchProducts()
        }
    }, [fetchProducts, products.length])

    const featuredProducts = products.slice(0, 3)

    return (
        <div className="space-y-16">
            {/* Hero section */}
            <div className="relative">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-primary-800 opacity-90" />
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1441986300917-64674bd600d8')] bg-cover bg-center bg-no-repeat opacity-20" />
                </div>
                <div className="relative">
                    <div className="mx-auto max-w-7xl">
                        <div className="relative z-10 pt-14 lg:w-full lg:max-w-2xl">
                            <div className="relative px-6 py-32 sm:py-40 lg:px-8 lg:py-56 lg:pr-0">
                                <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
                                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                                        Elevate Your Style
                                    </h1>
                                    <p className="mt-6 text-lg leading-8 text-gray-100">
                                        Discover a curated collection of premium products that blend style, quality, and innovation.
                                        From fashion to electronics, find everything you need to express your unique taste.
                                    </p>
                                    <div className="mt-10 flex items-center gap-x-6">
                                        <Link
                                            to="/products"
                                            className="rounded-md bg-white px-6 py-3 text-lg font-semibold text-primary-600 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                                        >
                                            Shop Now
                                        </Link>
                                        <Link to="/products" className="text-sm font-semibold leading-6 text-white">
                                            Learn more <span aria-hidden="true">→</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Featured Products section */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:max-w-none">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Featured Products</h2>
                        <p className="mt-4 text-xl text-gray-500">
                            Handpicked selections from our latest collection
                        </p>
                    </div>

                    <div className="mt-12 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:space-y-0">
                        {featuredProducts.map((product) => (
                            <div key={product.id} className="group relative">
                                <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75">
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="h-full w-full object-contain object-center"
                                    />
                                </div>
                                <h3 className="mt-6 text-base text-gray-900">
                                    <Link to={`/products/${product.id}`}>
                                        <span className="absolute inset-0" />
                                        {product.title}
                                    </Link>
                                </h3>
                                <p className="mt-2 text-lg font-medium text-gray-900">${product.price.toFixed(2)}</p>
                                <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <Link
                            to="/products"
                            className="inline-block rounded-md border border-transparent bg-primary-600 px-8 py-3 text-center font-medium text-white hover:bg-primary-700"
                        >
                            View All Products
                        </Link>
                    </div>
                </div>
            </div>

            {/* Value Proposition section */}
            <div className="bg-gray-50">
                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
                    <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8">
                        {[
                            {
                                title: 'Free Shipping',
                                description: 'Free shipping on orders over $100',
                                icon: '🚚',
                            },
                            {
                                title: 'Secure Payment',
                                description: 'Fully secured checkout process',
                                icon: '🔒',
                            },
                            {
                                title: '24/7 Support',
                                description: 'Round-the-clock customer service',
                                icon: '💬',
                            },
                            {
                                title: 'Easy Returns',
                                description: '30-day return policy',
                                icon: '↩️',
                            },
                        ].map((feature) => (
                            <div key={feature.title} className="text-center">
                                <div className="mx-auto h-12 w-12 text-2xl">{feature.icon}</div>
                                <h3 className="mt-6 text-sm font-medium text-gray-900">{feature.title}</h3>
                                <p className="mt-2 text-sm text-gray-500">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
} 