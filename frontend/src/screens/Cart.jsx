import React from 'react'
import { RiDeleteBin6Line } from "react-icons/ri";
import { useCart, useDispatchCart } from '../components/Reducer';
export default function Cart() {
    let data = useCart();
    let dispatch = useDispatchCart();
    let totalPrice = data.reduce((total, food) => total + food.price, 0)

    if (data.length == 0) {
        return (
            <div>
                <div className='w-100 text-center fs-3'>Cart is Empty!</div>
            </div>
        )
    }

    const checkOutHandler = async () => {
        let userEmail = localStorage.getItem("userEmail");
        let orderDate = new Date().toString().split("GMT")[0].slice(0,-4);
        let response = await fetch("https://quick-bite-backend.vercel.app/api/v1/orderData", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                order_data: data,
                email: userEmail,
                order_date: orderDate
            })
        });
        if (response.status === 200) {
            dispatch({ type: "DROP" })
        }
    }

    return (
        <div>
            <div className='container m-auto mt-1 table-responsive table-responsive-sm table-responsive-md' >
                <table className='table table-hover'>
                    <thead className='text-success fs-4'>
                        <tr>
                            <th scope='col'>#</th>
                            <th scope='col'>Name</th>
                            <th scope='col'>Quantity</th>
                            <th scope='col'>Option</th>
                            <th scope='col'>Amount</th>
                            <th scope='col'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((food, index) => (
                            <tr>
                                <th scope='row' >{index + 1}</th>
                                <td>{food.name}</td>
                                <td>{food.qty}</td>
                                <td className='text-capitalize'>{food.size}</td>
                                <td>₹ {food.price}</td>
                                <td ><button type="button" className="btn p-0"><RiDeleteBin6Line onClick={() => { dispatch({ type: "DELETE", index: index }) }} /></button> </td></tr>
                        ))}
                    </tbody>
                </table>
                <div><h1 className='fs-2 mt-4'>Total Price: ₹ {totalPrice}/-</h1></div>
                <div>
                    <button className='btn bg-success mt-3 mb-4' onClick={checkOutHandler} > Check Out </button>
                </div>
            </div>
        </div>
    )
}
