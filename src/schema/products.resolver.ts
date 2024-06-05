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

    @Query(() => Product, {nullable: true})
    product(@Arg("id", ()=>String) id: String): Product | undefined {
        const product = Products.find((product) => product.id === id)
        if (product === undefined) {
            throw new Error("product not found")
        }
        return product
    
    }

}