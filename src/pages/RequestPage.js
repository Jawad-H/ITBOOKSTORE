import React from 'react'
import Navbar from '../components/Navbar'
import styled from "styled-components";
import Footer from '../components/Footer';
import { useState } from "react";
import { publicRequest } from "../requestMethods";
import { useHistory } from "react-router";
const Container = styled.div`
        margin-top:100px;
        display:flex;
        justify-content:center;
        align-items:center;
        

`;
const Title = styled.h5`
    font-size:17px;

`
const Desc = styled.p`
    padding:30px;
    font-size:15px;
    color:#CFC0C0;
`;
const Wrapper = styled.div`
        border:1px solid black;
        border-radius:4px;
        height:120vh;
        width:70vh;
        padding:50px;
`;
const FormWrapper = styled.div`
     display:flex;
     flex-direction:column;
     justify-content:center;
     align-item:center;
`;
const Input = styled.input`
    margin:15px;
    padding:15px;
    outline:none;
    border-radius:7px;
    border:1px solid #CFC0C0;
    &:focus{
    border:1px solid black;    
    }
`;


const Button = styled.button`
    margin-top:20px;
    padding:15px;
    margin-left:100px;
    width:200px;
    background-color:transparent;
    border:1px solid black;
    cursor:pointer;
    color:black;
    font-size:18px;
    border-radius:5px;
    transition:all 0.2s ease;
    text-align:center;
    &:hover{
        background-color:black;
        color:white;
    }

`;

function RequestPage() {


    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [isbn, setIsbn] = useState("");
    const [name, setName] = useState("");
    const [contact, setContact] = useState("");
    const [email, setEmail] = useState("");
    const history = useHistory();

    const handleClick = async (e) => {
        e.preventDefault();
        await publicRequest.post("/request", {
            title,
            author,
            isbn,
            name,
            contact,
            email
        });
        history.push("/");
    }

    return (
        <div>
            <Navbar />
            <Container>
                <Wrapper>
                    <Title>Import a Book</Title>
                    <Desc>
                        If your desired book is not available with us, you can place a request for it by filling out the following form. Our team will respond you in the next 48 to 72 hours.
                    </Desc>
                    <FormWrapper>
                        <Input
                            placeholder='Enter Title'
                            onChange={(e) => setTitle(e.target.value)} />
                        <Input
                            placeholder='Enter Author'
                            onChange={(e) => setAuthor(e.target.value)} />
                        <Input
                            placeholder='Enter ISBN'
                            onChange={(e) => setIsbn(e.target.value)} />
                        <Input
                            placeholder='Enter Name'
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Input
                            placeholder='Enter Contact'
                            onChange={(e) => setContact(e.target.value)} />
                        <Input
                            placeholder='Enter Email'
                            onChange={(e) => setEmail(e.target.value)} />
                        <Button onClick={handleClick}>Submit</Button>
                    </FormWrapper>
                </Wrapper>
            </Container>
            <Footer />
        </div>
    )
}

export default RequestPage