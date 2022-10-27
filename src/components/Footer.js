import React from 'react'
import styled from "styled-components";
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Instagram } from '@mui/icons-material';
import { mobile } from "../responsive";

const Container = styled.div`
    margin-top: 30px;
    background-color: #F2F2F2;
    padding-top:50px;
    padding-bottom:50px;
    
`;
const Wrapper = styled.div`
    display:flex;
    justify-content:space-around;

`;

const Information = styled.div`
    ${mobile({ padding: "5px" })}
    
`;
const LinkHeader = styled.ul`
    list-style: none;

`;
const Link = styled.li`
    padding-top:10px;
    font-size:15px;
    cursor:pointer;
    &:hover {
        color:#555d50;
        
    }
   

`;
const InformationTitle = styled.h5`

`;
const NewFeature = styled.div``;
const NewFeatureTitle = styled.h5`

`;
const CustomerSupport = styled.div``;
const CustomerSupportTitle = styled.h5`

`;
const ContactUs = styled.div``;
const ContactUsTitle = styled.h5`

`;
const Copyright = styled.div`
    background-color:#100720;
    height:10vh;
   
`;
const Icons = styled.div`
    padding-top:10px;
    ${mobile({ display: 'flex', flexDirection: 'column' })}

`;

const CopyrightTitle = styled.h5`
    color:white;
    text-align:center;
    padding:20px;
    font-weight:100px;
    
`;
function Footer() {
    return (
        <>
            <Container>
                <Wrapper>
                    <Information>
                        <InformationTitle>Information</InformationTitle>
                        <LinkHeader>
                            <Link>Returns and Exchange Policy</Link>
                            <Link>Privacy Policy</Link>
                            <Link>About Us</Link>
                            <Link>Our Bookstores</Link>
                            <Link>Terms & Conditions</Link>
                        </LinkHeader>
                    </Information>
                    <NewFeature>
                        <NewFeatureTitle>New Feature</NewFeatureTitle>
                        <LinkHeader>
                            <Link>Send E-Gift Card</Link>
                        </LinkHeader>
                    </NewFeature>
                    <CustomerSupport>
                        <CustomerSupportTitle>Customer Support</CustomerSupportTitle>
                        <LinkHeader>
                            <Link>Returns</Link>
                            <Link>Contact Us</Link>
                        </LinkHeader>
                    </CustomerSupport>
                    <ContactUs>
                        <ContactUsTitle>Contact Us</ContactUsTitle>
                        <LinkHeader>
                            <Link>Returns</Link>
                            <Link>Contact Us</Link>
                        </LinkHeader>
                        <Icons>
                            <FacebookOutlinedIcon fontSize='large' />
                            <TwitterIcon fontSize='large' />
                            <LinkedInIcon fontSize='large' />
                            <Instagram fontSize='large' />
                        </Icons>
                    </ContactUs>
                </Wrapper>
            </Container>
            <Copyright>
                <CopyrightTitle>Copyright © 2020, IT Books, All Rights Reserved.</CopyrightTitle>
            </Copyright>
        </>
    )
}

export default Footer