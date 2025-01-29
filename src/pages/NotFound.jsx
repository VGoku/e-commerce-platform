import { Link } from 'react-router-dom'

export default function NotFound() {
    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-max mx-auto text-center">
                <main>
                    <div className="sm:flex items-center">
                        <p className="text-4xl font-bold text-primary-600 sm:text-5xl">404</p>
                        <div className="sm:ml-6">
                            <div className="sm:border-l sm:border-gray-200 sm:pl-6">
                                <h1 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight sm:text-5xl">
                                    Page not found
                                </h1>
                                <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                                    Please check the URL in the address bar and try again.
                                </p>
                            </div>
                            <div className="mt-8 sm:border-l sm:border-transparent sm:pl-6">
                                <Link
                                    to="/"
                                    className="btn btn-primary"
                                >
                                    Go back home
                                </Link>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
} 