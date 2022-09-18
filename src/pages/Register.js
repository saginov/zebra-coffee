import React, {useMemo, useState} from 'react';
import {NavLink} from "react-router-dom";
import axios from "axios";
import {User} from "../store/store";
import {useRecoilState} from "recoil";
import {useNavigate} from "react-router";

const Register = () => {

    const [form ,setForm] = useState({
        login: undefined,
        password: undefined,
        phoneNumber: undefined,
        email: undefined
    })
    const navigate = useNavigate()
    const [user,setUser] = useRecoilState(User)
    const isReady = useMemo(()=>{
        return form.login && form.password && form.email && form.phoneNumber
    },[form])
    if(!user.token){
        navigate(-1) // ---- add personal page navigation
    }
    const handleRegisterClick = async () => {
        if(!isReady) return
        const response = await axios.post('https://reqres.in/api/articles', form);
        if(response.status === 200) {
            setUser({...response.data})
            localStorage.setItem('user',JSON.stringify({...response.data}))
            navigate('/')
        } 

    }


        return (
            <div className={'w-full h-[85vh] p-[40px] flex flex-col '}>
                <div>
                    <div className="font-bold mb-[10px] text-[35px]">Зарегистрироваться</div>
                    <div className="mb-[40px] text-[20px] text-gray-400 ">Создайте свой аккаунт</div>
                </div>
                <div>
                    <div className="w-full flex flex-row border-b border-black pb-2 mb-[35px]">
                        <i className="bi bi-person-circle text-[25px]"></i>
                        <div className={'w-[42px] h-[1px] bg-black rotate-90 mt-[17px]'}></div>
                        <input onChange={(e)=>setForm({...form, login: e.target.value})} placeholder={'Логин'} type="text" className="text-[25px] outline-none focus:outline-none w-full border-none " />
                    </div>
                    <div className="w-full flex flex-row border-b border-black pb-2 mb-[35px]">
                        <i className="bi bi-lock text-[25px]"></i>
                        <div className={'w-[42px] h-[1px] bg-black rotate-90 mt-[17px]'}></div>
                        <input onChange={(e)=>setForm({...form, password: e.target.value})} placeholder={'Пароль'} type="password" className="text-[25px] outline-none focus:outline-none w-full border-none " />
                    </div>
                    <div className="w-full flex flex-row border-b border-black pb-2 mb-[35px]">
                        <i className="bi bi-envelope text-[25px]"></i>
                        <div className={'w-[42px] h-[1px] bg-black rotate-90 mt-[17px]'}></div>
                        <input onChange={(e)=>setForm({...form, email: e.target.value})} placeholder={'Адрес электронной почты'} type="text" className="text-[25px] outline-none focus:outline-none w-full border-none " />
                    </div>
                    <div className="w-full flex flex-row border-b border-black pb-2 mb-[35px]">
                        <i className="bi bi-phone text-[25px]"></i>
                        <div className={'w-[42px] h-[1px] bg-black rotate-90 mt-[17px]'}></div>
                        <input onChange={(e)=>setForm({...form, phoneNumber: e.target.value})} placeholder={'Номер мобильного телефона'} type="text" className="text-[25px] outline-none focus:outline-none w-full border-none " />
                    </div>
                    <div className={' w-full text-general text-[17px]'}>Регистрируясь, вы соглашаетесь с нашими условиями использования
                    </div>
                </div>
                <div className={'flex flex-grow justify-center items-center h-full relative'}>
                    <div onClick={() => handleRegisterClick()} className="flex absolute right-0 top-[50%] rounded-full w-[64px] h-[64px] bg-general text-white justify-center items-center">
                        <i className="bi bi-arrow-right text-[35px]"></i>
                    </div>
                </div>
                <div className="text-gray-400 text-center w-full mt-[40px]">Уже есть аккаунт? <NavLink to={'/login'} className="text-general font-bold">Войти</NavLink></div>
            </div>
        );
    };


export default Register;