import { Link } from 'react-router-dom'
import { TrashIcon } from '@heroicons/react/24/outline'
import { useCartStore } from '../stores/useCartStore'
import { useEffect, useState } from 'react'

export default function Cart() {
    const { getCurrentUserItems, removeItem, updateQuantity, getTotal } = useCartStore()
    const items = getCurrentUserItems()
    const subtotal = getTotal()
    const shipping = items.length > 0 ? 5.00 : 0
    const tax = subtotal * 0.1
    const total = subtotal + shipping + tax
    const [imageLoadStates, setImageLoadStates] = useState({})

    // Debug log to check item data
    useEffect(() => {
        console.log('Cart items:', items)
    }, [items])

    const handleImageLoad = (itemId) => {
        setImageLoadStates(prev => ({
            ...prev,
            [itemId]: true
        }))
    }

    const handleUpdateQuantity = (productId, quantity) => {
        updateQuantity(productId, quantity)
    }

    const handleRemoveItem = (productId) => {
        removeItem(productId)
    }

    if (items.length === 0) {
        return (
            <div className="bg-white dark:bg-gray-900">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Your cart is empty</h2>
                        <p className="mt-4 text-gray-500 dark:text-gray-400">Start shopping to add items to your cart.</p>
                        <div className="mt-6">
                            <Link to="/products" className="btn btn-primary">
                                Browse Products
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-white dark:bg-gray-900">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Shopping Cart</h1>

                <form className="mt-12">
                    <div>
                        <h2 className="sr-only">Items in your shopping cart</h2>

                        <div className="flow-root">
                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                                {items.map((item) => (
                                    <li key={item.id} className="flex py-6">
                                        <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                            {!imageLoadStates[item.id] && (
                                                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                                                    <div className="text-gray-400 text-xs">Loading...</div>
                                                </div>
                                            )}
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className={`h-full w-full object-contain object-center transition-opacity duration-300 ${imageLoadStates[item.id] ? 'opacity-100' : 'opacity-0'
                                                    }`}
                                                onLoad={() => handleImageLoad(item.id)}
                                                onError={(e) => {
                                                    console.log('Image failed to load:', item.image)
                                                    e.target.src = 'https://placehold.co/200x200/png?text=Product+Image'
                                                    handleImageLoad(item.id)
                                                }}
                                            />
                                        </div>

                                        <div className="ml-4 flex flex-1 flex-col">
                                            <div>
                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                    <h3>
                                                        <Link to={`/product/${item.id}`}>{item.title}</Link>
                                                    </h3>
                                                    <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                                                </div>
                                            </div>
                                            <div className="flex flex-1 items-end justify-between text-sm">
                                                <div className="flex items-center space-x-2">
                                                    <label htmlFor={`quantity-${item.id}`} className="text-gray-500">
                                                        Qty
                                                    </label>
                                                    <select
                                                        id={`quantity-${item.id}`}
                                                        value={item.quantity}
                                                        onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value))}
                                                        className="rounded-md border border-gray-300 text-base"
                                                    >
                                                        {[...Array(10)].map((_, i) => (
                                                            <option key={i + 1} value={i + 1}>
                                                                {i + 1}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveItem(item.id)}
                                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Order summary */}
                    <div className="mt-10 sm:ml-32 sm:pl-6">
                        <div className="rounded-lg bg-gray-50 dark:bg-gray-800 px-4 py-6 sm:p-6 lg:p-8">
                            <h2 className="sr-only">Order summary</h2>

                            <div className="flow-root">
                                <dl className="-my-4 divide-y divide-gray-200 text-sm">
                                    <div className="flex items-center justify-between py-4">
                                        <dt className="text-gray-600 dark:text-gray-400">Subtotal</dt>
                                        <dd className="font-medium text-gray-900 dark:text-white">${subtotal.toFixed(2)}</dd>
                                    </div>
                                    <div className="flex items-center justify-between py-4">
                                        <dt className="text-gray-600 dark:text-gray-400">Shipping</dt>
                                        <dd className="font-medium text-gray-900 dark:text-white">${shipping.toFixed(2)}</dd>
                                    </div>
                                    <div className="flex items-center justify-between py-4">
                                        <dt className="text-gray-600 dark:text-gray-400">Tax</dt>
                                        <dd className="font-medium text-gray-900 dark:text-white">${tax.toFixed(2)}</dd>
                                    </div>
                                    <div className="flex items-center justify-between py-4">
                                        <dt className="text-base font-medium text-gray-900 dark:text-white">Order total</dt>
                                        <dd className="text-base font-medium text-gray-900 dark:text-white">${total.toFixed(2)}</dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                        <div className="mt-10">
                            <Link
                                to="/checkout"
                                className="w-full btn btn-primary"
                            >
                                Checkout
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
} 