import type { ReactNode } from 'react'

import Footer from './Footer'
import Header from './Header'
import GridSmallBackgroundDemo from './GridSmallBackgroundDemo'

interface Props {
  children: ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Header />
      <GridSmallBackgroundDemo>
        <main className="mx-auto my-16 w-full max-w-3xl flex-grow px-3">
          {children}
        </main>
      </GridSmallBackgroundDemo>
      <Footer />
    </>
  )
}
