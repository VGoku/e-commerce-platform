export default function Returns() {
    return (
        <div className="py-12 bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                        Returns Policy
                    </h2>
                    <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 lg:mx-auto">
                        Our commitment to your satisfaction.
                    </p>
                </div>

                <div className="mt-12">
                    <div className="prose prose-lg dark:prose-invert mx-auto">
                        <h3>30-Day Return Policy</h3>
                        <p>We offer a 30-day return policy for all unused items in their original packaging.</p>

                        <h3>Return Process</h3>
                        <ol>
                            <li>Contact our customer service team</li>
                            <li>Receive a return authorization number</li>
                            <li>Pack the item securely with original packaging</li>
                            <li>Ship the item back using provided return label</li>
                        </ol>

                        <h3>Refund Information</h3>
                        <p>Refunds will be processed within 5-7 business days of receiving the returned item.</p>

                        <h3>Non-Returnable Items</h3>
                        <ul>
                            <li>Personalized items</li>
                            <li>Intimate apparel</li>
                            <li>Used or damaged items</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
