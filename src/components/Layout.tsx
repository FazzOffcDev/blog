'use client'

import { ReactNode } from 'react'
import CosmicBackground from './CosmicBackground'
import Navigation from './Navigation'
import MouseGlowEffect from './MouseGlowEffect'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden">
      <CosmicBackground />
      <MouseGlowEffect />
      <div className="relative z-10">
        <Navigation />
        <main className="relative z-10">
          {children}
        </main>
      </div>
    </div>
  )
}