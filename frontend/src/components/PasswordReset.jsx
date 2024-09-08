import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSpring, animated, config } from 'react-spring';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { KeyRound, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const BASE_URL = import.meta.env.VITE_BASE_URL || `http://localhost:${import.meta.env.VITE_ALLOCATED_PORT}`;

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
    </div>
  );
};

export default function PasswordReset() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [step, setStep] = useState('request');
  const [formData, setFormData] = useState({
    email: '',
    dateOfBirth: '',
    resetToken: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const formAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(50px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: config.molasses,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleRequestReset = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/authentication/resetPasswordRequest`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, dateOfBirth: formData.dateOfBirth }),
      });

      if (response.ok) {
        const data = await response.json();
        setFormData(prevData => ({ ...prevData, resetToken: data.resetToken }));
        setStep('reset');
        toast({ description: "Reset request successful. Please set your new password.", duration: 3000 });
      } else {
        toast({ description: "Reset request failed. Please check your information.", variant: "destructive", duration: 3000 });
      }
    } catch (error) {
      toast({ description: "An error occurred. Please try again later.", variant: "destructive", duration: 3000 });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      toast({ description: "Passwords do not match.", variant: "destructive", duration: 3000 });
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/authentication/resetPassword`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          resetToken: formData.resetToken,
          newPassword: formData.newPassword 
        }),
      });

      if (response.ok) {
        toast({ description: "Password reset successful. Redirecting to login...", duration: 3000 });
        setTimeout(() => navigate("/LoginPage"), 2000);
      } else {
        toast({ description: "Password reset failed. Please try again.", variant: "destructive", duration: 3000 });
      }
    } catch (error) {
      toast({ description: "An error occurred. Please try again later.", variant: "destructive", duration: 3000 });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <AnimatedBackground />
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
      <animated.div style={formAnimation} className="w-full max-w-md space-y-8 relative z-10">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              <KeyRound className="inline-block mr-2 h-6 w-6" />
              Password Reset
            </CardTitle>
            <CardDescription className="text-center">
              {step === 'request' ? "Verify your information to reset your password" : "Create a new password"}
            </CardDescription>
          </CardHeader> 
          <CardContent>
            {step === 'request' ? (
              <form onSubmit={handleRequestReset} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    required
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Request Password Reset"}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div>
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    required
                    placeholder="Enter your new password"
                    value={formData.newPassword}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    placeholder="Confirm your new password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Reset Password"}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </animated.div>
      <Toaster position="bottom-right" />
    </div>
  );
}