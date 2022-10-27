import React from 'react'
import Navbar from '../components/Navbar'
import styled from "styled-components";
import { mobile } from "../responsive";
import Footer from '../components/Footer';
import { login } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import { incorrectCredentialToast } from "../redux/userRedux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Container = styled.div`

`;
const Wrapper = styled.div`
    display:flex;
    ${'' /* margin-top:80px; */}
    padding:100px;


`;

const Left = styled.div` 
  width: 100vw;
  height: 100vh;
  background:url("https://images.unsplash.com/photo-1462392627162-2baa2b3518a8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80");
  object-fit: contain;
  position: relative;
  color: white;
  border-radius:10px;
  ${mobile({ display: "none" })}
`;

const Right = styled.div`
  width: 100vw;
  height: 30vh;
  ${mobile({ height: "60vh" })}
 
`;

const LoginTitle = styled.h1`
    margin-top:20vh;
    text-align: center;
  ${mobile({ marginTop: "0vh" })}

`


const FormWrapper = styled.div`
    margin-top:30px;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

`;
const Input = styled.input`
    padding:10px;
    outline:none;
    margin:15px;
    width:25vw;
    border-radius:10px;
    border:2px solid lightgrey;
    ${mobile({ width: "60vw" })}

`;

const Button = styled.button`
    display:flex;
    justify-content:center;
    align-items:center;
    margin-top:10px;
    padding:10px;
    outline:none;
    width:25vw;
    border:none;
    ${mobile({ width: "60vw" })}
     background-color:transparent;
    border:1px solid black;
    cursor:pointer;
    color:black;
    ${'' /* font-size:18px; */}
    border-radius:5px;
    transition:all 0.2s ease;
    &:hover{
        background-color:black;
        color:white;
    }

`;

const Or = styled.div`
    margin-top:20px;   
    display:flex;
    align-items:center;
    justify-content:center;
    color:lightgray;
   
`

const LineOne = styled.div`
    width:200px;
`;
const LineTwo = styled.div`
    width:200px;
`;
const Text = styled.h5`
    padding:5px;
    color:lightgrey;
`;

const Image = styled.img`
    width:20px;
    margin-right:7px;
`;

const Icons = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    margin-top:10px;

`;

const SignupWrapper = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    margin-top:40px;


`;
const Title = styled.h5`
    color:lightgrey;
`;
const SignUp = styled.span`
    color:black;
`;
function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const { isFetching, error } = useSelector((state) => state.user);

    const handleClick = (e) => {
        e.preventDefault();
        login(dispatch, { username, password });
        error && dispatch(incorrectCredentialToast());

    };


    return (
        <div>
            <ToastContainer
                position="bottom-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                theme="dark"
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Navbar />
            <Container>

                <Wrapper>
                    <Left>

                    </Left>
                    <Right>

                        <LoginTitle>Sign in</LoginTitle>
                        <FormWrapper>
                            <Input
                                type="text"
                                placeholder="Enter Username..."
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <Input
                                type="password"
                                placeholder="Enter Password..."
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button onClick={handleClick}>Sign In</Button>
                        </FormWrapper>
                        <SignupWrapper>
                            <Title>Dont have account ? <Link to="/register" style={{ textDecoration: "none", color: "black" }}><SignUp>Sign up here</SignUp></Link></Title>
                        </SignupWrapper>

                    </Right>
                </Wrapper>
            </Container>
            <Footer />
        </div>
    )
}

export default Login