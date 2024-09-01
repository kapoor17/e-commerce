import { Label } from '@/components/ui/label';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

export default function Component() {
  return (
    <div className='grid md:grid-cols-2 items-start max-w-3xl px-4 mx-auto py-6 gap-6 md:gap-12'>
      <div className='grid gap-4 items-start'>
        <div className='flex items-start'>
          <div className='grid gap-4'>
            <h1 className='font-bold text-2xl sm:text-3xl'>
              Acme Prism T-Shirt: The Modern Blend of Style and Comfort
            </h1>
            <div>
              <p>60% combed ringspun cotton/40% polyester jersey tee.</p>
            </div>
            <div className='flex items-center gap-4'>
              <div className='flex items-center gap-0.5'>
                <StarIcon className='w-5 h-5 fill-primary' />
                <StarIcon className='w-5 h-5 fill-primary' />
                <StarIcon className='w-5 h-5 fill-primary' />
                <StarIcon className='w-5 h-5 fill-muted stroke-muted-foreground' />
                <StarIcon className='w-5 h-5 fill-muted stroke-muted-foreground' />
              </div>
            </div>
          </div>
          <div className='text-4xl font-bold ml-auto'>$99</div>
        </div>
        <form className='grid gap-4 md:gap-10'>
          <div className='grid gap-2'>
            <Label htmlFor='quantity' className='text-base'>
              Quantity
            </Label>
            <Select defaultValue='1'>
              <SelectTrigger className='w-24'>
                <SelectValue placeholder='Select' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='1'>1</SelectItem>
                <SelectItem value='2'>2</SelectItem>
                <SelectItem value='3'>3</SelectItem>
                <SelectItem value='4'>4</SelectItem>
                <SelectItem value='5'>5</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button size='lg'>Add to cart</Button>
        </form>
      </div>
      <div className='grid gap-3 items-start'>
        <div className='grid gap-4 md:gap-10'>
          <img
            src='/placeholder.svg'
            alt='Product Image'
            width={600}
            height={600}
            className='aspect-square object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800'
          />
        </div>
      </div>
    </div>
  );
}

function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
    </svg>
  );
}
