import clsx from 'clsx';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider
} from '../ui/tooltip';
import { Package2, ShoppingCart, Package, ListOrdered } from 'lucide-react';
import React from 'react';
import { NavLink } from 'react-router-dom';

const DashboardSidebar: React.FC = () => {
  return (
    <aside className='fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex'>
      <nav className='flex flex-col items-center gap-4 px-2 py-4'>
        <NavLink
          to='#'
          className='group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base'
        >
          <Package2 className='h-4 w-4 transition-all group-hover:scale-110' />
          <span className='sr-only'>Acme Inc</span>
        </NavLink>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <NavLink
                to='/products'
                className={({ isActive }) =>
                  clsx(
                    'group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full text-lg font-semibold md:h-8 md:w-8 md:text-base',
                    isActive && 'bg-accent text-primary-foreground'
                  )
                }
              >
                <Package className='h-5 w-5' />
                <span className='sr-only'>Products</span>
              </NavLink>
            </TooltipTrigger>
            <TooltipContent side='right'>Products</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <NavLink
                to='/cart'
                className={({ isActive }) =>
                  clsx(
                    'group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full text-lg font-semibold md:h-8 md:w-8 md:text-base',
                    isActive && 'bg-accent text-primary-foreground'
                  )
                }
              >
                <ShoppingCart className='h-5 w-5' />
                <span className='sr-only'>Cart</span>
              </NavLink>
            </TooltipTrigger>
            <TooltipContent side='right'>Cart</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <NavLink
                to='/orders'
                className={({ isActive }) =>
                  clsx(
                    'group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full text-lg font-semibold md:h-8 md:w-8 md:text-base',
                    isActive && 'bg-accent text-primary-foreground'
                  )
                }
              >
                <ListOrdered className='h-5 w-5' />
                <span className='sr-only'>Orders</span>
              </NavLink>
            </TooltipTrigger>
            <TooltipContent side='right'>Orders</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </aside>
  );
};

export default DashboardSidebar;
