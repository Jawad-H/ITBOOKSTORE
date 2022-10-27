import { createSlice, current } from "@reduxjs/toolkit";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        quantity: 0,
        total: 0,
    },
    reducers: {
        addProduct: (state, action) => {
            state.quantity += 1;
            state.products.push(action.payload);
            state.total += action.payload.price * action.payload.quantity;
            // console.log(current(state.products));
        },
        removeProduct: (state, action) => {
            const quantity = action.payload.quantity >= 1
            state.quantity -= 1;
            state.total -= state.products[action.payload.index].price * action.payload.quantity;
            state.products.splice(action.payload.index, 1);

        },
        updateProductInc: (state, action) => {
            state.products[action.payload.index].quantity += 1;
            state.total += state.products[action.payload.index].price;
        },
        updateProductDec: (state, action) => {
            state.products[action.payload.index].quantity -= 1;
            state.total -= state.products[action.payload.index].price;
            console.log(state.total);

        },
        emptyCart: (state) => {
            state.products.length = 0;
            state.total = 0;
            state.quantity = 0;
        },
        toastAddedCart: (state) => {
            toast.success("item added to cart");

        }
    }





});

export const { addProduct, removeProduct, handleQuantity, emptyCart, updateProductDec, updateProductInc, toastAddedCart } = cartSlice.actions;
export default cartSlice.reducer;