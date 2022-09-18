import React from 'react';
import imgClub from '../recources/images/imgClub.png'
import imgMenu from  '../recources/images/Group 7100.png'
import imgPoint from '../recources/images/Group 7101.png'
import imgSales from '../recources/images/Group 7102.png'
import {NavLink} from "react-router-dom";


const MainPage = () => {
    return (
        <div className="w-full min-h-[80vh] h-[85vh] rounded-t-[25px] bg-general grid grid-cols-2 grid-rows-3 gap-y-[17px] gap-[17px] px-[25px] pt-[63px] pb-[102px]">
            <div style={{backgroundImage : `url('${imgClub}')`}}
                className={`flex w-full rounded-[25px] bg-cover h-[160px] text-[20px] p-4 text-center justify-center col-span-2 flex-col flex-wrap items-center text-white `}>
            </div>
            <NavLink to={'menu'} >
                <div style={{backgroundImage : `url('${imgMenu}')`}}
                     className={`flex w-full bg-cover rounded-[25px] h-[160px] bg-cover text-[20px] justify-center flex-col flex-wrap items-center text-white`}>
                </div>
            </NavLink>
            <NavLink to={'/selectPoint'} >
                <div style={{backgroundImage : `url('${imgPoint}')`}}
                     className={`flex w-full bg-cover rounded-[25px] mb-[17px]  h-[160px] text-[20px] justify-center flex-col flex-wrap items-center text-white`}>
                </div>
            </NavLink>
            <div style={{backgroundImage : `url('${imgSales}')`}}
                 className={`flex w-full bg-cover rounded-[25px]  h-[160px] text-[20px] p-4 text-center justify-center col-span-2 flex-col flex-wrap items-center text-white `}>
            </div>

        </div>
    );
};

export default MainPage;