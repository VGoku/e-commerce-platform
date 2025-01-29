import { create } from 'zustand'

const quotes = [
    {
        text: "The only way to do great work is to love what you do.",
        author: "Steve Jobs"
    },
    {
        text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
        author: "Winston Churchill"
    },
    {
        text: "The future belongs to those who believe in the beauty of their dreams.",
        author: "Eleanor Roosevelt"
    },
    {
        text: "The best way to predict the future is to create it.",
        author: "Peter Drucker"
    },
    {
        text: "Everything you've ever wanted is on the other side of fear.",
        author: "George Addair"
    },
    {
        text: "Don't watch the clock; do what it does. Keep going.",
        author: "Sam Levenson"
    },
    {
        text: "The only limit to our realization of tomorrow will be our doubts of today.",
        author: "Franklin D. Roosevelt"
    }
]

const useQuoteStore = create((set) => ({
    currentQuote: null,
    
    // Get a random quote
    getRandomQuote: () => {
        const randomIndex = Math.floor(Math.random() * quotes.length)
        set({ currentQuote: quotes[randomIndex] })
        return quotes[randomIndex]
    },

    // Get today's quote (changes daily)
    getDailyQuote: () => {
        const today = new Date()
        const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24))
        const quoteIndex = dayOfYear % quotes.length
        set({ currentQuote: quotes[quoteIndex] })
        return quotes[quoteIndex]
    }
}))

export default useQuoteStore 