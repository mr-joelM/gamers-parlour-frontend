import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import { useParams } from "react-router-dom"; 
import "../css/all.css";
import filigree from"../css/filigree.png";
import Spinner from './Spinner';
import axios from 'axios';

const Reviews = () => {
    const [reviews, setReviews] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [page, setPage] = useState(1)
    const { category } = useParams();

    const getReviews = async () => {
        const { data } = await axios.get('https://gamers-parlour.herokuapp.com/api/reviews',{
            params:{ category , page}
        })
        return data
    }

    useEffect(()=>{
        setIsLoading(true)
        window.scrollTo(0, 0)
        getReviews()
        .then((data)=>{
            setReviews(data.reviews)
            setIsLoading(false)
        })
    },[page])

    if(isLoading)return <Spinner />

    return (
        <div className="reviews">
            <h2>{category ? `Reviews by category: ${category}`:'All Reviews'}</h2>
            <ul>
                {reviews.map((review)=>{
                    return(
                        <li key={review.review_id}>
                            <div className="all-reviews-list" key={review.review_id}>
                                <h3 ><Link to ={`/review/${review.review_id}`}className="link">{review.title}  </Link></h3>
                                <h4>Review Owner: {review.owner}</h4>
                                <h4>Category: {review.category}</h4>
                                <img className='review_list_img' src={review.review_img_url} alt={review.title} />
                            </div>
                            <img className='filigree_img' src={filigree} alt="decorative filigree"/>
                        </li>
                    )
                })}
            </ul>
            <section className="page_button">
                <button disabled={page === 1} onClick={() => setPage((cPage)=> cPage -1)}>{'<'} </button>
                     Page:{page} 
                <button onClick={() => setPage((cPage)=> cPage +1)}> {'>'}</button>
            </section>
        </div>
    );
};

export default Reviews;

