import { GraphQLClient, RequestOptions } from 'graphql-request';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Mutation = {
  __typename?: 'Mutation';
  addReview: Product;
};


export type MutationAddReviewArgs = {
  productId: Scalars['String']['input'];
  rating: Scalars['Float']['input'];
  text: Scalars['String']['input'];
  userName: Scalars['String']['input'];
};

export type Product = {
  __typename?: 'Product';
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  reviews: Array<Review>;
};

export type Query = {
  __typename?: 'Query';
  product?: Maybe<Product>;
  products: Array<Product>;
};


export type QueryProductArgs = {
  id: Scalars['String']['input'];
};

export type Review = {
  __typename?: 'Review';
  id: Scalars['ID']['output'];
  rating: Scalars['Int']['output'];
  text: Scalars['String']['output'];
  userName: Scalars['String']['output'];
};

export type AddReviewMutationVariables = Exact<{
  productId: Scalars['String']['input'];
  text: Scalars['String']['input'];
  rating: Scalars['Float']['input'];
  userName: Scalars['String']['input'];
}>;


export type AddReviewMutation = { __typename?: 'Mutation', addReview: { __typename?: 'Product', id: string, name: string, description: string, price: number, reviews: Array<{ __typename?: 'Review', id: string, text: string, rating: number, userName: string }> } };

export type ProductByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type ProductByIdQuery = { __typename?: 'Query', product?: { __typename?: 'Product', id: string, name: string, description: string, price: number, reviews: Array<{ __typename?: 'Review', id: string, text: string, rating: number, userName: string }> } | null };

export type GetProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProductsQuery = { __typename?: 'Query', products: Array<{ __typename?: 'Product', id: string, name: string, description: string, price: number }> };


export const AddReviewDocument = gql`
    mutation addReview($productId: String!, $text: String!, $rating: Float!, $userName: String!) {
  addReview(
    productId: $productId
    text: $text
    rating: $rating
    userName: $userName
  ) {
    id
    name
    description
    price
    reviews {
      id
      text
      rating
      userName
    }
  }
}
    `;
export const ProductByIdDocument = gql`
    query productByID($id: String!) {
  product(id: $id) {
    id
    name
    description
    price
    reviews {
      id
      text
      rating
      userName
    }
  }
}
    `;
export const GetProductsDocument = gql`
    query getProducts {
  products {
    id
    name
    description
    price
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    addReview(variables: AddReviewMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<AddReviewMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<AddReviewMutation>(AddReviewDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'addReview', 'mutation', variables);
    },
    productByID(variables: ProductByIdQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<ProductByIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ProductByIdQuery>(ProductByIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'productByID', 'query', variables);
    },
    getProducts(variables?: GetProductsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetProductsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetProductsQuery>(GetProductsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getProducts', 'query', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;