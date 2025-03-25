import { Fragment, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, ShoppingCartIcon, SunIcon, MoonIcon, HeartIcon } from '@heroicons/react/24/outline'
import { UserCircleIcon } from '@heroicons/react/24/solid'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useCartStore } from '../stores/useCartStore'
import useAuthStore from '../stores/useAuthStore'
import useThemeStore from '../stores/useThemeStore'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const userNavigation = [
    { name: 'Profile', href: '/profile' },
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Sign out', href: '#' }
]

export default function Navigation() {
    const location = useLocation()
    const navigate = useNavigate()
    const { user, signOut } = useAuthStore()
    const { toggleTheme, isDarkMode } = useThemeStore()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const getCurrentUserItems = useCartStore((state) => state.getCurrentUserItems)
    const clearCart = useCartStore((state) => state.clearCart)
    const cartItems = getCurrentUserItems()
    const cartItemsCount = cartItems?.length || 0

    const handleSignOut = async () => {
        clearCart()
        await signOut()
        navigate('/')
    }

    const navigation = [
        { name: 'Home', href: '/' },
        { name: 'Products', href: '/products' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
        { name: 'FAQ', href: '/faq' },
        ...(user ? [{ name: 'Dashboard', href: '/dashboard' }] : [])
    ]

    return (
        <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
            <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
                <div className="flex w-full items-center justify-between border-b border-gray-200 dark:border-gray-700 py-3">
                    <div className="flex items-center">
                        <Link to="/" className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                            E-Shop
                        </Link>
                        
                        {/* Desktop Navigation */}
                        <div className="hidden ml-10 space-x-4 sm:space-x-8 lg:block">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className={`text-sm sm:text-base link ${location.pathname === item.href ? 'active' : ''}`}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex lg:hidden">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400"
                        >
                            {mobileMenuOpen ? (
                                <XMarkIcon className="h-6 w-6" />
                            ) : (
                                <Bars3Icon className="h-6 w-6" />
                            )}
                        </button>
                    </div>

                    {/* Actions (Theme, Cart, User) */}
                    <div className="flex items-center space-x-2 sm:space-x-4">
                        <button
                            onClick={toggleTheme}
                            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        >
                            {isDarkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
                        </button>
                        {user && (
                            <>
                                <Link to="/wishlist" className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                                    <HeartIcon className="h-5 w-5" />
                                </Link>
                                <Link to="/cart" className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 relative">
                                    <ShoppingCartIcon className="h-5 w-5" />
                                    {cartItemsCount > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                                            {cartItemsCount}
                                        </span>
                                    )}
                                </Link>
                            </>
                        )}
                        {user ? (
                            <Menu as="div" className="relative ml-3">
                                <div>
                                    <Menu.Button className="flex rounded-full bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
                                        <span className="sr-only">Open user menu</span>
                                        <UserCircleIcon className="h-8 w-8 text-gray-400" />
                                    </Menu.Button>
                                </div>
                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-200"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-700 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <Menu.Item>
                                            {({ active }) => (
                                                <Link
                                                    to="/profile"
                                                    className={`${active ? 'bg-gray-100 dark:bg-gray-600' : ''
                                                        } block px-4 py-2 text-sm text-gray-700 dark:text-gray-200`}
                                                >
                                                    Profile
                                                </Link>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <Link
                                                    to="/dashboard"
                                                    className={`${active ? 'bg-gray-100 dark:bg-gray-600' : ''
                                                        } block px-4 py-2 text-sm text-gray-700 dark:text-gray-200`}
                                                >
                                                    Dashboard
                                                </Link>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button
                                                    onClick={handleSignOut}
                                                    className={`${active ? 'bg-gray-100 dark:bg-gray-600' : ''
                                                        } block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200`}
                                                >
                                                    Sign out
                                                </button>
                                            )}
                                        </Menu.Item>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        ) : (
                            <Link
                                to="/login"
                                className="inline-block bg-primary-600 py-2 px-4 text-base font-medium text-white hover:bg-primary-700 rounded-md"
                            >
                                Sign in
                            </Link>
                        )}
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                {mobileMenuOpen && (
                    <div className="lg:hidden py-2">
                        <div className="space-y-1 px-2">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </nav>
        </header>
    )
}