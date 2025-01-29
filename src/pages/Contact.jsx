import { useState } from 'react'
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../stores/useAuthStore'
import toast from 'react-hot-toast'

export default function Contact() {
    const navigate = useNavigate()
    const { user } = useAuthStore()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!user) {
            toast.error('Please sign in to send a message')
            navigate('/login', { state: { from: '/contact' } })
            return
        }
        // Here you would typically send the form data to your backend
        console.log('Form submitted:', formData)
        toast.success('Message sent successfully! We will get back to you soon.')
        setFormData({
            name: '',
            email: '',
            phone: '',
            message: ''
        })
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <div className="bg-white dark:bg-gray-900">
            <div className="mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-lg md:grid md:max-w-none md:grid-cols-2 md:gap-8">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl sm:tracking-tight">Contact Us</h2>
                        <div className="mt-3">
                            <p className="text-lg text-gray-500 dark:text-gray-300">
                                Have questions? We're here to help! Reach out to us through any of these channels.
                            </p>
                        </div>
                        <div className="mt-9">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <PhoneIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                                </div>
                                <div className="ml-3 text-base text-gray-500 dark:text-gray-300">
                                    <p>+1 (555) 123-4567</p>
                                    <p className="mt-1">Mon-Fri 8am to 6pm PST</p>
                                </div>
                            </div>
                            <div className="mt-6 flex">
                                <div className="flex-shrink-0">
                                    <EnvelopeIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                                </div>
                                <div className="ml-3 text-base text-gray-500 dark:text-gray-300">
                                    <p>support@example.com</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 sm:mt-16 md:mt-0">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl sm:tracking-tight">
                            Send us a message
                            {!user && (
                                <span className="block text-sm font-normal text-gray-500 dark:text-gray-400 mt-2">
                                    Please sign in to send us a message
                                </span>
                            )}
                        </h2>
                        <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 gap-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Name
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        required
                                        disabled={!user}
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={`input w-full ${!user ? 'opacity-60 cursor-not-allowed' : ''}`}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Email
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        required
                                        disabled={!user}
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`input w-full ${!user ? 'opacity-60 cursor-not-allowed' : ''}`}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Phone
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="tel"
                                        name="phone"
                                        id="phone"
                                        disabled={!user}
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className={`input w-full ${!user ? 'opacity-60 cursor-not-allowed' : ''}`}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Message
                                </label>
                                <div className="mt-1">
                                    <textarea
                                        name="message"
                                        id="message"
                                        required
                                        disabled={!user}
                                        rows={4}
                                        value={formData.message}
                                        onChange={handleChange}
                                        className={`input w-full ${!user ? 'opacity-60 cursor-not-allowed' : ''}`}
                                    />
                                </div>
                            </div>

                            <div>
                                {user ? (
                                    <button type="submit" className="btn btn-primary w-full">
                                        Send Message
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => navigate('/login', { state: { from: '/contact' } })}
                                        className="btn btn-primary w-full"
                                    >
                                        Sign in to Send Message
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
} 