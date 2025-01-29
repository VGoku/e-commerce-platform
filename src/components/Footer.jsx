import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <footer className="bg-white dark:bg-gray-800">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">E-Shop</h3>
                        <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
                            Your one-stop shop for all your needs. Quality products, great prices, and excellent service.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">Quick Links</h3>
                        <ul className="mt-4 space-y-4">
                            <li>
                                <Link to="/" className="text-base text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/products" className="text-base text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                                    Products
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-base text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-base text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">Customer Service</h3>
                        <ul className="mt-4 space-y-4">
                            <li>
                                <Link to="/faq" className="text-base text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link to="/shipping" className="text-base text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                                    Shipping Info
                                </Link>
                            </li>
                            <li>
                                <Link to="/returns" className="text-base text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                                    Returns
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">Contact Us</h3>
                        <ul className="mt-4 space-y-4">
                            <li className="text-base text-gray-600 dark:text-gray-300">
                                Email: support@eshop.com
                            </li>
                            <li className="text-base text-gray-600 dark:text-gray-300">
                                Phone: (555) 123-4567
                            </li>
                            <li className="text-base text-gray-600 dark:text-gray-300">
                                Address: 123 E-Commerce St, Digital City, DC 12345
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8">
                    <p className="text-base text-gray-400 text-center">
                        © {new Date().getFullYear()} E-Shop. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
} 