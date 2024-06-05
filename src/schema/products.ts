import { ObjectType, Field, ID, Int } from 'type-graphql';

@ObjectType()
export class Review {
  @Field(() => ID)
  id: string;

  @Field()
  text: string;

  @Field(() => Int)
  rating: number;

  @Field(() => String)
  userId: string;

  @Field(() => String)
  productId: string;

  @Field(() => Int)
  createdAt: number;

  @Field(() => Int)
  updatedAt: number;
}

@ObjectType()
export class Product {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  price: number;

  @Field(() => [Review])
  reviews: Review[];

  @Field(() => Int)
  createdAt: number;

  @Field(() => Int)
  updatedAt: number;
}