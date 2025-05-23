'use client';

import { FcGoogle } from "react-icons/fc";

import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";

import { trpc } from "@/lib/trpc";

interface Login3Props {
  heading?: string;
  subheading?: string;
  logo: {
    url: string;
    src: string;
    alt: string;
  };
  loginText?: string;
  googleText?: string;
  signupText?: string;
  signupUrl?: string;
}

const Login3 = ({
  heading = "Signup",
  subheading = "Create an account",
  logo = {
    url: "https://www.shadcnblocks.com",
    src: "https://shadcnblocks.com/images/block/logos/shadcnblockscom-icon.svg",
    alt: "Shadcnblocks",
  },
  signupText = "Sign up",
  googleText = "Sign up with Google",
  signupUrl = "#",
}: Login3Props) => {

  const createAccount = trpc.auth.createAccount.useMutation({});
  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const user = await createAccount.mutateAsync({
        email,
        name: "test",
        password,
      })
      if (!user) {
        console.error("User not created");
        return ;
      }
    } catch (error) {
      console.error("Error creating user: ", error);
    }
  }

  return (
    <section className="py-32">
      <div className="container">
        <div className="flex flex-col gap-4">
          <div className="mx-auto w-full bg-[#1a1513] max-w-sm rounded-md p-6 shadow">
            <div className="mb-6 flex flex-col items-center">
              <a href={logo.url} className="mb-6 flex items-center gap-2">
                <img src={logo.src} className="max-h-8" alt={logo.alt} />
              </a>
              <h1 className="mb-2 text-2xl font-bold">{heading}</h1>
              <p className="text-muted-foreground">{subheading}</p>
            </div>
            <div>
              <form className="grid gap-4" onSubmit={handleSubmit}>
                <Input type="email" placeholder="Enter your email" name="email" required />
                <div>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    name="password"
                    required
                  />
                </div>

                <Button type="submit" className="mt-2 w-full bg-[#7c7cff]">
                  {signupText}
                </Button>
                <Button variant="outline" className="w-full">
                  <FcGoogle className="mr-2 size-5" />
                  {googleText}
                </Button>
              </form>
              <div className="mx-auto mt-8 flex justify-center gap-1 text-sm text-muted-foreground">
                <p>{signupText}</p>
                <a href={signupUrl} className="font-medium text-primary">
                  Sign up
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login3;