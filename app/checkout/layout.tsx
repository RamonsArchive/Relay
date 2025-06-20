import React, { Suspense } from 'react'

const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <main className="root">
        <div className="root-container">
        <div className="content-wrapper">
              <Suspense fallback={<div>Loading pages...</div>}>
                <div className="content-container">{children}</div>
              </Suspense>
        </div>
        </div>
        </main>
  )
}

export default layout