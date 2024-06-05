import { queryClient, productByID } from "../../src/api";
import { dehydrate, useQuery } from "react-query";
import { addReview } from "../../src/api";
import { useState } from 'react';
import { Card, Image, Text, Badge, Button, Group, Container, ScrollArea, Rating, Stack, TextInput, List, Paper } from '@mantine/core';



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
    const [textInputError, setTextInputError] = useState(false)
    const [reviewRating, setReviewRating] = useState(1);

    const handleAddReview = async (event) => {
        setTextInputError(false)
        event.preventDefault();
        if(reviewText.length===0){
            setTextInputError(true)
            return
        }
        try {
          const response = await addReview({
            productId:id,
            text:reviewText,
            rating:reviewRating,
            userName:'testUser',
          });
          setReviewText('')
          setReviewRating(1);
          setProduct(response.addReview); // Log the response to the console
        } catch (error) {
          console.error(error); // Log any errors to the console
        }
    };

    return(
        <Container size="xs">
            <Paper shadow="lg" withBorder p="md">
            <h1>{product.name}</h1>
            <Image
                src="https://images.unsplash.com/photo-1622632169740-85c306c57aa2?q=80&w=2873&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                height={200}
                alt="Ethereum"
            />
            <p>Description: {product.description}</p>
            <p>Price: ${product.price}</p>
            <h3>Reviews:</h3>
            <ScrollArea h={160}>
                <List spacing={20}>
                {product.reviews.map((review) => (
                    <List.Item key={review.id}>
                        <Text size="md">{review.userName}: {review.text}</Text>
                        <Rating value={review.rating} />
                    </List.Item>
                ))}
                </List>
            </ScrollArea>
            <Stack
                // h={140}
                bg="var(--mantine-color-body)"
                align="stretch"
                justify="center"
                gap="md"
             >
                <TextInput 
                    value={reviewText} 
                    onChange={(e) => setReviewText(e.target.value)} 
                    placeholder="Add a review"
                    label="Add a review" 
                    description="please describe your experience with the product" 
                    error={textInputError}
                />
                <Rating value={reviewRating} onChange={setReviewRating}/>
                <Button onClick={handleAddReview}>Add Review</Button>   
             </Stack>
            </Paper>
        </Container>
    )
}

export default ProductDetails;