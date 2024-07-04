import React, { useEffect, useState } from 'react'

export default function MyOrder() {

    const [orderData, setorderData] = useState({})

    const fetchMyOrder = async () => {
        await fetch("https://quick-bite-backend.vercel.app/api/v1/myOrderData", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: localStorage.getItem('userEmail')
            })
        }).then(async (res) => {
            let response = await res.json()
            setorderData(response)
        })
    }

    useEffect(() => {
        fetchMyOrder()
    }, [])

    return (
        <div>

            <div className='container'>
                <div className='row'>
                    {/* {console.log(orderData)} */}
                    {Object.keys(orderData).length != 0 ? Array(orderData).map(data => {
                        return (
                            data.orderData ?
                                data.orderData.order_data.slice(0).reverse().map((item) => {
                                    return (
                                        item.map((arrayData) => {
                                            return (
                                                <>
                                                    {arrayData.Order_date ?
                                                        <div className='m-auto mt-5 fs-3'>
                                                            Order Date: {data = arrayData.Order_date}
                                                            <hr />
                                                        </div>
                                                        :
                                                        <div className='w-25 d-flex'>
                                                            <div className="card mt-3" style={{ "width": "17rem", "minHeight": "200px" }}>
                                                                <img src={arrayData.img} className="card-img-top" alt="..." style={{ height: "100px", objectFit: "cover" }} />
                                                                <div className="card-body">
                                                                    <h5 className="card-title">{arrayData.name}</h5>
                                                                    <div className="w-100">
                                                                        <div className='fs-6'>Quantity: {arrayData.qty}</div>
                                                                        <div className='fs-6 text-capitalize'>Size: {arrayData.size}</div>
                                                                        <div className='fs-6'>Date: {data}</div>
                                                                        <div className='fs-6'>Total: ₹ {arrayData.price}/-</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    }

                                                </>
                                            )
                                        })

                                    )
                                }) 
                                :
                                <div className='mt-5 mb-4 w-100 text-center fs-3'>No Orders Placed Yet!</div>
                        )
                    }) 
                    :
                    ""
                     }
                </div>


            </div>
        </div>
    )
}
