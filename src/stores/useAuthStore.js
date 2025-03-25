import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { supabase } from '../lib/supabaseClient'
import { useCartStore } from './useCartStore'

const useAuthStore = create(
    persist(
        (set) => ({
            user: null,
            loading: false,
            error: null,

            initialize: async () => {
                set({ loading: true, error: null })
                try {
                    // First, try to get existing session
                    const { data: { session }, error: sessionError } = await supabase.auth.getSession()
                    if (sessionError) throw sessionError

                    // Update user state based on session
                    if (session?.user) {
                        set({ user: session.user })
                    }

                    // Set up auth state change listener
                    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
                        set({ user: session?.user ?? null })
                    })

                    return () => subscription?.unsubscribe()
                } catch (error) {
                    console.error('Auth initialization error:', error)
                    set({ error: 'Failed to initialize authentication' })
                } finally {
                    set({ loading: false })
                }
            },

            signIn: async (email, password) => {
                set({ loading: true, error: null })
                try {
                    const { data: { session }, error } = await supabase.auth.signInWithPassword({
                        email: email.trim(),
                        password
                    })

                    if (error) throw error
                    if (session) {
                        set({ user: session.user })
                    }
                    return { success: true }
                } catch (error) {
                    console.error('Sign in error:', error)
                    set({ error: error.message })
                    return { success: false, error: error.message }
                } finally {
                    set({ loading: false })
                }
            },

            signInWithGithub: async () => {
                set({ loading: true, error: null })
                try {
                    const { error } = await supabase.auth.signInWithOAuth({
                        provider: 'github',
                        options: {
                            redirectTo: `${window.location.origin}/dashboard`
                        }
                    })
                    if (error) throw error
                    return { success: true }
                } catch (error) {
                    console.error('GitHub sign in error:', error)
                    set({ error: 'Failed to sign in with GitHub' })
                    return { success: false, error: 'Failed to sign in with GitHub' }
                } finally {
                    set({ loading: false })
                }
            },

            signUp: async (email, password, username) => {
                set({ loading: true, error: null })
                try {
                    // Validate inputs
                    if (!email || !password || !username) {
                        throw new Error('Email, password, and username are required')
                    }

                    const { data, error } = await supabase.auth.signUp({
                        email: email.trim(),
                        password,
                        options: {
                            data: {
                                username: username.trim()
                            },
                            emailRedirectTo: `${window.location.origin}/login`
                        }
                    })

                    if (error) throw error

                    // Check if email confirmation is required
                    if (data?.user && !data?.session) {
                        return {
                            success: true,
                            message: 'Please check your email for confirmation link'
                        }
                    }

                    // If email confirmation is not required, create profile
                    if (data?.user) {
                        const { error: profileError } = await supabase
                            .from('profiles')
                            .upsert([
                                {
                                    id: data.user.id,
                                    username: username.trim(),
                                    updated_at: new Date().toISOString()
                                }
                            ])
                        if (profileError) {
                            console.error('Profile creation error:', profileError)
                        }
                        set({ user: data.user })
                    }

                    return { success: true }
                } catch (error) {
                    console.error('Sign up error:', error)
                    let errorMessage = 'Failed to create account'
                    if (error.message.includes('already registered')) {
                        errorMessage = 'This email is already registered'
                    }
                    set({ error: errorMessage })
                    return { success: false, error: errorMessage }
                } finally {
                    set({ loading: false })
                }
            },

            signOut: async () => {
                set({ loading: true, error: null })
                try {
                    const { error } = await supabase.auth.signOut()
                    if (error) throw error
                    set({ user: null })
                    // Clear the cart when signing out
                    useCartStore.getState().clearCart()
                    window.location.href = '/' // Redirect to home page
                } catch (error) {
                    console.error('Sign out error:', error)
                    set({ error: 'Failed to sign out' })
                } finally {
                    set({ loading: false })
                }
            },

            clearError: () => set({ error: null }),
        }),
        {
            name: 'auth-storage',
            storage: typeof window !== 'undefined' ? window.localStorage : undefined,
            partialize: (state) => ({
                user: state.user,
            }),
        }
    )
)

export default useAuthStore