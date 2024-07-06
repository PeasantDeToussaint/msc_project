import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  NavigationMenu, 
  NavigationMenuList, 
  NavigationMenuItem, 
  NavigationMenuLink 
} from './ui/navigation-menu';
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator 
} from './ui/dropdown-menu';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';

function BookIcon(props) {
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
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  );
}

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

export default function Navigation({ isAuthenticated, setIsAuthenticated }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleDropdownToggle = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleDropdownClose = () => {
    setDropdownOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate("/LoginPage");
  };

  return (
    <header className="flex h-16 w-full items-center bg-white px-4 md:px-6">
      <div className="flex items-center gap-2">
        <Link to="/" className="flex items-center gap-2">
       
          <span className="text-lg font-bold">Yasiman IELTS Prep</span>
        </Link>
        <nav className="flex lg:flex ml-4">
          <NavigationMenu>
            <NavigationMenuList className="flex items-center">
              <NavigationMenuItem>
                <Link
                  to="/about"
                  className="group inline-flex h-full items-center px-4 text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground focus:bg-muted focus:text-muted-foreground focus:outline-none cursor-pointer disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-muted/50 data-[state=open]:bg-muted/50"
                >
                  About IELTS
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
                  <DropdownMenuTrigger className="group inline-flex h-full items-center px-4 text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground focus:bg-muted focus:text-muted-foreground focus:outline-none cursor-pointer disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-muted/50 data-[state=open]:bg-muted/50">
                    Practice
                    <ChevronDownIcon className="h-4 w-4 ml-2" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" onCloseAutoFocus={handleDropdownClose}>
                    <DropdownMenuItem as={Link} to="/reading-practice" onSelect={handleDropdownClose}>
                      Reading
                    </DropdownMenuItem>
                    <DropdownMenuItem as={Link} to="/writing-practice" onSelect={handleDropdownClose}>
                      Writing
                    </DropdownMenuItem>
                    <DropdownMenuItem as={Link} to="/listening-practice" onSelect={handleDropdownClose}>
                      Listening
                    </DropdownMenuItem>
                    <DropdownMenuItem as={Link} to="/speaking-practice" onSelect={handleDropdownClose}>
                      Speaking
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link
                  to="/full-length-tests"
                  className="group inline-flex h-full items-center px-4 text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground focus:bg-muted focus:text-muted-foreground focus:outline-none cursor-pointer disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-muted/50 data-[state=open]:bg-muted/50"
                >
                  Full-length Tests
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link
                  to="/resources"
                  className="group inline-flex h-full items-center px-4 text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground focus:bg-muted focus:text-muted-foreground focus:outline-none cursor-pointer disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-muted/50 data-[state=open]:bg-muted/50"
                >
                  Resources
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link
                  to="/contact"
                  className="group inline-flex h-full items-center px-4 text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground focus:bg-muted focus:text-muted-foreground focus:outline-none cursor-pointer disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-muted/50 data-[state=open]:bg-muted/50"
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
            <Avatar className="h-9 w-9">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>LY</AvatarFallback>
              <span className="sr-only">Toggle user menu</span>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" onCloseAutoFocus={handleDropdownClose}>
            <DropdownMenuItem as={Link} to="/profile" onSelect={handleDropdownClose}>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4" />
                <span>Profile</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={handleLogout}>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4" />
                <span>Logout</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
