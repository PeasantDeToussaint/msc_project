import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSpring, animated, config } from 'react-spring';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { UserPlus, Loader2 } from 'lucide-react';

const FloatingObject = ({ delay }) => {
  const props = useSpring({
    loop: true,
    from: { transform: 'translate3d(0,0px,0)' },
    to: [
      { transform: 'translate3d(0,20px,0)' },
      { transform: 'translate3d(0,-20px,0)' },
    ],
    config: {
      duration: 2000 + delay,
    },
  });

  return (
    <animated.div
      style={{
        ...props,
        position: 'absolute',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)',
      }}
    />
  );
};

const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4F46E5" />
            <stop offset="50%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#DB2777" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#gradient)" opacity="0.3" />
      </svg>
      <FloatingObject delay={0} style={{ top: '10%', left: '10%' }} />
      <FloatingObject delay={500} style={{ top: '20%', right: '20%' }} />
      <FloatingObject delay={1000} style={{ bottom: '15%', left: '30%' }} />
      <FloatingObject delay={1500} style={{ bottom: '25%', right: '15%' }} />
    </div>
  );
};

export default function RegisterPage() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const formAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(50px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: config.molasses,
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
    setIsLoading(true);
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
          description: "Registration successful! Redirecting to home page...",
          duration: 3000,
        });
        setTimeout(() => {
          navigate("/Homepage");
        }, 2000);
      } else {
        toast({
          description: "Registration failed. Please try again.",
          variant: "destructive",
          duration: 3000,
        });
      }
    } catch (error) {
      toast({
        description: "An error occurred during registration.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <AnimatedBackground />
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
      <animated.div style={formAnimation} className="w-full max-w-md space-y-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden backdrop-blur-sm bg-opacity-80">
          <div className="px-8 py-12">
            <div className="text-center mb-8">
              <UserPlus className="mx-auto h-12 w-12 text-indigo-600" />
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Register for Yasiman</h2>
              <p className="mt-2 text-sm text-gray-600">Create your account</p>
            </div>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <Label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    "Register"
                  )}
                </Button>
              </div>
            </form>
            <div className="mt-6 text-center">
              <Link to="/LoginPage" className="text-sm text-indigo-600 hover:text-indigo-500">
                Already have an account? Sign in
              </Link>
            </div>
          </div>
        </div>
      </animated.div>
      <Toaster position="bottom-right" />
    </div>
  );
}