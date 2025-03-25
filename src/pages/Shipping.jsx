export default function Shipping() {
    return (
        <div className="py-12 bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                        Shipping Policy
                    </h2>
                    <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 lg:mx-auto">
                        Information about our shipping methods and delivery times.
                    </p>
                </div>

                <div className="mt-12">
                    <div className="prose prose-lg dark:prose-invert mx-auto">
                        <h3>Delivery Times</h3>
                        <p>Domestic orders typically take 2-5 business days for delivery.</p>
                        <p>International shipping can take 7-14 business days.</p>

                        <h3>Shipping Methods</h3>
                        <ul>
                            <li>Standard Shipping (2-5 business days)</li>
                            <li>Express Shipping (1-2 business days)</li>
                            <li>International Shipping (7-14 business days)</li>
                        </ul>

                        <h3>Shipping Costs</h3>
                        <p>Standard shipping is free for orders over $100.</p>
                        <p>Express shipping has additional charges based on location.</p>

                        <h3>Tracking Orders</h3>
                        <p>Once your order ships, you'll receive a tracking number via email.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
