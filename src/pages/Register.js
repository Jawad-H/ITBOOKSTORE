import React from 'react'
import Navbar from '../components/Navbar'
import styled from "styled-components";
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { mobile } from "../responsive";
import { useState } from "react";
import Footer from '../components/Footer';
import { register } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { registerToast } from "../redux/userRedux";
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
  ${mobile({ height: "100vh" })}
 
`;

const LoginTitle = styled.h1`
    ${'' /* margin-top:20vh; */}
    text-align: center;

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
    ${mobile({ width: "60vw" })}

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
function Register() {


    const [firstname, setfirstname] = useState("");
    const [lastname, setlastname] = useState("");
    const [email, setemail] = useState("");
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const { isFetching, error, registerUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handleClick = (e) => {
        e.preventDefault();
        register(dispatch, { firstname, lastname, email, username, password });
        error && dispatch(registerToast());
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

                        <LoginTitle>Sign up</LoginTitle>
                        <FormWrapper>
                            <Input
                                type="text"
                                placeholder="Enter Firstname..."
                                onChange={(e) => setfirstname(e.target.value)}
                            />
                            <Input
                                type="text"
                                placeholder="Enter Lastname..."
                                onChange={(e) => setlastname(e.target.value)}

                            />
                            <Input
                                type="text"
                                placeholder="Enter Email..."
                                onChange={(e) => setemail(e.target.value)}
                            />
                            <Input
                                type="text"
                                placeholder="Enter Username..."
                                onChange={(e) => setusername(e.target.value)}
                            />
                            <Input
                                type="password"
                                placeholder="Enter Password..."
                                onChange={(e) => setpassword(e.target.value)}

                            />
                            <Button onClick={handleClick}>Sign up</Button>
                        </FormWrapper>
                        {/* <Or><LineOne><hr /></LineOne><Text>OR</Text><LineTwo><hr /></LineTwo></Or>

                        <Icons>
                            <GoogleIcon fontSize="medium" style={{ margin: "10px" }} />
                            <TwitterIcon fontSize="medium" style={{ margin: "10px" }} />
                            <FacebookIcon fontSize="medium" style={{ margin: "10px" }} />
                        </Icons> */}
                        {registerUser && <Redirect to="/login" />}
                    </Right>
                </Wrapper>
            </Container>
            <Footer />
        </div>
    )
}

export default Register;