import { create } from 'zustand'
import { createProduct, updateProduct, deleteProduct } from '../lib/supabaseClient'

const useProductStore = create((set, get) => ({
    products: [],
    loading: false,
    error: null,

    // Fetch all products
    fetchProducts: async () => {
        set({ loading: true, error: null })
        try {
            const response = await fetch('https://fakestoreapi.com/products')
            const data = await response.json()

            if (!Array.isArray(data)) {
                throw new Error('Invalid data format received from API')
            }
            
            const productsWithImages = data.map(product => ({
                ...product,
                image: product.image || 'https://placehold.co/400x400/png?text=Product+Image',
                fallbackImage: 'https://placehold.co/400x400/png?text=Product+Image'
            }))

            set({ products: productsWithImages })
        } catch (error) {
            console.error('Error fetching products:', error)
            set({ error: error.message })
        } finally {
            set({ loading: false })
        }
    },

    // Get a single product
    getProduct: (id) => {
        const products = get().products
        return products.find(p => p.id === parseInt(id))
    },

    // Add a new product
    addProduct: async (product) => {
        set({ loading: true, error: null })
        try {
            const { data, error } = await createProduct(product)
            if (error) throw error
            set(state => ({ products: [...state.products, data[0]] }))
            return { success: true, data: data[0] }
        } catch (error) {
            set({ error: error.message })
            return { success: false, error: error.message }
        } finally {
            set({ loading: false })
        }
    },

    // Update a product
    updateProduct: async (id, updates) => {
        set({ loading: true, error: null })
        try {
            const { data, error } = await updateProduct(id, updates)
            if (error) throw error
            set(state => ({
                products: state.products.map(p =>
                    p.id === id ? data[0] : p
                )
            }))
            return { success: true, data: data[0] }
        } catch (error) {
            set({ error: error.message })
            return { success: false, error: error.message }
        } finally {
            set({ loading: false })
        }
    },

    // Delete a product
    deleteProduct: async (id) => {
        set({ loading: true, error: null })
        try {
            const { error } = await deleteProduct(id)
            if (error) throw error
            set(state => ({
                products: state.products.filter(p => p.id !== id)
            }))
            return { success: true }
        } catch (error) {
            set({ error: error.message })
            return { success: false, error: error.message }
        } finally {
            set({ loading: false })
        }
    },

    // Clear error
    clearError: () => set({ error: null }),
}))

export default useProductStore