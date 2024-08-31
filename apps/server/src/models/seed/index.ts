import ProductService from '../../services/product.service';
import Products from './product.json';

const seed = async () => {
  try {
    for (const product of Products) {
      await ProductService.createOne(product);
    }
    console.log('Seeding completed successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
  }
};

seed();
