import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useActivityStore = create(
    persist(
        (set, get) => ({
            orders: {},  // Keyed by userId
            wishlist: {}, // Keyed by userId
            recentlyViewed: {}, // Keyed by userId

            // Order management
            addOrder: (userId, order) => {
                set((state) => ({
                    orders: {
                        ...state.orders,
                        [userId]: [...(state.orders[userId] || []), order]
                    }
                }))
            },

            getOrders: (userId) => {
                const state = get()
                return state.orders[userId] || []
            },

            // Wishlist management
            addToWishlist: (userId, product) => {
                set((state) => {
                    const userWishlist = state.wishlist[userId] || []
                    if (!userWishlist.some(item => item.id === product.id)) {
                        return {
                            wishlist: {
                                ...state.wishlist,
                                [userId]: [...userWishlist, product]
                            }
                        }
                    }
                    return state
                })
            },

            removeFromWishlist: (userId, productId) => {
                set((state) => ({
                    wishlist: {
                        ...state.wishlist,
                        [userId]: (state.wishlist[userId] || []).filter(item => item.id !== productId)
                    }
                }))
            },

            getWishlist: (userId) => {
                const state = get()
                return state.wishlist[userId] || []
            },

            // Recently viewed management
            addToRecentlyViewed: (userId, product) => {
                set((state) => {
                    const userRecent = state.recentlyViewed[userId] || []
                    const filteredRecent = userRecent.filter(item => item.id !== product.id)
                    return {
                        recentlyViewed: {
                            ...state.recentlyViewed,
                            [userId]: [product, ...filteredRecent].slice(0, 5) // Keep only last 5 items
                        }
                    }
                })
            },

            getRecentlyViewed: (userId) => {
                const state = get()
                return state.recentlyViewed[userId] || []
            },

            // Clear all activity for a user
            clearUserActivity: (userId) => {
                set((state) => ({
                    orders: { ...state.orders, [userId]: [] },
                    wishlist: { ...state.wishlist, [userId]: [] },
                    recentlyViewed: { ...state.recentlyViewed, [userId]: [] }
                }))
            }
        }),
        {
            name: 'activity-storage'
        }
    )
)

export default useActivityStore 