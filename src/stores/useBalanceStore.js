import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import useAuthStore from './useAuthStore'

const INITIAL_BALANCE = 1000

const useBalanceStore = create(
    persist(
        (set, get) => ({
            balances: {},  // Store balances for each user
            getBalance: () => {
                const user = useAuthStore.getState().user
                const userId = user?.id
                if (!userId) return 0
                return get().balances[userId] || INITIAL_BALANCE
            },
            deductBalance: (amount) => {
                const user = useAuthStore.getState().user
                const userId = user?.id
                if (!userId) return

                set((state) => ({
                    balances: {
                        ...state.balances,
                        [userId]: Math.max(0, (state.balances[userId] || INITIAL_BALANCE) - amount)
                    }
                }))
            },
            resetBalance: () => {
                const user = useAuthStore.getState().user
                const userId = user?.id
                if (!userId) return

                set((state) => ({
                    balances: {
                        ...state.balances,
                        [userId]: INITIAL_BALANCE
                    }
                }))
            }
        }),
        {
            name: 'balance-storage'
        }
    )
)

export default useBalanceStore 