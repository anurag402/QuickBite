import React, { useEffect, useRef, useState } from 'react'
import { useCart, useDispatchCart } from './Reducer';

export default function Card(props) {
  let dispatch = useDispatchCart();
  let data = useCart();
  let options = props.options;
  let priceOptions = Object.keys(options);
  let foodItems = props.foodItem;

  const priceRef = useRef();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

  const cartHandler = async () => {
    let food = []
    for (const item of data) {
      if (item.id === foodItems._id && item.size === size) {
        food.push(item);
        break;
      }
    }
    if (food.length != 0) {
      if (food[0].size === size) {
        await dispatch({ type: "UPDATE", id: foodItems._id, price: finalPrice, qty: qty, size:size })
        return;
      }
      else{
        await dispatch({ type: "ADD", id: foodItems._id, name: foodItems.name, price: finalPrice, qty: qty, size: size, img: foodItems.img })
        return;
      }
    }
    else await dispatch({ type: "ADD", id: foodItems._id, name: foodItems.name, price: finalPrice, qty: qty, size: size, img: foodItems.img  })

  }

  let finalPrice = qty * parseInt(options[size]);
  useEffect(() => {
    setSize(priceRef.current.value);
  }, [])

  return (
    <div>
      <div className="card mt-3" style={{ "width": "17rem", "minHeight": "350px" }}>
        <img src={foodItems.img} className="card-img-top" alt="..." style={{ height: "140px", objectFit: "cover" }} />
        <div className="card-body">
          <h5 className="card-title">{foodItems.name}</h5>
          <div className="card-text overflow-auto" style={{ height: "120px" }}>{foodItems.description}</div>
          <div className="mt-3 w-100">
            <select className="h-25 bg-success rounded" onChange={(e) => setQty(e.target.value)}>
              {
                Array.from(Array(6), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  )
                })
              }
            </select>
            <select className="m-2 h-25 bg-success rounded text-capitalize" ref={priceRef} onChange={(e) => setSize(e.target.value)}>
              {priceOptions.map((data) => (
                <option key={data} value={data}>{data}</option>
              ))}
            </select>
            <div className='d-inline fs-6'>
              Total: ₹{finalPrice}/-
            </div>
          </div>
          <hr />
          <button className='btn btn-success justify-center w-100' onClick={cartHandler}>Add to Cart</button>
        </div>
      </div>
    </div>
  )
}
