import styled from "styled-components";
import { mobile } from "../responsive";


const Container = styled.div`
    margin-top:40px;

`;

const Wrapper = styled.div`
    display:flex;
    flex-direction:column;
    padding:20px;
    justify-content:center;
    align-items:center;
`;
const Title = styled.h1`
    font-size:25px;
    color:#333533;
    text-align:center;
    width:40%;
    ${mobile({ fontSize: "18px", width: "100%" })}
`;
const Input = styled.input`
    padding:10px;
    width:500px;
    margin-top:30px;
    outline:none;
    border-radius:5px;
    border:1px solid black;
    outline:none;
    ${mobile({ fontSize: "18px", width: "400px" })}
    

`;
const Button = styled.button`
    margin-top:20px;
    padding:15px;
    background-color:transparent;
    border:1px solid black;
    cursor:pointer;
    color:black;
    width:300px;
    font-size:18px;
    border-radius:5px;
    transition:all 0.2s ease;
    &:hover{
        background-color:black;
        color:white;
    }
    ${mobile({ fontSize: "18px", width: "200px" })}

`;

function Subscription() {
    return (
        <Container>
            <Wrapper>
                <Title>
                    Subscribe and stay updated on the
                    latest books, promotions and events
                </Title>
                <Input type="email" placeholder="Enter Email Address..." />
                <Button>Subscribe</Button>
            </Wrapper>

        </Container>
    )
}


export default Subscription;