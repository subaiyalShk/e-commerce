import { Resolver, Query, Mutation, Arg, Ctx } from 'type-graphql';
import { Product, Review } from './products';
import Products from './products.json';
// import { Context } from '../context';

@Resolver(Product)
export class ProductResolver {
    @Mutation(() => Product) // Change the return type to Product
    async addReview(
        @Arg("productId", () => String) productId: string,
        @Arg("text", () => String) text: string,
        @Arg("rating", () => Number) rating: number,
        @Arg("userName", () => String) userName: string,
    ): Promise<Product> { // Change the return type to Product
        const product = Products.find((product) => product.id === productId);
        if (!product) {
            throw new Error("Product not found");
        }

        const review: Review = {
            id: Math.random().toString(), // Generate a random id for the review
            text,
            rating,
            userName
        };

        product.reviews.push(review);

        // Save the updated product to the database
        // This is a simplified example and might not work depending on your actual database setup
        const productIndex = Products.findIndex((p) => p.id === productId);
        Products[productIndex] = product;

        return product; // Return the updated product
    }

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