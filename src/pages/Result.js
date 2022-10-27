import React from 'react'
import Navbar from '../components/Navbar'
import styled from "styled-components";
import Footer from '../components/Footer';
import { Star } from "@mui/icons-material";
import SendIcon from '@mui/icons-material/Send';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { mobile } from "../responsive";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { addProduct, toastAddedCart } from "../redux/cartRedux";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";


const Container = styled.div`
    ${'' /* height:100vh; */}

`;
const Wrapper = styled.div`
    padding:15px;
    margin-top:10vh;
    display:flex;
  ${mobile({ flexDirection: "column" })}


`;
const Left = styled.div`
    display:flex;
    flex-direction:column;
    background-color:#F6F6F6;
    padding:15px;
    height:80vh;
    border-radius:10px;
`;
const SortTitle = styled.h3`
    font-weight:300;
`;
const SelectOpt = styled.div`
    padding:5px;
`;
const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  margin-left: 20px;

  outline: none;
  border-radius:5px;
`;
const Option = styled.option`
    padding:5px;
`;
const Sort = styled.div`
    display:flex;
    align-items:center;
`;

const AvailStock = styled.div`
    margin-top:10vh;
`;
const AvailStockTitle = styled.h3`
    font-weight:300;
`;
const CheckboxOpt = styled.div`
    padding:10px;
    display:flex;
    flex-direction:column;
`;
const CheckboxInput = styled.input`

`;
const CheckOne = styled.div``;
const CheckTwo = styled.div``

const CheckboxLabel = styled.label`
    margin-left:4px;
    font-weight:300;
`;

const CantFind = styled.div`
    margin-top:10vh;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-item:center;
`;

const CantFindTitle = styled.h3`

`;

const Right = styled.div`
       display: grid;
  grid-template-columns: auto auto auto;
  ${mobile({ display: "flex", flexDirection: "column" })}


        
    
`;
const RequestButton = styled.button`
    margin-top:10px;
    padding:7px;
    background-color:transparent;
    border:1px solid black;
    cursor:pointer;
    color:black;
    font-size:18px;
    border-radius:5px;
    width:35vh;
    transition:all 0.2s ease;
    &:hover{
        background-color:black;
        color:white;
    }

`


const Product = styled.div`
    display: flex;
    border: 1px solid lightgrey;
    margin:10px;
    border-radius:5px;
    height:35vh;
`;

const BookDetail = styled.div`
    margin-top:10px;
    width:20vh;
`;
const Image = styled.img`
    width:150px;
    height:200px;
`;
const BookTitle = styled.h5`
    color:#333533;
    ${'' /* padding:3px; */}
`;
const Subtitle = styled.h5`
    color:#787878;
    font-weight:400;
    font-size:15px;
    ${'' /* padding:3px; */}

`;
const Stars = styled.div`
   margin-top:7px;
`;

const BookPrice = styled.h4`
    margin-top:5px;
    font-size:15px;
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

const Button = styled.button`
    display:flex;
    align-items:center;
    justify-content:center;
    margin-top:20px;
    padding:5px;
    width:20vh;
    background-color: #5adbb5;
    border:none;
    cursor: pointer;
    border-radius:5px;

`;
const RButton = styled.button`
    display:flex;
    align-items:center;
    justify-content:center;
    margin-top:20px;
    background-color: #38E54D;
    border:none;
    cursor: pointer;
    border-radius:5px;
    padding:5px;
    width:20vh;
`;

function Result() {
    const location = useLocation();
    const cat = location.pathname.split('/')[2];
    const [Item, setItem] = useState([]);
    const [filters, setFilters] = useState({});
    const [sort, setSort] = useState("newest");
    const [inStock, setinStock] = useState(false);
    const [outStock, setoutStock] = useState(false);
    const [stockresult, setStockresult] = useState("");
    const dispatch = useDispatch();
    const quantity = 1;
    const products = useSelector((state) => state.products);

    useEffect(() => {
        const discountItem = async () => {
            const res = await axios.get(`http://localhost:5000/api/products?category=${cat}`)
            setItem(res.data)
        }
        discountItem();

    }, [])
    const handleFilters = (e) => {
        const value = e.target.value;
        setFilters({
            ...filters,
            [e.target.name]: value
        });
    }
    const handleChange = event => {
        if (event.target.value === "inStock") {
            setoutStock(false);
            setinStock(!inStock);
            // setStockresult(event.target.value);

        }
        if (event.target.value === "outStock") {
            setinStock(false);
            setoutStock(!outStock);
            // setStockresult(event.target.value);

        }
        console.log(event.target.value);
    };

    useEffect(() => {
        if (sort === "newest") {
            setItem((prev) =>
                [...prev].sort((a, b) => a.createdAt - b.createdAt)
            );
        } else if (sort === "asc") {
            setItem((prev) =>
                [...prev].sort((a, b) => a.price - b.price)
            );
        } else {
            setItem((prev) =>
                [...prev].sort((a, b) => b.price - a.price)
            );
        }
    }, [sort]);

    const handleClick = (item) => {
        dispatch(addProduct({ ...item, quantity }));
        dispatch(toastAddedCart());

    }

    return (
        <div>
            <Navbar />
            <Container>
                <Wrapper>
                    <Left>
                        <Sort>
                            <SortTitle> Sort By:</SortTitle>
                            <SelectOpt>
                                <Select onChange={(e) => setSort(e.target.value)}>
                                    <Option value="newest">Newest</Option>
                                    <Option value="asc">Price (asc)</Option>
                                    <Option value="desc">Price (desc)</Option>
                                </Select>
                            </SelectOpt>
                        </Sort>
                        {/* <AvailStock>
                            <AvailStockTitle>Availibility</AvailStockTitle>
                            <CheckboxOpt>
                                <CheckOne>
                                    <CheckboxInput type="checkbox" id="instock" value="inStock" onChange={handleChange}
                                        checked={inStock} />
                                    <CheckboxLabel htmlFor="instock">In Stock</CheckboxLabel>
                                </CheckOne>
                                <CheckTwo>
                                    <CheckboxInput type="checkbox" id="outStock" value="outStock" onChange={handleChange}
                                        checked={outStock}
                                    />
                                    <CheckboxLabel htmlFor="outStock">Out of Stock</CheckboxLabel>
                                </CheckTwo>

                            </CheckboxOpt>
                        </AvailStock> */}
                        <CantFind>
                            <CantFindTitle>
                                "Can't find what<br /> you're
                                looking for?"
                            </CantFindTitle>
                            <Link to="/requestbook">
                                <RequestButton>Request a Book</RequestButton>
                            </Link>
                        </CantFind>
                    </Left>
                    <Right>
                        {Item.map((item) => {
                            return (

                                <Product>
                                    <Image src={item.image} />
                                    <BookDetail>
                                        <Link to={`/product/${item._id}`} style={{ textDecoration: "none", color: "black" }}>
                                            <BookTitle>{item.title.slice(0, 20) + '...'}</BookTitle>
                                        </Link>
                                        <Stars>
                                            <Star fontSize="small" />
                                            <Star fontSize="small" />
                                            <Star fontSize="small" />
                                            <Star fontSize="small" />
                                            <Star fontSize="small" />
                                        </Stars>
                                        <BookPrice>${item.price}</BookPrice>
                                        {!item.inStock ? (
                                            <Link to="/requestbook" style={{ textDecoration: "none" }}>
                                                <RButton><SendIcon /><b>Request This</b></RButton>
                                            </Link>
                                        ) : <Button onClick={() => handleClick(item)}><ShoppingCartIcon /><b>Add To Cart</b></Button>}
                                    </BookDetail>
                                    <RightBar>
                                        <Flag>
                                            {item.status ? <New>New</New> : ""}
                                            {item.discount ? <Discount>{item.discount}</Discount> : ""}

                                        </Flag>
                                    </RightBar>
                                </Product>
                            )
                        })}


                    </Right>
                </Wrapper>
            </Container>
            <Footer />

        </div>
    )
}

export default Result