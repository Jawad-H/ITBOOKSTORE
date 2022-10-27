import React, { useState, useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import styled from "styled-components";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "./styles.css";
// import required modules
import { FreeMode, Pagination, Autoplay } from "swiper";
import axios from "axios";
import { Link } from "react-router-dom";
import Product from "./Product";
import { publicRequest } from "../requestMethods";




const NewArrivalHeader = styled.div`
    padding:20px;
    margin-top:30px;
    display:flex;
    justify-content:space-between;
`;
const NewArrivalTitle = styled.h2``;
const NewArrivalButton = styled.button`
    padding:7px;
    background-color:transparent;
    border:1px solid black;
    cursor:pointer;
    color:black;
    font-size:18px;
    border-radius:5px;
    transition:all 0.2s ease;
    &:hover{
        background-color:black;
        color:white;
    }

`
function DiscountArrival() {
    const [DiscountArrival, setDiscountArrival] = useState([]);


    useEffect(() => {
        const getDiscountArrival = async () => {
            const res = await publicRequest.get("/products?category=saveupto");
            setDiscountArrival(res.data)
        }
        getDiscountArrival();

    }, []);

    return (
        <>

            <NewArrivalHeader>
                <NewArrivalTitle>Save Up to 40% OFF</NewArrivalTitle>
                <Link to={`/result/saveupto`}>
                    <NewArrivalButton>View All</NewArrivalButton>

                </Link>
            </NewArrivalHeader>
            <Swiper
                slidesPerView={3}
                spaceBetween={20}
                freeMode={true}
                autoplay={{
                    delay: 0,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                speed={2000}
                loop={true}

                // pagination={{
                //     clickable: true,
                // }}
                breakpoints={{
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 20
                    },
                    // // when window width is >= 640px
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20
                    },
                    1220: {
                        slidesPerView: 3
                    }
                    // // when window width is >= 480px
                    // 480: {
                    //     slidesPerView: 2,
                    //     spaceBetween: 20
                    // },

                }}
                modules={[FreeMode, Pagination, Autoplay]}
                className="mySwiper"
            >
                {DiscountArrival.map((item) => {
                    return (
                        <SwiperSlide>
                            <Product item={item} key={item._id} />
                        </SwiperSlide>
                    )
                })}

            </Swiper>
        </>
    );
}


export default DiscountArrival;


