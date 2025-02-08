import React, { ReactNode } from 'react'

const ProductItemLayout = ({children}: {children: ReactNode}) => {
  return (
    <html lang="en"> {/* ✅ This prevents root layout from being inherited */}
      <body>
        {children}
      </body>
    </html>
  )
}

export default ProductItemLayout