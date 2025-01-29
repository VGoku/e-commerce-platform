import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCartStore } from '../stores/useCartStore'
import useAuthStore from '../stores/useAuthStore'
import useBalanceStore from '../stores/useBalanceStore'
import toast from 'react-hot-toast'

export default function Checkout() {
    const navigate = useNavigate()
    const { user } = useAuthStore()
    const { getCurrentUserItems, getTotal, clearCart } = useCartStore()
    const { getBalance, deductBalance } = useBalanceStore()

    const items = getCurrentUserItems()
    const [imageLoadStates, setImageLoadStates] = useState({})
    const subtotal = getTotal()
    const shipping = items.length > 0 ? 5.00 : 0
    const tax = subtotal * 0.1
    const total = subtotal + shipping + tax
    const balance = getBalance()

    const [formData, setFormData] = useState({
        email: user?.email || '',
        name: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        cardNumber: '',
        expiry: '',
        cvc: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (total > balance) {
            toast.error('Insufficient balance. Please try a different payment method.')
            return
        }

        // Simulate order processing
        toast.promise(
            new Promise((resolve) => setTimeout(resolve, 2000))
                .then(() => {
                    deductBalance(total)
                    clearCart()
                    navigate('/dashboard', { replace: true })
                }),
            {
                loading: 'Processing your order...',
                success: 'Thank you for your order! Your package is on the way. 🚚',
                error: 'Something went wrong. Please try again.',
            }
        )
    }

    const handleImageLoad = (itemId) => {
        setImageLoadStates(prev => ({
            ...prev,
            [itemId]: true
        }))
    }

    // Debug log to check item data
    useEffect(() => {
        console.log('Checkout items:', items)
    }, [items])

    if (items.length === 0) {
        return (
            <div className="bg-white dark:bg-gray-900">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Your cart is empty</h2>
                        <p className="mt-4 text-gray-500 dark:text-gray-400">Add some items to your cart before checking out.</p>
                        <button
                            onClick={() => navigate('/products')}
                            className="mt-8 btn btn-primary"
                        >
                            Continue Shopping
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-white dark:bg-gray-900">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                {/* Balance Display */}
                <div className="mb-8 text-center bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-white">Available Balance</h2>
                    <p className="mt-1 text-4xl font-bold text-primary-600">${balance.toFixed(2)}</p>
                    {total > balance && (
                        <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                            Your balance is insufficient for this purchase (Total: ${total.toFixed(2)})
                        </p>
                    )}
                </div>

                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-7xl lg:grid-cols-2">
                    {/* Checkout Form */}
                    <div>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-6">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Contact Information</h2>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                </div>
                            </div>

                            <div className="space-y-6">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Shipping Information</h2>
                                <div className="grid grid-cols-1 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Address
                                        </label>
                                        <input
                                            type="text"
                                            id="address"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            required
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                    </div>
                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-3">
                                            <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                City
                                            </label>
                                            <input
                                                type="text"
                                                id="city"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleChange}
                                                required
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
                                            />
                                        </div>
                                        <div className="col-span-2">
                                            <label htmlFor="state" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                State
                                            </label>
                                            <input
                                                type="text"
                                                id="state"
                                                name="state"
                                                value={formData.state}
                                                onChange={handleChange}
                                                required
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="zip" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                ZIP
                                            </label>
                                            <input
                                                type="text"
                                                id="zip"
                                                name="zip"
                                                value={formData.zip}
                                                onChange={handleChange}
                                                required
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Payment Information</h2>
                                <div className="grid grid-cols-1 gap-6">
                                    <div>
                                        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Card Number
                                        </label>
                                        <input
                                            type="text"
                                            id="cardNumber"
                                            name="cardNumber"
                                            value={formData.cardNumber}
                                            onChange={handleChange}
                                            required
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Expiry Date
                                            </label>
                                            <input
                                                type="text"
                                                id="expiry"
                                                name="expiry"
                                                placeholder="MM/YY"
                                                value={formData.expiry}
                                                onChange={handleChange}
                                                required
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="cvc" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                CVC
                                            </label>
                                            <input
                                                type="text"
                                                id="cvc"
                                                name="cvc"
                                                value={formData.cvc}
                                                onChange={handleChange}
                                                required
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10">
                                <button
                                    type="submit"
                                    className="w-full btn btn-primary"
                                    disabled={total > balance}
                                >
                                    {total > balance ? 'Insufficient Balance' : `Pay $${total.toFixed(2)}`}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div>
                        <div className="rounded-lg bg-gray-50 dark:bg-gray-800 px-4 py-6 sm:p-6 lg:p-8">
                            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Order Summary</h2>

                            <div className="mt-6">
                                <ul className="divide-y divide-gray-200">
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
                                                    <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white">
                                                        <h3>{item.title}</h3>
                                                        <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                                                    </div>
                                                </div>
                                                <div className="flex flex-1 items-end justify-between text-sm">
                                                    <p className="text-gray-500 dark:text-gray-400">Qty {item.quantity}</p>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mt-6 space-y-4">
                                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                    <div className="text-base font-medium text-gray-900 dark:text-white">Subtotal</div>
                                    <div className="text-base font-medium text-gray-900 dark:text-white">${subtotal.toFixed(2)}</div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="text-base font-medium text-gray-900 dark:text-white">Shipping</div>
                                    <div className="text-base font-medium text-gray-900 dark:text-white">${shipping.toFixed(2)}</div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="text-base font-medium text-gray-900 dark:text-white">Tax</div>
                                    <div className="text-base font-medium text-gray-900 dark:text-white">${tax.toFixed(2)}</div>
                                </div>
                                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                    <div className="text-base font-medium text-gray-900 dark:text-white">Total</div>
                                    <div className="text-base font-medium text-gray-900 dark:text-white">${total.toFixed(2)}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 