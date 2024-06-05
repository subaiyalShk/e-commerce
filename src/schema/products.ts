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
  userName: string;

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

}