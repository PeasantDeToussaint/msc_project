import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from '../context/authContext';

export default function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/Homepage"); // Redirect to homepage if already authenticated
    }
  }, [isAuthenticated, navigate]);

  const handleRegister = (e) => {
    e.preventDefault();
    navigate("/RegisterPage");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/authentication/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        toast({
          description: "You're logged in! Redirecting to home page in 2 seconds...",
        });
        setTimeout(() => {
          login(data.jwtToken); // Use login function from useAuth
          navigate("/Homepage"); // Navigate to homepage after 2 seconds
        }, 2000); // 2000 milliseconds = 2 seconds
      } else {
        toast({
          description: "Oops. Login failed for some reason.",
        });
      }
    } catch (error) {
      toast({
        description: "An error occurred during login.",
      });
    }
  };

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-md space-y-8">
        <div>
          <h1 className="mt-6 text-3xl text-center font-bold tracking-tight text-foreground">
            Greetings! Welcome to Yasiman
          </h1>
          <h1 className="mt-6 text-3xl text-center font-bold tracking-tight text-foreground">Hi~ o(*￣▽￣*)ブ</h1>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-foreground">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Or{" "}
            <a href="#" className="font-medium text-primary hover:underline" onClick={handleRegister}>
              register for a new account
            </a>
          </p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit} method="POST">
          <Toaster />
          <div>
            <Label htmlFor="email" className="block text-sm font-medium text-foreground">
              Email address
            </Label>
            <div className="mt-1">
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 placeholder-muted-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="password" className="block text-sm font-medium text-foreground">
              Password
            </Label>
            <div className="mt-1">
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 placeholder-muted-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div>
            <Button
              type="submit"
              className="flex w-full justify-center rounded-md bg-primary py-2 px-4 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Log In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
