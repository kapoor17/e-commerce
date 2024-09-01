import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
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
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import services from '@/services/product.route';
import { Skeleton } from '@/components/ui/skeleton';
import { useNavigate } from 'react-router-dom';

const Catalog: React.FC = () => {
  const navigate = useNavigate();
  const {
    data: allProducts = [],
    isFetching,
    isError
  } = useQuery({
    queryFn: () => services.getAll(),
    select: (data) => data.data.products,
    queryKey: ['products', 'getAll']
  });

  return (
    <Tabs defaultValue='all'>
      <Skeleton isLoading={isFetching} isError={isError}>
        <TabsContent value='all'>
          <Card x-chunk='dashboard-06-chunk-0'>
            <CardHeader>
              <CardTitle>Products</CardTitle>
              <CardDescription>
                Browse and add products to your cart
              </CardDescription>
            </CardHeader>
            <CardContent>
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
            </CardContent>
            <CardFooter>
              <div className='text-xs text-muted-foreground'>
                Showing <strong>1-10</strong> of <strong>32</strong> products
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Skeleton>
    </Tabs>
  );
};

export default Catalog;
