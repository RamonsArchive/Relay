import React, { ReactNode } from 'react'

const ProductItemLayout = ({children}: {children: ReactNode}) => {

  // use params to get the product id and use use to get in server component
  return (
    <html lang="en"> 
      <body>
        {children}
      </body>
    </html>
  )
}

export default ProductItemLayout