import React, {useEffect} from 'react';
import {Outlet, useLocation, useNavigate, useParams} from "react-router";
import {useRecoilValue} from "recoil";
import {isAuthed} from '../store/store'
import Footer from "../components/Footer";
const GeneralLayout = () => {
    const navigate = useNavigate()
    const params = useParams()
    const currentRoute = useLocation()

    useEffect(()=> {
        if(currentRoute.pathname === '/' || currentRoute.pathname === '') navigate('selectPoint')
    })

    const changeColor = currentRoute.pathname === '/selectPoint' ? 'bg-general' : undefined
    const authPage = !!(currentRoute.pathname === '/login' || currentRoute.pathname === '/register')
    const isAuth = useRecoilValue(isAuthed)
    const isMain = !!(currentRoute.pathname === '/' || currentRoute.pathname === '' || currentRoute.pathname === '/selectPoint')

    const handleCartClick = () => {
        if(!params.id) return
        navigate(params.id+'/cart')
    }

    const handleProfileClick = () => {
        isAuth ? navigate('profile') : navigate('login')
    }

    return (
        <div className="w-full h-full overflow-hidden flex flex-col relative">
            <div className={"w-full h-[60px] flex flex-row items-center justify-between " + changeColor}>
                <div className="basis-1/4 pl-4">
                    {
                        !isMain && <i onClick={() => navigate(-1)} className="bi bi-arrow-left text-general text-[25px]"></i>
                    }
                </div>
                <div className={"basis-auto flex justify-center items-center font-poppins uppercase text-sm leading-[22.78px] " + (changeColor ? 'text-white' : 'text-general')}>
                    Zebra Coffee
                </div>
                <div className="basis-1/4 flex flex-row justify-between items-center pr-6">
                    {
                        !changeColor && <div onClick={()=>handleCartClick()} className="text-general text-xl ml-2"><i className="bi bi-cart"></i></div>
                    }
                    {
                        !isAuth && <div onClick={()=>handleProfileClick()} className="text-general text-[25px] ml-2"><i className="bi bi-person"></i></div>
                    }
                </div>
            </div>
            <Outlet />
            {!(changeColor || authPage) && <Footer />}
        </div>
    );
};

export default GeneralLayout;