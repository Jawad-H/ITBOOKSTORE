import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
const Container = styled.div`
    padding:50px;
    margin-top:100px;
    margin-bottom:10px;
    font-size:25px;
    display:flex;
    justify-content:center;
    align-items:center;
    background-color:#5CB8E4;
    border-radius:20px 5px 10px 5px;
`;
const Title = styled.h1`
    font-size:25px;
    padding:30px;
    ${mobile({ fontSize: "18px" })}
`;

const Button = styled.button`
    padding:10px;
    background-color:transparent;
    border:1px solid black;
    cursor:pointer;
    color:black;
    font-size:18px;
    border-radius:5px;
    width:300px;
    transition:all 0.2s ease;
    &:hover{
        background-color:black;
        color:white;
    }
    ${mobile({ fontSize: "12px" })}
`;


function Banner() {
    return (
        <Container>
            <Title>Can't find what you're looking for?</Title>
            <Link to="/requestbook">
                <Button>REQUEST A BOOK</Button>
            </Link>
        </Container>
    )
}


export default Banner;