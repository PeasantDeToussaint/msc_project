import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { 
  NavigationMenu, 
  NavigationMenuList, 
  NavigationMenuItem 
} from './ui/navigation-menu';
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator 
} from './ui/dropdown-menu';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '../context/authContext';

function ChevronDownIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export default function Navigation() {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [password, setPassword] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleDropdownToggle = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleDropdownClose = () => {
    setDropdownOpen(false);
  };

  const handleLogout = () => {
    logout();
    toast({
      title: 'Signed out',
      description: 'You have successfully signed out.',
    });
  };

  const handlePasswordSubmit = async () => {
    const response = await fetch('http://localhost:3000/admin/validate-admin-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password }),
    });
  
    if (response.ok) {
      toast({
        title: 'Access granted',
        description: 'You have successfully logged in as admin.',
      });
      navigate('/ManageTestbank');
    } else {
      toast({
        title: 'Invalid password',
        description: 'Please try again.',
      });
    }
    setShowPasswordPrompt(false);
  };
  
  return (
    <header className="flex h-16 w-full items-center bg-white px-4 md:px-6">
      <div className="flex items-center gap-2">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-lg font-bold">Yasiman IELTS Prep</span>
        </Link>
        <nav className="flex lg:flex ml-4">
          <NavigationMenu>
            <Toaster />
            <NavigationMenuList className="flex items-center">
              <NavigationMenuItem>
                <Link
                  to="/about"
                  className="group inline-flex h-full items-center px-4 text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground focus:bg-muted focus:text-muted-foreground focus:outline-none cursor-pointer disabled:pointer-events-none disabled:opacity-50"
                >
                  About IELTS
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link
                  to="/WritingPracticeIntro"
                  className="group inline-flex h-full items-center px-4 text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground focus:bg-muted focus:text-muted-foreground focus:outline-none cursor-pointer disabled:pointer-events-none disabled:opacity-50"
                >
                  Practice Writing
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link
                  to="/SpeakingPracticeIntro"
                  className="group inline-flex h-full items-center px-4 text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground focus:bg-muted focus:text-muted-foreground focus:outline-none cursor-pointer disabled:pointer-events-none disabled:opacity-50"
                >
                  Practice Speaking
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link
                  to="/VocabularyStatistics"
                  className="group inline-flex h-full items-center px-4 text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground focus:bg-muted focus:text-muted-foreground focus:outline-none cursor-pointer disabled:pointer-events-none disabled:opacity-50"
                >
                  Vocabulary Statistics
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link
                  to="/contact"
                  className="group inline-flex h-full items-center px-4 text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground focus:bg-muted focus:text-muted-foreground focus:outline-none cursor-pointer disabled:pointer-events-none disabled:opacity-50"
                >
                  Contact
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>
      </div>
      <div className="ml-auto">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="cursor-pointer">
              <Avatar className="h-9 w-9">
                <AvatarImage src={user?.avatarUrl || '/placeholder-user.jpg'} />
                <AvatarFallback>{user?.initials}</AvatarFallback>
                <span className="sr-only">Toggle user menu</span>
              </Avatar>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            onCloseAutoFocus={handleDropdownClose}
            className="bg-white border border-gray-300 rounded-md shadow-lg p-4 min-w-[200px]"
          >
            <div className="flex items-center gap-2 mb-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={user?.avatarUrl || '/placeholder-user.jpg'} />
                <AvatarFallback>{user?.initials}</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="text-lg font-bold">{user?.name}</h4>
                <span className="text-sm text-gray-500">{user?.status}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <Link to="/UserPage" className="hover:bg-gray-100 flex flex-col items-center cursor-pointer">
              <DropdownMenuItem>
                  <span className="text-center cursor-pointer">My User Page</span>
              </DropdownMenuItem>
              </Link>
              <DropdownMenuItem onSelect={() => setShowPasswordPrompt(true)} className="hover:bg-gray-100 flex flex-col items-center cursor-pointer">
                <span className="text-center">Manage Testbank(Admin)</span>
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={handleLogout} className="hover:bg-gray-100 flex items-center cursor-pointer">
              <span className="ml-2">Sign out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Dialog open={showPasswordPrompt} onOpenChange={setShowPasswordPrompt}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Enter Admin Password</DialogTitle>
            <DialogDescription>
              Please enter the admin password to manage the database.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPasswordPrompt(false)}>Cancel</Button>
            <Button onClick={handlePasswordSubmit}>Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </header>
  );
}
