"use client";
import { auth, signIn, signOut } from '@/auth';
import { handleSignIn, handleSignOut } from '@/lib/serverActions';
import React, { useActionState } from 'react'
import {useState } from 'react'
import Image from 'next/image'

const ManageSession = ({session}: {session: any}) => {

  const user = session?.user;
  const isSession = session != null;
  console.log(isSession)

  let userInfo = {}
  const [isLoggedIn, setIsLoggedIn] = useState(isSession);
  if (isLoggedIn) {
    userInfo = {
      name: user.name,
      email: user.email,
      image: user.image,
    }
    console.log(userInfo)
  }

  const handleFormSubmit = async () => {
    try {
        if (isLoggedIn) {
            setIsLoggedIn(false);
            handleSignOut();
        } else {
            setIsLoggedIn(true);
            handleSignIn();
        }
    console.log(`Is still logged in ${user}`);
    } catch (error) {
        console.error("Failed to execute session action:", error);
        return;
    }
  } 

  const [state, formAction, isPending] = useActionState(handleFormSubmit, null);
  return (
    <>
    <div>
    {isLoggedIn ? (
        <form action={formAction}>
            <button type="submit">
            <Image src={user?.image || ""} alt={user?.name} className="rounded-full w-11 h-11 object-cover" width={48} height={48} />
            </button>
        </form>
    ) : (<form action={formAction}>
            <button type="submit" className="font-plex-sans font-regular text-[18px]">Login</button>
        </form>
    )}
    </div>
    </>
  )
}

export default ManageSession


/*
<form
      action={async () => {
        "use server"
        await signIn("google")
      }}
    >
      <button type="submit">Signin with Google</button>
    </form>

*/