"use client";

import { FcGoogle } from "react-icons/fc";

import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { trpc } from "@/lib/trpc";
interface Signup2Props {
  heading?: string;
  subheading?: string;
  logo: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  signupText?: string;
  googleText?: string;
  loginText?: string;
  loginUrl?: string;
}

const Signup2 = ({
  heading = "Signup",
  subheading = "Create a new account",
  logo = {
    url: "https://www.shadcnblocks.com",
    src: "https://shadcnblocks.com/images/block/block-1.svg",
    alt: "logo",
    title: "shadcnblocks.com",
  },
  googleText = "Sign up with Google",
  signupText = "Create an account",
  loginText = "Already have an account?",
  loginUrl = "#",
}: Signup2Props) => {
    const createAccount = trpc.auth.createAccount.useMutation();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const name = formData.get("username") as string;
        const password = formData.get("password") as string;

        try {
            const user = await createAccount.mutateAsync({
                email,
                name,
                password,
            })
            if (user) {
                console.log("User created successfully", user);
            }

        } catch (error) {
            console.error("Error creating user", error);
        }
    }

  return (
    <section className="h-screen bg-muted">
      <div className="flex h-full items-center justify-center">
        <div className="flex w-full max-w-sm flex-col items-center gap-y-8">
          <div className="flex flex-col items-center gap-y-2">
            {/* Logo */}
            <div className="flex items-center gap-1 lg:justify-start">
              <a href="https://shadcnblocks.com">
                <img
                  src={logo.src}
                  alt={logo.alt}
                  title={logo.title}
                  className="h-12"
                />
              </a>
            </div>
            <h1 className="text-3xl font-semibold">{heading}</h1>
            <p className="text-sm text-muted-foreground">{subheading}</p>
          </div>
          <form action="" onSubmit={handleSubmit} className="w-full">
              <div className="flex w-full flex-col gap-8 rounded-md border border-muted  px-6 py-12 shadow-md">
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <Label>Email</Label>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      required
                      className=""
                      name="email"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label>Username</Label>
                    <Input
                      type="text"
                      placeholder="Enter your username"
                      required
                      className=""
                      name="username"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label>Password</Label>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      required
                      className=""
                      name="password"
                    />
                  </div>
                  <div className="flex flex-col gap-4">
                    <Button type="submit" className="mt-2 w-full cursor-pointer">
                      {signupText}
                    </Button>
                    <Button variant="outline" className="w-full">
                      <FcGoogle className="mr-2 size-5" />
                      {googleText}
                    </Button>
                  </div>
                </div>
              </div>
          </form>
          <div className="flex justify-center gap-1 text-sm text-muted-foreground">
            <p>{loginText}</p>
            <a
              href={loginUrl}
              className="font-medium text-primary hover:underline"
            >
              Log in
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup2;
