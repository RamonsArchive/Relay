import React from 'react'
import CheckoutUI from '@/components/CheckoutUI';
import { auth } from '@/auth';

const page = async ({params}: {params: Promise<{path: string}>}) => {
    const path = (await params).path || "/";
    console.log("path in checkout page", path);
    const session = await auth();
    const user = session?.user;
    const userId = user?.id || "";
  
  return (
    <CheckoutUI userId={userId} path={path} />
  )
}

export default page