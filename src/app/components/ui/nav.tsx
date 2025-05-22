// components/Navbar.tsx
"use client";
import Link from 'next/link'

export default function Navbar() {
  return (
    <header className="w-full border-b border-gray-800">
      <div className="mx-auto max-w-7xl px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-white">
          CodeLo
        </Link>

        <nav className="hidden md:flex gap-6 text-sm text-gray-300">
          <Link href="/about" className="hover:text-white">About</Link>
          <Link href="/features" className="hover:text-white">Features</Link>
          <Link href="/leaderboard" className="hover:text-white">Leaderboard</Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-sm text-gray-300 hover:text-white"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="px-4 py-2 rounded-md bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-medium"
          >
            Join Now
          </Link>
        </div>
      </div>
    </header>
  )
}
