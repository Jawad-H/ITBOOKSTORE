import React from 'react'
import Navbar from '../components/Navbar'
import styled from "styled-components";
import { Add, Remove } from '@mui/icons-material';
import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { mobile } from "../responsive";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { useHistory } from "react-router";
import { publicRequest } from "../requestMethods";

import {
    updateProductDec,
    updateProductInc,
    removeProduct,
    emptyCart,
} from '../redux/cartRedux';
import { Link } from "react-router-dom";



const KEY = process.env.REACT_APP_STRIPE;

const Container = styled.div`
    margin-top:100px;
    display: flex;
    ${mobile({ flexDirection: "column" })}

    padding:20px;

`;

const Wrapper = styled.div`
    display:flex;
    
`;
const Left = styled.div``;
const Image = styled.img`
    height:20vh;
    padding:5px;
  ${mobile({ height: "40vh" })}

`
const Right = styled.div`
    display:flex;
    justify-content:space-evenly;
  ${mobile({ flexDirection: "column" })}

    
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
    font-weight:300;
    color:#333533;
    padding:5px;
    margin-top:20px;
    margin-right:20px;
`;

const Price = styled.h3`
    font-weight:300;
    color:#333533;
    margin-top:20px;
  ${mobile({ marginTop: "0vh" })}

    padding:5px;
    margin-right:20px;
`;

const Number = styled.h4`
    color:#333533;
`;
const RemoveButton = styled.button`
    font-weight:300;
    height:5vh;
    color:#333533;
    margin-top:20px;
    margin-right:20px;
    border:1px solid #E94560;
    background-color:transparent;
    color:#E94560;
    border-radius:3px;
    padding:3px;
    cursor:pointer;
`
const Order = styled.div`
    padding:20px;
    background-color:#F6F6F6;
    flex: 1;
    border-radius:20px;
    width:20vw;
    height:55vh;
  ${mobile({ width: "80vw", marginTop: "50px" })}
    

`;
const OrderTitle = styled.h3`
    text-align:center;
`;

const SubTotal = styled.div`
    margin-top:30px;
    display:flex;
    justify-content:space-between;
`;

const SubTitle = styled.h4`
   text-align:left;

`;
const SubPrice = styled.h4`
   text-align:right;

`;
const Button = styled.button`
    display:flex;
    align-items: center;
    justify-content: center;
    margin-top:10px;
    padding:7px;
    background-color:transparent;
    border:1px solid black;
    width:20vw;
    cursor:pointer;
    color:black;
    font-size:18px;
    border-radius:5px;
    transition:all 0.2s ease;
    &:hover{
        background-color:black;
        color:white;
    }
  ${mobile({ width: "80vw", marginTop: "10px" })}

`;

const Products = styled.div`
    display:flex;
    flex-direction:column;
`

const CheckOut = styled.div`
    margin-top:100px;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

`;
function Cart() {
    const [quantity, setQuantity] = useState(1);
    const cart = useSelector((state) => state.cart);
    const user = useSelector((state) => state.user?.currentUser);
    const [stripeToken, setStripeToken] = useState(null);
    const history = useHistory();
    const total = (cart.total).toFixed(2) * 100;
    const onToken = (token) => {
        setStripeToken(token);
    };

    useEffect(() => {
        const makeRequest = async () => {
            try {
                const res = await publicRequest.post("/checkout/payment", {
                    tokenId: stripeToken.id,
                    amount: total.toFixed(0),
                });
                history.push("/success", {
                    stripeData: res.data,
                    cart: cart,
                });
            } catch { }
        };
        stripeToken && makeRequest();
    }, [stripeToken, cart.total, history]);
    const dispatch = useDispatch();




    const handleRemove = (index, quantity) => {
        dispatch(removeProduct({ index: index, quantity: quantity }));
    }


    const handleQuantity = (type, info) => {
        if (type === 'dec') {
            if (info.qtt === 1) {
                dispatch(removeProduct({ index: info.index, quantity: info.qtt }));
            } else {
                dispatch(
                    updateProductDec({
                        index: info.index,
                    })
                );
            }
        } else {
            dispatch(
                updateProductInc({
                    index: info.index,
                })
            );
        }
    };






    return (
        <div>
            <Navbar />
            <Container>

                <Products>
                    {cart.products?.map((product, index) => {
                        return (
                            <Wrapper key={product._id}>
                                <Left>
                                    <Image src={product.image} />
                                </Left>
                                <Right>
                                    <Title>{product.title.slice(0, 17) + "..."}</Title>
                                    <Buttons>
                                        <Quantity>
                                            <Remove
                                                style={{ paddingLeft: "5px", color: "#333533" }}
                                                onClick={() =>
                                                    handleQuantity('dec', {
                                                        index,
                                                        qtt: product.quantity,
                                                    })
                                                } />
                                            <Number>{product.quantity}</Number>
                                            <Add style={{ paddingRight: "5px", color: "#333533" }}
                                                onClick={() =>
                                                    handleQuantity('inc', {
                                                        index,
                                                        qtt: product.quantity,
                                                    })
                                                } />
                                        </Quantity>
                                    </Buttons>
                                    <Price>$ {(product?.price * product?.quantity)?.toFixed(2)}</Price>
                                    <RemoveButton onClick={() => handleRemove(index, product.quantity)}>Remove</RemoveButton>
                                </Right>
                            </Wrapper>
                        )
                    })}
                </Products>
                <Order>
                    <OrderTitle>Order Summary</OrderTitle>
                    <SubTotal>
                        <SubTitle>Sub-Total</SubTitle>
                        <SubPrice>$12.00</SubPrice>
                    </SubTotal>
                    <SubTotal>
                        <SubTitle>Total</SubTitle>
                        <SubPrice>${(cart?.total)?.toFixed(2)}</SubPrice>
                    </SubTotal>

                    <CheckOut>
                        {user ? (<StripeCheckout
                            name="ITBOOK Shop"
                            // image="https://avatars.githubusercontent.com/u/1486366?v=4"
                            billingAddress
                            shippingAddress
                            description={`Your total is $${(cart.total).toFixed(2)}`}
                            amount={cart.total * 100}
                            token={onToken}
                            stripeKey={KEY}
                        >
                            <Button> checkout now</Button>
                        </StripeCheckout>) :
                            <Link to="/login" style={{ textDecoration: "none", color: "black" }}>
                                <Button> Sign in to Proceed</Button>
                            </Link>
                        }


                        <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                            <Button><ArrowBackIcon />continue shopping </Button>
                        </Link>
                    </CheckOut>
                </Order>

            </Container>
            <Footer />
        </div>
    )
}

export default Cart;