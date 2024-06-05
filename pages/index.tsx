import Head from 'next/head';
import styles from '../styles/Home.module.css';
import {dehydrate, useQuery} from "react-query"
import {queryClient, getProducts} from "../src/api";
import ProductCard from '../components/ProductCard';
import { Container } from '@mantine/core';

export async function getServerSideProps() {
    await queryClient.prefetchQuery('products', ()=>getProducts())
    return {props: {dehydratedState: dehydrate(queryClient)}}
}

const Home: React.FC = () => {
  const {data} = useQuery(["products"], () => getProducts());
  return (
    <Container size="md">
      <Head>
        <title>E-Commerce</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div>
          <h1>Products</h1>
          <ul id='product-list'>
            {data?.products.map((product) => (
              <li key={product.id}>
                <ProductCard product={product}/>
              </li>
            ))}
          </ul>
        </div>
      </main>

      <footer>
        
      </footer>
    </Container>
    )
};

export default Home;