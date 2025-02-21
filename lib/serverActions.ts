"use server";
import { signIn, signOut } from '@/auth';

export const handleSignIn = async (callbackUrl: string) => {
    return await signIn("google", {redirectTo: callbackUrl});
}

export const handleSignOut = async () => {
    return await signOut();
}