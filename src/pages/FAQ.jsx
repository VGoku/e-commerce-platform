import { useNavigate } from 'react-router-dom'
import useAuthStore from '../stores/useAuthStore'

export default function FAQ() {
    const navigate = useNavigate() 
    const { user } = useAuthStore()
    
    return (
        <div className="py-12 bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                        Frequently Asked Questions
                    </h2>
                    <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 lg:mx-auto">
                        Find answers to common questions about our products and services.
                    </p>
                </div>

                <div className="mt-12">
                    <dl className="space-y-6 divide-y divide-gray-200 dark:divide-gray-700">
                        {faqs.map((faq, index) => (
                            <div key={index} className="pt-6">
                                <dt className="text-lg font-medium text-gray-900 dark:text-white">
                                    {faq.question}
                                </dt>
                                <dd className="mt-2 text-base text-gray-500 dark:text-gray-400">
                                    {faq.answer}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    )
}

const faqs = [
    {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers."
    },
    {
        question: "How long does shipping take?",
        answer: "Domestic shipping typically takes 2-5 business days. International shipping can take 7-14 business days."
    },
    {
        question: "What is your return policy?",
        answer: "We offer a 30-day return policy for all unused items in their original packaging."
    },
    {
        question: "Do you ship internationally?",
        answer: "Yes, we ship to most countries worldwide. Shipping costs and times vary by location."
    },
    {
        question: "How can I track my order?",
        answer: "Once your order ships, you'll receive a tracking number via email to monitor your delivery."
    }
]
