import type { ReactNode } from 'react'

import Footer from './Footer'
import Header from './Header'
import GridSmallBackgroundDemo from './GridSmallBackgroundDemo'
import { Toaster } from '../Ui/sonner'

interface Props {
  children: ReactNode
}

export default function Layout({ children }: Props) {
  return (
      <GridSmallBackgroundDemo>
        <Header />
          <main className="mx-auto my-16 w-full max-w-3xl flex-grow px-3">
            {children}
          </main>
          <Toaster />
        <Footer />
      </GridSmallBackgroundDemo>
  )
}