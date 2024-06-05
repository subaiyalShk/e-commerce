import { queryClient, productByID } from "../../src/api";
import { dehydrate, useQuery } from "react-query";
import { addReview } from "../../src/api";
import { useState } from 'react';
import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';

export async function getServerSideProps({params}) {
    await queryClient.prefetchQuery('product', ()=>
        productByID({id: params.id})
    );
    return{
        props:{
            id:params.id,
            dehydratedState: dehydrate(queryClient)
        }
    }
}

const ProductDetails: React.FunctionComponent<{
    id: string;
}> = ({id}) => {
    const {data} = useQuery("product", ()=>productByID({id:id}))
    const [product,setProduct] = useState(data?.product)
    const [reviewText, setReviewText] = useState('');
    const [reviewRating, setReviewRating] = useState(0);

    const handleAddReview = async (event) => {
        event.preventDefault();

        try {
          const response = await addReview({
            productId:id,
            text:reviewText,
            rating:reviewRating,
            userName:'testUser',
          });
    
          setProduct(response.addReview); // Log the response to the console
        } catch (error) {
          console.error(error); // Log any errors to the console
        }
    };

    return(
        <div>
            <h1>{product.name}</h1>
            <Image
                src="https://images.unsplash.com/photo-1622632169740-85c306c57aa2?q=80&w=2873&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                height={200}
                alt="Ethereum"
            />
            <p>{product.description}</p>
            <p>{product.price}</p>
            <div>
                {product.reviews.map((review) => (
                    <div key={review.id}>
                        <p>{review.text}</p>
                        <p>{review.rating}</p>
                    </div>
                ))}
            </div>
            <div>
                <input 
                    type="text" 
                    value={reviewText} 
                    onChange={(e) => setReviewText(e.target.value)} 
                    placeholder="Add a review"
                />
                <select 
                    value={reviewRating} 
                    onChange={(e) => setReviewRating(Number(e.target.value))}
                >
                    {[...Array(6).keys()].map((value) => (
                        <option key={value} value={value}>{value}</option>
                    ))}
                </select>
                <button onClick={handleAddReview}>Add Review</button>
            </div>
        </div>
    )
}

export default ProductDetails;