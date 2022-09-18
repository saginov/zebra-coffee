import React from 'react';
import {NavLink} from "react-router-dom";
import hotDrinks from '../recources/images/hotDrinks.png'
import coldDrinks from '../recources/images/coldDrinks.png'
import snacks from '../recources/images/snacks.png'
import coctails from '../recources/images/coctails.png'

const MenuPage = () => {
    return (
        <div className="w-full flex flex-col justify-around px-[28px] py-[40px]">
            <NavLink to={'catalog/hot-drinks'} className={'flex rounded-[15px] w-full h-[124px] mb-8'} >
                <img src={hotDrinks} className={'w-full h-full'} alt=""/>
            </NavLink>
            <NavLink to={'catalog/cold-drinks'} className={'flex rounded-[15px] w-full h-[124px] mb-8'} >
                <img src={coldDrinks} className={'w-full h-full'} alt=""/>
            </NavLink>
            <NavLink to={'catalog/snacks'} className={'flex rounded-[15px] w-full h-[124px] mb-8'} >
                <img src={snacks} className={'w-full h-full'} alt=""/>
            </NavLink>
            <NavLink to={'catalog/coctails'} className={'flex rounded-[15px] w-full h-[124px]'} >
                <img src={coctails} className={'w-full h-full'} alt=""/>
            </NavLink>
        </div>
    );
};

export default MenuPage;