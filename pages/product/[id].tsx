import { queryClient, productByID } from "../../src/api";
import {dehydrate, useQuery } from "react-query";
import { useState } from 'react';

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
    const { data } = useQuery("product", ()=>productByID({id:id}))
    const [reviewText, setReviewText] = useState('');
    const [reviewRating, setReviewRating] = useState(0);
    return(
        <div>
            <h1>{data?.product.name}</h1>
            <p>{data?.product.description}</p>
            <p>{data?.product.price}</p>
            <div>
                {data?.product.reviews.map((review) => (
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
            </div>
        </div>
    )
}

export default ProductDetails;