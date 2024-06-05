import { Resolver, Query, Mutation, Arg, Ctx } from 'type-graphql';
import { Product, Review } from './products';
import Products from './products.json';
// import { Context } from '../context';

@Resolver(Product)
export class ProductResolver {
  @Query(() => [Product])
  products(): Product[] {
    // Fetch products from the database
    return Products;
  }

//   @Query(() => Product, { nullable: true })
//   async product(@Arg('id') id: string): Promise<Product | null> {
//     // Fetch a product by ID from the database
//   }

//   @Mutation(() => Product)
//   async createProduct(
//     @Arg('name') name: string,
//     @Arg('description') description: string,
//     @Arg('price') price: number,
//     @Ctx() ctx: Context
//   ): Promise<Product> {
//     // Create a new product in the database
//   }

//   @Mutation(() => Review)
//   async createReview(
//     @Arg('productId') productId: string,
//     @Arg('text') text: string,
//     @Arg('rating') rating: number,
//     @Ctx() ctx: Context
//   ): Promise<Review> {
//     // Create a new review for a product in the database
//   }
}