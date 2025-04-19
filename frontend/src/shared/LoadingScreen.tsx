// components/LoadingScreen.tsx

import { CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const quotes = [
  "Believe in yourself and all that you are.",
  "The future depends on what you do today.",
  "Every moment is a fresh beginning.",
  "You are capable of amazing things.",
  "Push yourself, because no one else is going to do it for you."
]

export default function LoadingScreen() {
  const [quoteIndex, setQuoteIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length)
    }, 4000) // Change quote every 4 seconds
    return () => clearInterval(interval)
  }, [])

  return (
    <CardContent className="flex flex-col items-center justify-center gap-6">
      <motion.div
        key={quoteIndex} // Ensures animation restarts with each new quote
        className="text-xl font-semibold text-gray-800 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 3.5 }}
      >
        {quotes[quoteIndex]}
      </motion.div>

      <motion.div
        className="w-10 h-10 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"
        aria-label="Loading spinner"
      />
    </CardContent>
  )
}
