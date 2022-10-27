import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from "react-router";
import { userRequest } from "../requestMethods";
import { Link } from "react-router-dom";
import { emptyCart } from '../redux/cartRedux';
const Success = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    const data = location.state?.stripeData;
    const cart = location.state?.cart;
    const currentUser = useSelector((state) => state.user.currentUser);
    const accessToken = useSelector((state) => state.user.accessToken);
    const [orderId, setOrderId] = useState(null);
    // Getting Token
    const user = JSON.parse(localStorage.getItem('persist:root'))?.user;
    const currentUseri = user && JSON.parse(user).currentUser;
    const TOKEN = currentUseri?.accessToken;
    useEffect(() => {
        const createOrder = async () => {
            try {
                const res = await userRequest.post("/orders", {
                    userId: currentUser._id,
                    products: cart?.products.map((item) => ({
                        productId: item._id,
                        quantity: item._quantity,
                    })),
                    amount: cart?.total.toFixed(2),
                    address: data?.billing_details.address,
                }, {

                    headers: {
                        token: `Bearer ${TOKEN}`
                    }
                }
                );
                setOrderId(res.data._id);
                dispatch(emptyCart());
            } catch (err) {
                console.log(err);
            }
        };
        data && createOrder();
    }, [cart, data, currentUser]);

    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {orderId
                ? `Order has been created successfully. Your order number is ${orderId}`
                : `Successfull. Your order is being prepared...`}
            <Link to='/'>
                <button style={{ padding: 10, marginTop: 20 }}>Go to Homepage</button>
            </Link>
        </div>
    );
};

export default Success;
