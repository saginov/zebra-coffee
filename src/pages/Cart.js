import React, {useMemo, useState} from 'react';
import qrImg from '../recources/images/qr.png'
import Switch from 'react-ios-switch';
import {useRecoilState, useRecoilValue} from "recoil";
import {Cart, Goods} from "../store/store";
import {NavLink} from "react-router-dom";
import {useNavigate, useParams} from "react-router";

const getMinTime = () => {
    const date = new Date()
    const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
    const minutes = (date.getMinutes() + 16 < 10) ? '0' + date.getMinutes()+16 : date.getMinutes() +16
    return hours + ":" + minutes
}

const CartPage = () => {
    const [timed,setTimed] = useState(false)
    const [time, setTime] = useState(undefined)
    const [cart,setCart] = useRecoilState(Cart)
    const navigate = useNavigate()
    const params = useParams()
    const goods = useRecoilValue(Goods)
    let sum = 0;
    const fullPrice = useMemo(()=> {
        cart.map(item => sum+=item.price)
        return sum
    }, [cart])
    const handleDelete = (idx) => {
        setCart(cart.filter(item => item.idx !== idx))
        localStorage.setItem('cart', JSON.stringify(cart.filter(item => item.idx !== idx)))
    }
    const handlePayClick = ()=> {
        setCart({products: cart, full_price: fullPrice, by_time:timed, time: timed ? time : '60:60' })
        navigate("../" + params.id + '/payment')
    }

    return (
        <div className={"w-full p-4 h-[85vh] flex flex-col"}>
            <div className="flex flex-row w-full justify-between items-center">
                <span className="text-[25px] font-bold">Корзина</span>
                <NavLink to={'qr'}>
                    <img src={qrImg} alt="alt" className={'w-[30px] h-[30px]'}/>
                </NavLink>
            </div>
            <div className="w-full h-full flex flex-col mt-4">
                <div className="w-full flex flex-col max-h-[450px] h-[450px] overflow-y-scroll">
                    {
                        cart.length > 0  ?
                            cart.map((item,index) =>
                                {
                                    const good = goods.find(t => t.id === item.product_id)
                                    return (
                                        <div key={index} className="w-full flex flex-row justify-between shrink-0 h-[100px] py-[12px] px-[19px] bg-[#F7F8FB] my-2">
                                            <img src={good.picture_url} alt="alt" className={'w-[60px] h-[70px] flex shrink-0'}/>
                                            <div className={"flex basis-2/5 shrink-0 flex-col justify-between"}>
                                                <span className={'font-bold'}>{good.product_name.length > 15 ? good.product_name.slice(0,-(good.product_name.length-15)) + '...' : good.product_name}</span>
                                                {
                                                    item.addition.length > 0 && <span className="text-gray-400">c {item.addition[0]}</span>
                                                }
                                                {
                                                    item.addition.length > 1 && <span className="" >+ еще {item.addition.length - 1}</span>
                                                }
                                            </div>
                                            <div className={'font-bold flex flex-col justify-center'}>
                                                {item.price} <span>тг</span>
                                            </div>
                                            <div className={'flex flex-col justify-between'}>
                                                <span onClick={()=>handleDelete(item.idx)} className={'text-red-600'}><i className='bi bi-trash text-[20px]'></i></span>
                                                <NavLink to={'../' + params.id + '/cart/' + item.idx}  className={'text-blue-600'}><i className='bi bi-pencil-square text-[20px]'></i></NavLink>
                                            </div>
                                        </div>
                                    )
                                }
                            )
                            :
                            <div className="w-full flex flex-row shrink-0 h-[100px] py-[12px] px-[19px] bg-[#F7F8FB] my-2">
                                <span className={'text-[25px] font-bold'}>Нет товаров в корзине</span>
                            </div>
                    }
                </div>
                <div className="w-full flex flex-row mt-4 relative">
                    <span className="text-lg mr-4">Приготовить к определенному времени сегодня?</span>
                    <Switch
                        checked={timed}
                        onChange={()=>setTimed(!timed)}
                        className="flex shrink-0"
                    />
                    <input className={'absolute right-0 bottom-[-40px] w-[100px] h-[50px] text-[25px] border-gray-300 border'}
                           type="time"
                           disabled={!timed}
                           onChange={(e)=>setTime(e.target.value)}
                           min={getMinTime()}
                           max="22:00"
                           value={time ?? getMinTime()}/>
                </div>
                <div className="flex w-full flex-row justify-between items-center mt-[50px]">
                    <div className={'flex flex-col'}>
                        <span className={'text-gray-300'}>Итого</span>
                        <span className="font-bold text-[25px]">{fullPrice} тг</span>
                    </div>
                    <div onClick={()=>handlePayClick()} className={'rounded-[30px] w-[180px] h-[50px] text-[20px] flex justify-center items-center bg-general text-white flex-row'}>
                        <i className={'bi bi-cart text-[25px]'}></i> &nbsp; Оплатить
                    </div>
                </div>
            </div>

        </div>
    );
};

export default CartPage;