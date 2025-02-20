import React from 'react'
import { signIn } from '@/auth'

const loginPage = () => {
  return (
    <div>
      <h1>Login</h1>
      <button onClick={() => signIn("google")}>Sign in</button>
    </div>
  )
}

export default loginPage