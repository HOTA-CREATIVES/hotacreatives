import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "@/services/firebase";
import { ROUTES } from "@/routes";
import { hasAdminAccess } from "@/services/admin-auth.service";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/base/card";
import { Input } from "@/components/base/input";
import { Button } from "@/components/base/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/base/form";

const signinSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
});

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [signinError, setSigninError] = useState("");
  const [isSigniningIn, setIsSigniningIn] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) return;

      const allowed = await hasAdminAccess(user.uid);
      if (allowed) {
        navigate(ROUTES.ADMIN_DASHBOARD, { replace: true });
      } else {
        await signOut(auth);
      }
    });

    return () => unsub();
  }, [navigate]);

  const signinForm = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmitSignin(values: z.infer<typeof signinSchema>) {
    setSigninError("");
    setIsSigniningIn(true);
    try {
      const normalizedEmail = values.email.trim().toLowerCase();
      const credential = await signInWithEmailAndPassword(
        auth,
        normalizedEmail,
        values.password,
      );

      const allowed = await hasAdminAccess(credential.user.uid);
      if (!allowed) {
        await signOut(auth);
        setSigninError("Account is not authorized for admin access.");
        return;
      }

      navigate(ROUTES.ADMIN_DASHBOARD, { replace: true });
    } catch {
      setSigninError("Invalid admin credentials. Please try again.");
    } finally {
      setIsSigniningIn(false);
    }
  }

  return (
    <main className="relative min-h-screen bg-background text-foreground px-4 py-16 sm:px-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(244,194,13,0.12),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.06),transparent_30%)]" />
      <section
        aria-labelledby="admin-auth-heading"
        className="relative mx-auto grid w-full max-w-5xl gap-8 rounded-3xl border border-border/60 bg-card/70 p-4 shadow-2xl backdrop-blur-sm md:grid-cols-[0.95fr_1.05fr] md:p-8"
      >
        <div className="hidden rounded-2xl border border-border/60 bg-muted/30 p-8 md:flex md:flex-col md:justify-between">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
              HOTA Admin
            </p>
            <h1
              id="admin-auth-heading"
              className="text-3xl font-black leading-tight text-foreground"
            >
              Control your content stack with confidence.
            </h1>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              Manage posts, tags, categories, and author profiles from one
              secure dashboard.
            </p>
          </div>
          <p className="text-xs text-muted-foreground">
            Tip: Use a strong password and avoid shared admin credentials.
          </p>
        </div>

        <div>
          <h1 className="mb-4 text-2xl font-black md:hidden">Admin Access</h1>
          <Card className="border-border/70 bg-card/80">
            <CardHeader>
              <CardTitle>Sign In</CardTitle>
              <CardDescription>
                Sign in with your pre-provisioned admin account.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...signinForm}>
                <form
                  onSubmit={signinForm.handleSubmit(onSubmitSignin)}
                  className="space-y-4"
                  aria-describedby={signinError ? "signin-error" : undefined}
                >
                  <FormField
                    control={signinForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="admin@hota.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={signinForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Enter password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {signinError && (
                    <p
                      id="signin-error"
                      role="alert"
                      aria-live="assertive"
                      className="rounded-md border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm text-destructive"
                    >
                      {signinError}
                    </p>
                  )}
                  <Button
                    type="submit"
                    disabled={isSigniningIn}
                    className="w-full"
                  >
                    {isSigniningIn ? "Signing in..." : "Sign in"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </section>
      <div className="relative mx-auto mt-6 w-full max-w-5xl text-center">
        <Link
          to={ROUTES.BLOG}
          className="text-sm text-muted-foreground underline-offset-4 transition hover:text-primary hover:underline"
        >
          Back to blog
        </Link>
      </div>
    </main>
  );
}
