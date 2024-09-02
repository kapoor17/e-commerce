import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from '@/components/ui/card';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from '@/components/ui/table';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import services from '@/services/product.route';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Else, If, Then } from '@/components/utility/conditionals';
import { Search } from 'lucide-react';

const Catalog: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const { data: allProducts = [] } = useQuery({
    queryFn: () => services.getAll({ name: debouncedSearchTerm }),
    select: (data) => data.data.products,
    queryKey: ['products', 'getAll', debouncedSearchTerm]
  });

  return (
    <Tabs defaultValue='all'>
      <TabsContent value='all'>
        <Card x-chunk='dashboard-06-chunk-0'>
          <CardHeader>
            <CardTitle>Products</CardTitle>
            <CardDescription>
              Browse and add products to your cart
            </CardDescription>
            <div className='relative ml-auto flex-1 md:grow-0'>
              <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
              <Input
                type='text'
                placeholder='Search by name'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]'
              />
            </div>
          </CardHeader>
          <CardContent>
            <If condition={allProducts.length > 0}>
              <Then>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className='hidden w-[100px] sm:table-cell'>
                        <span className='sr-only'>img</span>
                      </TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead className='hidden md:table-cell'>
                        Inventory
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {allProducts.map((product) => {
                      return (
                        <TableRow>
                          <TableCell className='hidden sm:table-cell'>
                            <img
                              alt='Product image'
                              className='aspect-square rounded-md object-cover'
                              height='64'
                              src={product.image}
                              width='64'
                            />
                          </TableCell>
                          <TableCell
                            className='font-medium cursor-pointer'
                            onClick={() => navigate(`/products/${product.id}`)}
                          >
                            {product.name}
                          </TableCell>
                          <TableCell>{product.price}</TableCell>
                          <TableCell className='hidden md:table-cell'>
                            {product.inventory}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </Then>
              <Else>
                <div className='text-center text-md'>No products found</div>
              </Else>
            </If>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default Catalog;
