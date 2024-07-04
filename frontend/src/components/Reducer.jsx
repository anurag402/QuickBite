import React, { createContext, useContext, useReducer } from 'react'

const cartStateContext = createContext();
const cartDispatchContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return [...state, { id: action.id, name: action.name, price: action.price, qty: parseInt(action.qty), size: action.size, img: action.img }]
        case "DELETE":
            let newArr = [...state];
            newArr.splice(action.index, 1);
            return newArr;
        case "UPDATE":
            let Arr = [...state]
            Arr.find((food, index) => {
                if (food.id == action.id && food.size == action.size) {
                    Arr[index] = { ...food, qty: parseInt(action.qty) + parseInt(food.qty), price: action.price + food.price }
                }
            })
            return Arr;
        case "DROP":
            let empArray = []
            return empArray
        default:
            console.log("Error in Reducer");
    }
}

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, [])
    return (
        <cartDispatchContext.Provider value={dispatch}>
            <cartStateContext.Provider value={state}>
                {children}
            </cartStateContext.Provider>
        </cartDispatchContext.Provider>
    )
}

export const useCart = () => useContext(cartStateContext);
export const useDispatchCart = () => useContext(cartDispatchContext);
