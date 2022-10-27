import { Badge } from "@mui/material";
import { Search, ShoppingCartOutlined } from "@mui/icons-material";
import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import PersonIcon from '@mui/icons-material/Person';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/apiCalls";




const Container = styled.div`
  height: 60px;
`;
const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const SearchContainer = styled.div`
  border: 0.5px solid black;
  display: flex;
  align-items: center;
  margin-left: 25px;
  width:350px;
  `;

const Input = styled.input`
  border: none;
  padding:10px;
  border-radius:30px;
  outline: none;
  width:300px;
  border-radius:50%;
`;
const Center = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content:flex-end;
    ${mobile({ display: "none" })}

`;
const Logo = styled.h3`
  font-weight: bold;
  border:3px solid black;
  padding:5px;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  display: flex;
  align-items: center;
  justify-content: content-center;
`;

const Navbar = () => {
  const cart = useSelector(state => state.cart.quantity);
  const user = useSelector((state) => state.user?.currentUser);
  const dispatch = useDispatch();
  return (
    <Container>
      <Wrapper>
        <Left>
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            <Logo>ITBOOKS</Logo>
          </Link>
        </Left>
        <Center>
          {/* <SearchContainer>
            <Input placeholder="Search..." />
            <Search style={{ color: "gray", fontSize: "large" }} />
          </SearchContainer> */}
        </Center>
        <Right>
          {user ?
            (<>
              <MenuItem><PersonIcon />Hello, {user.username}</MenuItem>
              <MenuItem onClick={() => logout(dispatch, { user })}>Logout</MenuItem>

            </>
            )

            :
            (<Link to="/login" style={{ textDecoration: "none", color: "black" }}>
              <MenuItem>Sign in</MenuItem>
            </Link>
            )}

          <MenuItem>
            <Link to="/cart" style={{ textDecoration: "none", color: "black" }}>
              <Badge badgeContent={cart} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </Link>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
