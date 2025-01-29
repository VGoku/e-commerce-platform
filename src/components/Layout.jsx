import { Fragment } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { ShoppingCartIcon, UserIcon } from '@heroicons/react/24/outline'

const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
]

export default function Layout() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Disclosure as="nav" className="bg-white shadow">
                {({ open }) => (
                    <>
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="flex h-16 justify-between">
                                <div className="flex">
                                    <div className="flex flex-shrink-0 items-center">
                                        <Link to="/" className="text-2xl font-bold text-primary-600">
                                            Shop
                                        </Link>
                                    </div>
                                    <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                                        {navigation.map((item) => (
                                            <Link
                                                key={item.name}
                                                to={item.href}
                                                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <Link
                                        to="/cart"
                                        className="ml-4 flow-root rounded-md p-2 text-gray-400 hover:text-gray-500"
                                    >
                                        <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
                                    </Link>
                                    <Menu as="div" className="relative ml-3">
                                        <Menu.Button className="rounded-md p-2 text-gray-400 hover:text-gray-500">
                                            <UserIcon className="h-6 w-6" aria-hidden="true" />
                                        </Menu.Button>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-200"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <Link
                                                            to="/login"
                                                            className={`${active ? 'bg-gray-100' : ''
                                                                } block px-4 py-2 text-sm text-gray-700`}
                                                        >
                                                            Sign in
                                                        </Link>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <Link
                                                            to="/register"
                                                            className={`${active ? 'bg-gray-100' : ''
                                                                } block px-4 py-2 text-sm text-gray-700`}
                                                        >
                                                            Register
                                                        </Link>
                                                    )}
                                                </Menu.Item>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </Disclosure>

            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                <Outlet />
            </main>

            <footer className="bg-white mt-auto">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                    <p className="text-center text-sm text-gray-500">
                        © 2024 Shop. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    )
} 