import React from 'react'
import Navbar from '../components/Navbar'
import styled from "styled-components";
import { Add, Remove } from '@mui/icons-material';
import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";

const Container = styled.div`
    margin-top:100px;
    height:60vh;
`;

const Wrapper = styled.div`
    display:flex;
    justify-content: center;
    align-items:center;
`;
const Left = styled.div``;
const Image = styled.img`
    height:50vh;
    border:5px;
  ${mobile({ height: "40vh" })}

`
const Right = styled.div`

`;
const Buttons = styled.div`
    display:flex;
    margin-top:20px;
    flex-direction:column;
    
`;
const Quantity = styled.div`
    display:flex;
    border-radius:5px;
    border:1px solid lightgray;
    width:30vh;
    text-align:center;
    justify-content:space-around;
    align-items:center;
    padding-left:7px;
    padding-Right:7px;
    padding-top:7px;
    padding-Bottom:7px;
    margin-right:20px;
`;
const AddToCart = styled.button`
    margin-top:10px;
    padding:7px;
    background-color:transparent;
    border:1px solid black;
    cursor:pointer;
    width:33vh;
    color:black;
    border-radius:5px;
    font-size:18px;
    transition:all 0.2s ease;
    &:hover{
        background-color:black;
        color:white;
    }

`;
const Title = styled.h3`    
    font-weight:400;
    color:#333533;
  ${mobile({ fontSize: "20px" })}

`;

const Price = styled.h2`
    margin-top:20px;
    font-weight:300;
    color:#333533;
  ${mobile({ fontSize: "20px" })}

`;


const Number = styled.h4`
    color:#333533;
`;


function SingleProduct() {
    const [quantity, setQuantity] = useState(1);
    const location = useLocation();
    const id = location.pathname.split('/')[2];
    const [SingleBook, setSingleBook] = useState([]);
    const dispatch = useDispatch();

    const handleQuantity = (type) => {
        if (type === "dec") {
            quantity > 1 && setQuantity(quantity - 1);
        } else {
            setQuantity(quantity + 1);
        }
    };
    useEffect(() => {
        const getSingleBook = async () => {
            const res = await axios.get(`http://localhost:5000/api/products/find/${id}`);
            setSingleBook(res.data);
        }
        getSingleBook();
    }, [id])

    const handleClick = () => {
        dispatch(addProduct({ ...SingleBook, quantity }));
    }

    return (
        <div>
            <Navbar />
            <Container>
                <Wrapper>
                    <Left>
                        <Image src={SingleBook.image} />
                    </Left>
                    <Right>
                        <Title>{SingleBook.title}</Title>
                        <Price>${SingleBook.price}</Price>
                        <Buttons>
                            <Quantity>
                                <Remove style={{ paddingLeft: "5px", color: "#333533" }} onClick={() => handleQuantity("dec")} /><Number>{quantity}</Number> <Add style={{ paddingRight: "5px", color: "#333533" }} onClick={() => handleQuantity("inc")} />
                            </Quantity><AddToCart onClick={handleClick}>Add to cart</AddToCart>
                        </Buttons>
                    </Right>
                </Wrapper>
            </Container>
            <Footer />
        </div>
    )
}

export default SingleProduct