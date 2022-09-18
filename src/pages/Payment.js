import React, {useState} from 'react';
import {useRecoilValue} from "recoil";
import {Cart, isAuthed, Points, User} from "../store/store";
import {useParams} from "react-router";
import axios from "axios";

const Payment = () => {
    const points = useRecoilValue(Points)
    const params = useParams()
    const currentPoint = points.find(item => item.id === +params.id)
    const [email, setEmail] = useState('')
    const [selectedPayment, setSelectedPayment] = useState(undefined)
    const isAuth = useRecoilValue(isAuthed)
    const user = useRecoilValue(User)
    const cart = useRecoilValue(Cart)
    console.log(cart)
    async function handlePayClick() {
        const res = {
            ...cart,
            is_anonymous: isAuth,
            user_id: user.id ?? -1,
            branches_id: params.id,
            discount: 0,
        }
        const resp = await axios.post('http://localhost:4000', res)

    }

    return (
        <div className={"w-full p-4 h-[85vh] flex flex-col"}>
            <div className="flex flex-row w-full justify-between items-center">
                <span className="text-[25px] font-bold">Мой заказ</span>
            </div>
            <div className={""}>
                <span>Оплата заказа </span>
                <div className={"w-[60%] h-[70] flex flex-row ml-4 mt-[100px]"}>
                    <i className="bi bi-cart text-[40px]"></i>
                    <div className={"flex flex-col justify-between ml-4"}>
                        <span className={'font-bold text-general text-[20px]'}>Zebra coffee</span>
                        <span className={'text-[20px]'}>{currentPoint.address}</span>
                    </div>
                </div>
                <div onClick={() => setSelectedPayment('nal')} className={`w-full bg-[#F7F8FB] h-[90px] rounded-[12px] mt-8 flex flex-col py-[18px] px-[60px] text-[25px] ${selectedPayment === 'nal' && 'border border-gray-400'}`}>
                    Оплата наличными
                </div>
                <div onClick={() => setSelectedPayment('beznal')} className={`w-full bg-[#F7F8FB] h-[90px] rounded-[12px] mt-4 flex flex-col py-[18px] px-[60px] flex flex-col justify-center text-[25px] ${selectedPayment === 'beznal' && 'border border-gray-400'}`}>
                    Оплата картой
                </div>
                <div className="w-full bg-[#F7F8FB] h-[90px] rounded-[12px] mt-4 flex flex-col py-[10px] px-[15px]">
                    <div className="w-full flex flex-row border-b  pb-2 mt-3">
                        <i className="bi bi-lock text-[25px]"></i>
                        <div className={'w-[42px] h-[1px] bg-black rotate-90 mt-[17px]'}></div>
                        <input value={email} onChange={(e)=>setEmail( e.target.value)} placeholder={'Email'} type="email" className="text-[25px] outline-none bg-[#F7F8FB] focus:outline-none w-full border-none " />
                    </div>
                </div>

                <div className={"w-full flex mt-4 flex-row justify-between"}>
                    <span className={"font-bold"}>К оплате</span>
                    <span className={"font-bold"}>450 тг</span>
                </div>

                <div onClick={()=>handlePayClick()} className={'rounded-[30px] w-[180px] h-[50px] text-[20px] flex justify-center items-center bg-general text-white flex-row'}>
                    <i className={'bi bi-credit-card text-[25px]'}></i> &nbsp; Оплатить
                </div>
            </div>
        </div>

    );
};

export default Payment;