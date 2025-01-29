import { ShieldCheckIcon, TruckIcon, CurrencyDollarIcon, UserGroupIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../stores/useAuthStore'

export default function About() {
    const navigate = useNavigate()
    const { user } = useAuthStore()

    const features = [
        {
            name: 'Quality Products',
            description: 'We source only the highest quality products from trusted manufacturers and brands.',
            icon: ShieldCheckIcon,
        },
        {
            name: 'Fast Shipping',
            description: 'Free shipping on orders over $50. Most orders delivered within 2-3 business days.',
            icon: TruckIcon,
        },
        {
            name: 'Best Prices',
            description: 'We regularly check competitor prices to ensure you get the best deals.',
            icon: CurrencyDollarIcon,
        },
        {
            name: 'Expert Team',
            description: 'Our customer service team is available 24/7 to help with any questions.',
            icon: UserGroupIcon,
        },
    ]

    const team = [
        {
            name: 'John Smith',
            role: 'CEO & Founder',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            bio: 'With over 15 years of experience in e-commerce, John leads our company vision and strategy.',
        },
        {
            name: 'Sarah Johnson',
            role: 'Head of Operations',
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            bio: 'Sarah ensures smooth operations and exceptional customer service across all departments.',
        },
        {
            name: 'Michael Chen',
            role: 'Lead Developer',
            image: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            bio: 'Michael leads our technical team in building and maintaining our e-commerce platform.',
        },
    ]

    return (
        <div className="py-12 bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:text-center">
                    <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">About Us</h2>
                    <p className="mt-2 text-3xl leading-8 font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                        Welcome to Our E-Commerce Platform
                    </p>
                    <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 lg:mx-auto">
                        We're dedicated to providing the best shopping experience for our customers.
                    </p>
                </div>

                <div className="mt-10">
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                        {features.map((feature) => (
                            <div key={feature.name} className="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <feature.icon className="h-8 w-8 text-primary-500" aria-hidden="true" />
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">{feature.name}</h3>
                                        <p className="mt-2 text-base text-gray-500 dark:text-gray-300">{feature.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-20">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Our Team</h2>
                        <p className="mt-4 text-lg text-gray-500 dark:text-gray-300">
                            Meet the people behind our success
                            {!user && (
                                <span className="block text-sm mt-2">
                                    <button
                                        onClick={() => navigate('/login', { state: { from: '/about' } })}
                                        className="text-primary-600 hover:text-primary-500"
                                    >
                                        Sign in to view full team details
                                    </button>
                                </span>
                            )}
                        </p>
                    </div>
                    <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {team.map((member) => (
                            <div
                                key={member.name}
                                className="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center"
                            >
                                <div className="mx-auto h-24 w-24 overflow-hidden rounded-full">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <div className="mt-4">
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">{member.name}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{member.role}</p>
                                    {user ? (
                                        <p className="mt-3 text-base text-gray-600 dark:text-gray-300">{member.bio}</p>
                                    ) : (
                                        <p className="mt-3 text-base text-gray-400 dark:text-gray-500 blur-sm hover:blur-none cursor-not-allowed">
                                            {member.bio}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
} 