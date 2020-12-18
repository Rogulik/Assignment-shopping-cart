import React, { useEffect, useCallback } from 'react'
import { checkQuantity } from '../api/shopcart'
import { useMutation } from 'react-query'
import debounce from 'lodash.debounce';


const Quantity = ({
    pid,
    idx,
    isBlocked,
    quantities,
    setQuantities,
    max,
    min
    }) => {
    const { mutate, status } = useMutation(checkQuantity)
    const debouncedCheck = useCallback(debounce((product) => mutate(product),300),[])

        useEffect(() => {
           if(status === 'error'){
            setQuantities(quantities.map((q,i) =>{
                if(i === idx){
                   return q = min
                } else {
                    return q
                }
            }))
        }
        },[status])

        const onClickAddQuantity = () => {
            setQuantities(quantities.map((q,i) => {
                if(i === idx){
                    debouncedCheck({pid, quantity: q += 1 })
                    return q++
                 } else {
                     return q
                 }
            }))
        }
        const onClickSubtractQuantity = () => {
            setQuantities(quantities.map((q,i) => {
                if(i === idx){
                    debouncedCheck({pid, quantity: q -= 1 })
                    return q--
                 } else {
                     return q
                 }
            }))
        }

    return (
        <div className='flex flex-row ml-4'>
            <button  
            className='w-12' 
            onClick={ onClickAddQuantity }
            disabled={isBlocked}
            className={isBlocked ? 'cursor-not-allowed text-gray-400 w-12' : 'w-12'}
            >
            +
            </button>
            <button 
            disabled={quantities[idx] === min || isBlocked}
            className={quantities[idx] === min || isBlocked ? 'cursor-not-allowed text-gray-400 w-12' : 'w-12'}
            onClick={ onClickSubtractQuantity }
             >
             -
             </button>
            <p className='w-max'>Obecnie masz { quantities[idx] } sztuk produktu</p>
      </div>
    )
}

export default Quantity
