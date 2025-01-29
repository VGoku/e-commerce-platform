import { createClient } from '@supabase/supabase-js'

// Direct configuration without environment variables
const supabaseUrl = 'https://jqhgqhgsgczaigagjiur.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxaGdxaGdzZ2N6YWlnYWdqaXVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc2NjU4MzgsImV4cCI6MjA1MzI0MTgzOH0.b_skL62L0XuYfetX4mtddE3fr0_iCsPztOsFYXMLGq8'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Auth helper functions
export const signUp = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    })
    return { data, error }
}

export const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })
    return { data, error }
}

export const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
}

export const getCurrentUser = async () => {
    const { data: { user }, error } = await supabase.auth.getUser()
    return { user, error }
}

// Helper functions for data operations
export const getProducts = async () => {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('id', { ascending: false })

    if (error) throw error
    return data
}

export const getProduct = async (id) => {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single()

    if (error) throw error
    return data
}

export const createProduct = async (product) => {
    const { data, error } = await supabase
        .from('products')
        .insert([product])
        .select()

    if (error) throw error
    return data
}

export const updateProduct = async (id, updates) => {
    const { data, error } = await supabase
        .from('products')
        .update(updates)
        .eq('id', id)
        .select()

    if (error) throw error
    return data
}

export const deleteProduct = async (id) => {
    const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id)

    if (error) throw error
    return true
}

// Order operations
export const createOrder = async (order) => {
    const { data, error } = await supabase
        .from('orders')
        .insert([order])
        .select()

    if (error) throw error
    return data
}

export const getOrders = async (userId) => {
    const { data, error } = await supabase
        .from('orders')
        .select(`
            *,
            order_items (
                *,
                product:products (*)
            )
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

    if (error) throw error
    return data
}

// Wishlist operations
export const addToWishlist = async (userId, productId) => {
    const { data, error } = await supabase
        .from('wishlist_items')
        .insert([{ user_id: userId, product_id: productId }])
        .select()

    if (error) throw error
    return data
}

export const removeFromWishlist = async (userId, productId) => {
    const { error } = await supabase
        .from('wishlist_items')
        .delete()
        .eq('user_id', userId)
        .eq('product_id', productId)

    if (error) throw error
    return true
}

export const getWishlist = async (userId) => {
    const { data, error } = await supabase
        .from('wishlist_items')
        .select(`
            *,
            product:products (*)
        `)
        .eq('user_id', userId)

    if (error) throw error
    return data
}

// Profile helper functions
export const updateProfile = async (userId, updates) => {
    const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId)
        .select()
    return { data, error }
}

export const getProfile = async (userId) => {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()
    return { data, error }
} 