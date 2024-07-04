import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast";

export default function RegisterPage() {
  const {toast} = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/authentication/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem('token', token);
        toast({
          description: "Register Successful! Navigating to home page.",
        });
        setTimeout(() => {
          navigate("./Homepage"); // Redirect to homepage
        }, 2000);  // Redirect to homepage immediately after registration
      } else {
        console.error('Registration failed');
       toast({
         description: "Oops. Registration failed for some reason.",
        });;
      }
    } catch (error) {
      console.error('An error occurred:', error);
      toast({
        description: "An error occurred during registration.",
      });
    }
  };

  const handleLoginRedirect = () => {
    navigate("/LoginPage");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-foreground">Register for Yasiman</h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Or{" "}
            <a href="#" className="font-medium text-primary hover:underline" onClick={handleLoginRedirect}>
              login to your account
            </a>
          </p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit} method="POST">
          <Toaster />
          <div>
            <Label htmlFor="name" className="block text-sm font-medium text-muted-foreground">
              Name
            </Label>
            <div className="mt-1">
              <Input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 text-foreground shadow-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="email" className="block text-sm font-medium text-muted-foreground">
              Email address
            </Label>
            <div className="mt-1">
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 text-foreground shadow-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="password" className="block text-sm font-medium text-muted-foreground">
              Password
            </Label>
            <div className="mt-1">
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 text-foreground shadow-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <Button type="submit" className="w-full">
              Register
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
