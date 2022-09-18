import React, {useMemo, useState} from 'react';
import {useRecoilState, useRecoilValue} from "recoil";
import {Cart, GetGoodByID} from "../store/store";
import {useParams} from "react-router";

const Product = ({edit = false}) => {
    const params = useParams()
    const [cart,setCart] = useRecoilState(Cart)
    const product = useRecoilValue(GetGoodByID(edit ? cart.find(item => item.idx === +params.idx).product_id : params.productId))
    const [goodDto, setGoodDto] = useState(edit ?
            {...cart.find(item => item.idx === +params.idx)}
        :
            {
                product_id: product.id,
                count: 1,
                addition: [],
                preferences: ''
            })


    const [added,setAdded] = useState(false)

    const finalPrice = useMemo(()=>{
        return (goodDto.count * product.Price) + (goodDto.addition.length * 50)
    },[goodDto])

    const handleOptionClick = (key) => {
        if(goodDto.addition.indexOf(key) < 0) {
            setGoodDto({...goodDto, addition: [...goodDto.addition, key ]})
        } else {
            setGoodDto({...goodDto,addition: goodDto.addition.filter(item => item !== key)})
        }
    }
    const handlePlusClick = () => {
        setGoodDto({...goodDto, count: ++goodDto.count})
    }
    const handleMinusClick = () => {
        if(goodDto.count > 1){
            setGoodDto({...goodDto, count: --goodDto.count})
        }
    }

    const addToCart = () => {
        console.log(goodDto, cart)
        if(!goodDto.id && !(goodDto.count >= 1) && added) return
        const cartDto = {...goodDto, price: finalPrice, idx: edit ? goodDto.idx : Math.random()}
        if(edit){
            setCart([...cart.filter(item => item.idx !== goodDto.idx), cartDto])
            localStorage.setItem('cart', JSON.stringify([...cart, cartDto]))
            setAdded(true)
            console.log('edited  cart in localStorage')

        }else {
            setCart([...cart, cartDto])
            localStorage.setItem('cart', JSON.stringify([...cart, cartDto]))
            setAdded(true)
            console.log('added to cart and localStorage')
        }

    }

    return (
        <div className={'w-full px-[25px] h-[85vh] flex flex-col overflow-y-scroll'}>
            <div className="w-full shrink-0 h-[150px] flex bg-[#F7F8FB] justify-center items-center">
                <img src={product?.picture_url ?? ''} alt="alt" className={'w-auto max-h-[120px]'}/>
            </div>
            <div className="flex w-full pt-[14px] pb-[21px] border-b flex-row justify-between items-center px-4">
                <span className={'mr-4 font-bold'}>{product.product_name}</span>

                <div className="flex shrink-0 min-w-[75px] h-[30px] fle-row justify-between rounded-[50px]  text-[20px] border border-gray-400">
                    <div onClick={()=>handlePlusClick()} className="border-r border-gray-400 px-2"><i className="bi bi-plus"></i></div>
                    <div className="px-2">{goodDto.count}</div>
                    <div onClick={()=>handleMinusClick()} className="border-l border-gray-400 px-2"><i className="bi bi-dash"></i></div>
                </div>
            </div>
            <div className={'w-full py-4 text-[10px] border-b'}>{product.Description}</div>
            {
                product.Category === 'Горячие напитки' &&
                    <>
                        <div className={'w-full pt-[14px] pb-[8px] flex flex-col border-b'}>
                            <span className="font-bold ml-2">Добавки</span>
                            <div className={'flex flex-row flex-wrap mt-10px'}>
                                <div onClick={() => handleOptionClick('sugar')} className={`w-auto h-auto font-bold py-[4px] px-[13px] border-gray-500 border rounded-[50px] mx-[4px] my-[5px] ${goodDto.addition.indexOf('sugar') >= 0 && 'bg-gray-300'}`}>Сахар</div>
                                <div onClick={() => handleOptionClick('cinnamon')} className={`w-auto h-auto font-bold py-[4px] px-[13px] border-gray-500 border rounded-[50px] mx-[4px] my-[5px] ${goodDto.addition.indexOf('cinnamon') >= 0 && 'bg-gray-300'}`}>Корица</div>
                                <div onClick={() => handleOptionClick('nuts')} className={`w-auto h-auto font-bold py-[4px] px-[13px] border-gray-500 border rounded-[50px] mx-[4px] my-[5px] ${goodDto.addition.indexOf('nuts') >= 0 && 'bg-gray-300'}`}>Орешки</div>
                                <div onClick={() => handleOptionClick('cream')} className={`w-auto h-auto font-bold py-[4px] px-[13px] border-gray-500 border rounded-[50px] mx-[4px] my-[5px] ${goodDto.addition.indexOf('cream') >= 0 && 'bg-gray-300'}`}>Сливки</div>
                                <div onClick={() => handleOptionClick('caramelSyrup')} className={`w-auto h-auto font-bold py-[4px] px-[13px] border-gray-500 border rounded-[50px] mx-[4px] my-[5px] ${goodDto.addition.indexOf('caramelSyrup') >= 0 && 'bg-gray-300'}`}>Карамельный сироп</div>
                                <div onClick={() => handleOptionClick('nutSyrup')} className={`w-auto h-auto font-bold py-[4px] px-[13px] border-gray-500 border rounded-[50px] mx-[4px] my-[5px] ${goodDto.addition.indexOf('nutSyrup') >= 0 && 'bg-gray-300'}`}>Ореховый сироп</div>
                            </div>
                        </div>
                        <div className="flex w-full pt-[14px] pb-[21px] border-b flex-row justify-between items-center px-2">
                            <span className="font-bold">Объем, мл</span>
                            <div className="flex flex-col font-bold text-xl justify-between items-center">
                                <i className="bi bi-cup-hot text-[35px]"></i>
                                <span>250</span>
                            </div>
                        </div>
                    </>
            }
            <div className="flex w-full pt-[14px] pb-[15px]  flex-col  px-2">
                <span className="font-bold">Пожелания к заказу</span>
                <textarea onChange={(e)=>setGoodDto({...goodDto, preferences: e.target.value})} className={'w-full p-4 m-2 border border-gray-300 h-[50px] rounded-[15px]'} />
            </div>
            <div className="flex w-full pb-[21px] flex-row justify-between items-center px-2">
                <span className="text-[25px] font-bold">
                    Итого
                </span>
                <span className=" font-bold text-lg">
                    {finalPrice} тг
                </span>
            </div>
            <div onClick={()=>addToCart()} className="flex w-full justify-center items-center my-2">
                <div className={'w-full px-[83px] py-[12px] flex justify-center items-center text-white bg-general rounded-[15px]'}>{added ? <i className="bi bi-check text-[25px] text-white"></i> : edit ? 'Сохранить изменения' :'Добавить в корзину'}</div>
            </div>
        </div>
    );
};

export default Product;