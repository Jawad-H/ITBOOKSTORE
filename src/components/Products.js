import React from 'react'
import DiscountArrival from './DiscountArrival';
import NewArrival from './NewArrival';
import RecentlyAdded from './RecentlyAdded';
function products() {
    return (
        <>
            <DiscountArrival />
            <NewArrival />
            <RecentlyAdded />
        </>
    )
}

export default products;