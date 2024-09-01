import { PanelLeft, Home, ShoppingCart, Package, Search } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Sheet, SheetTrigger, SheetContent } from '../ui/sheet';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem
} from '../ui/dropdown-menu';
import { AvatarIcon } from '@radix-ui/react-icons';

const DashboardHeader: React.FC = () => {
  return (
    <header className='sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6'>
      <Sheet>
        <SheetTrigger asChild>
          <Button size='icon' variant='outline' className='sm:hidden'>
            <PanelLeft className='h-5 w-5' />
            <span className='sr-only'>Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side='left' className='sm:max-w-xs'>
          <nav className='grid gap-6 text-lg font-medium'>
            <Link
              to='/products'
              className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
            >
              <Home className='h-5 w-5' />
              Products
            </Link>
            <Link
              to='/cart'
              className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
            >
              <ShoppingCart className='h-5 w-5' />
              Cart
            </Link>
            <Link
              to='/orders'
              className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
            >
              <Package className='h-5 w-5' />
              Order
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div className='relative ml-auto flex-1 md:grow-0'>
        <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
        <Input
          type='search'
          placeholder='Search...'
          className='w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]'
        />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='outline'
            size='icon'
            className='overflow-hidden rounded-full'
          >
            <AvatarIcon width={30} height={30} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default DashboardHeader;
