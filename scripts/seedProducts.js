import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

const supabaseUrl = 'https://jqhgqhgsgczaigagjiur.supabase.co'
// Use service role key instead of anon key
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseServiceKey) {
    console.error('Error: SUPABASE_SERVICE_ROLE_KEY is not set in .env file')
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
})

const sampleProducts = [
    {
        name: "Premium Leather Backpack",
        description: "Handcrafted genuine leather backpack with laptop compartment and multiple pockets",
        price: 129.99,
        image_url: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80",
        category: "Bags",
        stock_quantity: 50
    },
    {
        name: "Wireless Noise-Canceling Headphones",
        description: "Premium wireless headphones with active noise cancellation and 30-hour battery life",
        price: 249.99,
        image_url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80",
        category: "Electronics",
        stock_quantity: 100
    },
    {
        name: "Smart Fitness Watch",
        description: "Advanced fitness tracker with heart rate monitoring and GPS",
        price: 199.99,
        image_url: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&q=80",
        category: "Electronics",
        stock_quantity: 75
    },
    {
        name: "Organic Cotton T-Shirt",
        description: "Sustainable, soft organic cotton t-shirt available in multiple colors",
        price: 29.99,
        image_url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80",
        category: "Clothing",
        stock_quantity: 200
    },
    {
        name: "Minimalist Wall Clock",
        description: "Modern design wall clock with silent movement",
        price: 49.99,
        image_url: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&q=80",
        category: "Home Decor",
        stock_quantity: 30
    }
]

async function seedProducts() {
    console.log('Starting to seed products...')

    for (const product of sampleProducts) {
        try {
            const { data, error } = await supabase
                .from('products')
                .insert([product])
                .select()

            if (error) {
                console.error(`Error seeding product ${product.name}:`, error.message)
                continue
            }
            console.log(`Successfully added product: ${product.name}`)
        } catch (error) {
            console.error(`Unexpected error adding product ${product.name}:`, error)
        }
    }

    console.log('Finished seeding products')
}

// Run the seeding function
seedProducts() 