import React, { useRef, useState, useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Star, ShoppingCartCheckout } from "@mui/icons-material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import styled from "styled-components";


// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "./styles.css";
// import required modules
import { Link } from "react-router-dom";
import { addProduct, toastAddedCart } from "../redux/cartRedux";
import { useDispatch } from "react-redux";
const Produc = styled.div`
    display: flex;
    border: 1px solid lightgrey;
    margin:10px;
    height:40vh;
`;



const BookDetail = styled.div`
    margin-top:20px;
    width:25vh;
`;
const Image = styled.img`
    width:200px;
`;
const BookTitle = styled.h5`
    color:#333533;
    padding:3px;
    font-weight:500;
`;
const Author = styled.h5`
    color:#787878;
    font-weight:400;
    font-size:15px;
    padding:3px;

`;
const Subtitle = styled.h3`
    font-weight:300;
    color:#333533;

`
const Stars = styled.div`
   margin-top:10px;
`;

const BookPrice = styled.h4`
    margin-top:13px;

`;


const RightBar = styled.div`
    padding:10px;
`;
const Flag = styled.div`
`;
const New = styled.h5`
    padding:5px;
    color:white;
    background-color:black;
    border-radius:5px;

`
const Discount = styled.h5`
    margin-top:5px;
    color:white;
    background-color:#D22129;
    padding:5px;
    border-radius:5px;
`;

const AddtoCartButton = styled.button`
    display:flex;
    align-items:center;
    justify-content:center;
    margin-top:30px;
    padding:5px;
    background-color: #5adbb5;
    border:none;
    cursor: pointer;
    border-radius:3px;
`;





function Product({ item }) {
    const dispatch = useDispatch();
    const quantity = 1;

    const handleClick = () => {
        dispatch(addProduct({ ...item, quantity }));
        dispatch(toastAddedCart());

    }

    return (
        <>

            <Produc >
                <Image src={item.image} />
                <BookDetail >
                    <Link to={`/product/${item._id}`} style={{ textDecoration: "none", color: "black" }}>
                        <BookTitle>{item.title.slice(0, 20) + '...'}</BookTitle>
                    </Link>
                    <Stars>
                        <Star />
                        <Star />
                        <Star />
                        <Star />
                        <Star />
                    </Stars>
                    <BookPrice>${item.price}</BookPrice>
                    <AddtoCartButton onClick={handleClick}><ShoppingCartIcon /><b>Add To Cart</b></AddtoCartButton>
                </BookDetail>
                <RightBar>
                    <Flag>
                        <New>New</New>
                        {item.discount ? (<Discount>{item.discount}</Discount>) : ""}

                    </Flag>
                </RightBar>
            </Produc>
        </>
    )
}

export default Product