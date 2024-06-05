import Head from 'next/head';
import styles from '../styles/Home.module.css';
import {dehydrate, useQuery} from "react-query"
import {queryClient, getProducts} from "../src/api";

export async function getServerSideProps() {
    await queryClient.prefetchQuery('products', ()=>getProducts())
    return {props: {dehydratedState: dehydrate(queryClient)}}
}

const Home: React.FC = () => {
  const {data} = useQuery(["products"], () => getProducts());
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div>
          <h1>Products</h1>
          <ul>
            {data?.products.map((product) => (
              <li key={product.id}>
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p>{product.price}</p>
              </li>
            ))}
          </ul>
        </div>
      </main>

      <footer>
        
      </footer>
    </div>
    )
};

export default Home;