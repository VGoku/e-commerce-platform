import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useReviewStore = create(
    persist(
        (set, get) => ({
            reviews: {},  // Store reviews for each product

            // Add a review
            addReview: (productId, review) => {
                set((state) => {
                    const productReviews = state.reviews[productId] || []
                    return {
                        reviews: {
                            ...state.reviews,
                            [productId]: [...productReviews, review]
                        }
                    }
                })
            },

            // Get reviews for a product
            getProductReviews: (productId) => {
                const state = get()
                return state.reviews[productId] || []
            },

            // Get average rating for a product
            getAverageRating: (productId) => {
                const state = get()
                const productReviews = state.reviews[productId] || []
                if (productReviews.length === 0) return 0
                const sum = productReviews.reduce((acc, review) => acc + review.rating, 0)
                return sum / productReviews.length
            },

            // Delete a review
            deleteReview: (productId, reviewId) => {
                set((state) => {
                    const productReviews = state.reviews[productId] || []
                    return {
                        reviews: {
                            ...state.reviews,
                            [productId]: productReviews.filter(review => review.id !== reviewId)
                        }
                    }
                })
            }
        }),
        {
            name: 'review-storage'
        }
    )
)

export default useReviewStore 