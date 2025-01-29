import { useState } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline'
import useReviewStore from '../stores/useReviewStore'
import useAuthStore from '../stores/useAuthStore'
import toast from 'react-hot-toast'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ProductReviews({ productId }) {
    const { user } = useAuthStore()
    const { addReview, getProductReviews, getAverageRating, deleteReview } = useReviewStore()
    const [rating, setRating] = useState(5)
    const [comment, setComment] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const reviews = getProductReviews(productId)
    const averageRating = getAverageRating(productId)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!user) {
            toast.error('Please sign in to leave a review')
            return
        }

        setIsSubmitting(true)
        try {
            const review = {
                id: Date.now().toString(),
                userId: user.id,
                userName: user.user_metadata?.username || user.email,
                rating,
                comment,
                createdAt: new Date().toISOString()
            }
            addReview(productId, review)
            setComment('')
            setRating(5)
            toast.success('Review submitted successfully!')
        } catch (error) {
            toast.error('Failed to submit review')
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleDelete = (reviewId) => {
        try {
            deleteReview(productId, reviewId)
            toast.success('Review deleted successfully!')
        } catch (error) {
            toast.error('Failed to delete review')
        }
    }

    return (
        <div className="bg-white dark:bg-gray-800">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-x-8 lg:px-8">
                {/* Reviews */}
                <div className="lg:col-span-7">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Customer Reviews</h2>

                    <div className="mt-3 flex items-center">
                        <div className="flex items-center">
                            {[0, 1, 2, 3, 4].map((rating) => (
                                <StarIcon
                                    key={rating}
                                    className={classNames(
                                        averageRating > rating ? 'text-yellow-400' : 'text-gray-300',
                                        'h-5 w-5 flex-shrink-0'
                                    )}
                                    aria-hidden="true"
                                />
                            ))}
                        </div>
                        <p className="ml-2 text-sm text-gray-900 dark:text-white">
                            {averageRating.toFixed(1)} out of 5 stars
                        </p>
                        <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                            ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
                        </span>
                    </div>

                    <div className="mt-8 space-y-6">
                        {reviews.map((review) => (
                            <div key={review.id} className="border-t border-gray-200 dark:border-gray-700 pt-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="font-medium text-gray-900 dark:text-white">{review.userName}</h3>
                                        <p className="sr-only">{review.rating} out of 5 stars</p>
                                        <div className="mt-1 flex items-center">
                                            {[0, 1, 2, 3, 4].map((rating) => (
                                                <StarIcon
                                                    key={rating}
                                                    className={classNames(
                                                        review.rating > rating ? 'text-yellow-400' : 'text-gray-300',
                                                        'h-4 w-4 flex-shrink-0'
                                                    )}
                                                    aria-hidden="true"
                                                />
                                            ))}
                                        </div>
                                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{review.comment}</p>
                                    </div>
                                    {user && user.id === review.userId && (
                                        <button
                                            onClick={() => handleDelete(review.id)}
                                            className="text-sm text-red-600 hover:text-red-500"
                                        >
                                            Delete
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Review Form */}
                <div className="mt-16 lg:col-span-5 lg:mt-0">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Share your thoughts</h3>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                        {user ? 'Leave a review for this product' : 'Please sign in to leave a review'}
                    </p>

                    {user && (
                        <form onSubmit={handleSubmit} className="mt-6">
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Rating</label>
                                <div className="mt-2 flex items-center">
                                    {[1, 2, 3, 4, 5].map((value) => (
                                        <button
                                            key={value}
                                            type="button"
                                            onClick={() => setRating(value)}
                                            className="p-1"
                                        >
                                            {value <= rating ? (
                                                <StarIcon className="h-6 w-6 text-yellow-400" />
                                            ) : (
                                                <StarOutlineIcon className="h-6 w-6 text-gray-300" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="comment" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Comment
                                </label>
                                <textarea
                                    id="comment"
                                    name="comment"
                                    rows={4}
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    required
                                    className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                                    placeholder="Share your experience with this product..."
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="mt-6 w-full btn btn-primary"
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit Review'}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    )
} 