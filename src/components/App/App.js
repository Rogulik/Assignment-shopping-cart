import React, { useState,useEffect } from 'react';
import { fetchCart } from '../../api/shopcart'
import { useQuery } from 'react-query'
import CurrencyFormat from 'react-currency-format';
import './App.css';
import Quantity from '../Quantity';



const App = () => {
  const { data, isLoading, isError, isSuccess } = useQuery('products', fetchCart)
  const [quantities, setQuantities ] = useState([])
  const [ fullPrice, setFullPrice ] = useState()

  const calcFullPrice = () => {
    return setFullPrice(data.reduce((acc, val, idx) => {
      let number = Number.parseFloat(val.price)
      let calc = acc + number * quantities[idx]
      return calc
    },0))
  }

  useEffect(() => {
    if(isSuccess){
      setQuantities(data.map((p) => p.min ))
    }
  }, [data])
  
  useEffect(() => {
    if(isSuccess){
      calcFullPrice()
    }
  }, [quantities])

  return (
    <div className='h-screen'>
        <div className='flex flex-col items-center justify-center h-full'>
          {isError && (
            <h3 className='text-3xl text-white'>Fetching data failed, please try again later.</h3>
          )}
          {isLoading && (
            <h3 className='text-3xl text-white'>Loading...</h3>
          )}
          {isSuccess && (
            <>
              <h3 className='mb-4 text-3xl text-white'>Lista produktów</h3>
              <ul className='space-y-2 text-xl text-white '>
                {data.map(({pid,name,min,max,price,isBlocked}, idx) => (
                  <li key={pid} className='relative flex items-center justify-between border-b-2 border-gray-300 border-dotted'>
                    <p className='mr-2 w-60'>{name}</p>
                    { isBlocked && (<span className="absolute left-0 text-xs text-red-300 -bottom-4">Niedostępny</span>)}
                    <CurrencyFormat value={ price } displayType={'text'} thousandSeparator={true} suffix={' zł'} />
                    <Quantity 
                    pid={pid}
                    idx={idx}
                    quantities={quantities}
                    setQuantities={setQuantities}
                    min={min} 
                    max={max}
                    isBlocked={isBlocked}
                    />
                  </li>
                ))}
                <li className='relative flex items-center justify-between pt-4'>
                  <p>Razem:</p>
                  <CurrencyFormat value={ Number.parseFloat(fullPrice).toFixed(2) } displayType={'text'} thousandSeparator={true} suffix={' zł'} />
                </li>
              </ul>
            </>
          )}
          
        </div>
    </div>
  );
};

export {
    App
};
