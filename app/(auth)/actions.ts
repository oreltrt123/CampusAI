"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createServerClient } from "@/lib/server";

export async function login(formData: FormData) {
  const supabase = await createServerClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { data: { session }, error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.error('Login error:', error.message);
    redirect(`/login?error=${encodeURIComponent(error.message)}`);
  }

  // Explicitly set session cookies for client-side sync
  if (session) {
    await supabase.auth.setSession({
      access_token: session.access_token,
      refresh_token: session.refresh_token,
    });
  }

  revalidatePath("/", "layout");
  redirect("/discover");
}

export async function signup(formData: FormData) {
  const supabase = await createServerClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { data: { session }, error } = await supabase.auth.signUp({
    ...data,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/login`,
    },
  });

  if (error) {
    console.error('Signup error:', error.message);
    redirect(`/signup?error=${encodeURIComponent(error.message)}`);
  }

  // If session is created (no email confirmation), set it
  if (session) {
    await supabase.auth.setSession({
      access_token: session.access_token,
      refresh_token: session.refresh_token,
    });
    revalidatePath("/", "layout");
    redirect("/discover");
  } else {
    // Email confirmation required
    redirect("/confirm-email");
  }
}

export async function logout() {
  const supabase = await createServerClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Logout error:', error.message);
  }
  revalidatePath("/", "layout");
  redirect("/login");
}