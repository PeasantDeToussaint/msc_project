import React from 'react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@radix-ui/react-dropdown-menu';
import {Link} from 'react-router-dom';

function Sidebar() {
  const buttonClass =
    "w-full bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow text-start";

  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-gray-800 text-white flex flex-col justify-between p-4 border-r border-gray-300">
      <div>
        <div className="flex items-center mb-6">
          <span className="font-bold">Welcome to the testing page!</span>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger className={buttonClass}>
            Practice Questions
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white border border-gray-400 rounded shadow">
          <Link to="/reading-practice">
            <DropdownMenuItem className={buttonClass}>
              Reading Practice
            </DropdownMenuItem>
            </Link>
            <Link to="/listening-practice">
            <DropdownMenuItem className={buttonClass}>
              Listening Practice
            </DropdownMenuItem>
            </Link>
            <Link to="/speaking-practice">
            <DropdownMenuItem className={buttonClass}>
              Speaking Practice
            </DropdownMenuItem>
            </Link>
            <Link to="/speaking-practice">
            <DropdownMenuItem className={buttonClass}>
              Writing Practice
            </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="mt-4 space-y-4">
          <Link to="/exam-simulation" className="block">
            <button className={buttonClass}>Exam Simulation</button>
          </Link>
          <Link to="/about" className="block">
            <button className={buttonClass}>About IELTS</button>
          </Link>
          <Link to="/user-ranking" className="block">
            <button className={buttonClass}>User Ranking</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
