import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jqhgqhgsgczaigagjiur.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxaGdxaGdzZ2N6YWlnYWdqaXVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc2NjU4MzgsImV4cCI6MjA1MzI0MTgzOH0.b_skL62L0XuYfetX4mtddE3fr0_iCsPztOsFYXMLGq8'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
    }
}) 