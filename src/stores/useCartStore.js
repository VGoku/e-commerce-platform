import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import useAuthStore from './useAuthStore'

const useCartStore = create(
    persist(
        (set, get) => ({
            carts: {},  // Store carts for each user
            addItem: (product, quantity = 1) => {
                const user = useAuthStore.getState().user
                const userId = user?.id
                if (!userId) return

                set((state) => {
                    const userCart = state.carts[userId] || []
                    const existingItem = userCart.find((item) => item.id === product.id)

                    if (existingItem) {
                        const updatedCart = userCart.map((item) =>
                            item.id === product.id
                                ? { ...item, quantity: item.quantity + quantity }
                                : item
                        )
                        return {
                            carts: {
                                ...state.carts,
                                [userId]: updatedCart
                            }
                        }
                    }

                    return {
                        carts: {
                            ...state.carts,
                            [userId]: [...userCart, { ...product, quantity }]
                        }
                    }
                })
            },
            removeItem: (productId) => {
                const user = useAuthStore.getState().user
                const userId = user?.id
                if (!userId) return

                set((state) => ({
                    carts: {
                        ...state.carts,
                        [userId]: (state.carts[userId] || []).filter((item) => item.id !== productId)
                    }
                }))
            },
            updateQuantity: (productId, quantity) => {
                const user = useAuthStore.getState().user
                const userId = user?.id
                if (!userId) return

                set((state) => ({
                    carts: {
                        ...state.carts,
                        [userId]: (state.carts[userId] || []).map((item) =>
                            item.id === productId ? { ...item, quantity } : item
                        )
                    }
                }))
            },
            clearCart: () => {
                const user = useAuthStore.getState().user
                const userId = user?.id
                if (!userId) return

                set((state) => ({
                    carts: {
                        ...state.carts,
                        [userId]: []
                    }
                }))
            },
            getTotal: () => {
                const user = useAuthStore.getState().user
                const userId = user?.id
                if (!userId) return 0

                const userCart = get().carts[userId] || []
                return userCart.reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                )
            },
            getCurrentUserItems: () => {
                const user = useAuthStore.getState().user
                const userId = user?.id
                if (!userId) return []

                return get().carts[userId] || []
            }
        }),
        {
            name: 'cart-storage'
        }
    )
)

export { useCartStore }
export default useCartStore 