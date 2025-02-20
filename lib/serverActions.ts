"use server";
import { signIn, signOut } from '@/auth';

export const handleSignIn = async () => {
    return await signIn("google");
}

export const handleSignOut = async () => {
    return await signOut();
}