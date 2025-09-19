'use server'

import { signIn, signOut } from "@/auth";

export async function doSocialLogin(formData: FormData) {
  const action = formData.get('action');

  if (typeof action === 'string') {
    await signIn(action as "google" | string, {
      redirectTo: "/", 
    });
  } else {
    console.error("No valid action found in FormData");
  }
}

export async function doLogout() {
  await signOut({
    redirectTo: "/", // or callbackUrl: "/" depending on your auth function
  });
}
