import React from 'react';
import nutLatte from '../recources/images/nut-latte.png'
import {useNavigate, useParams} from "react-router";
import {useRecoilValue} from "recoil";
import {FilteredGoodsByCategory} from "../store/store";
import {NavLink} from "react-router-dom";


const Catalog = ({category}) => {
    const navigate = useNavigate()
    const params = useParams()
    const goods = useRecoilValue(FilteredGoodsByCategory(category))


    return (
        <div className="w-full h-[85hv] flex flex-col p-[30px]">
            <div className="w-full flex flex-row mb-[20px] overflow-x-scroll pb-2">
                <NavLink to={'../hot-drinks'} className={`w-auto shrink-0 rounded-full mr-[20px] text-sm p-2 px-4 ${category === 'Горячие напитки' ? 'bg-gray-300' : '' }`}>Горячиее напитки</NavLink>
                <NavLink to={'../cold-drinks'} className={`w-auto shrink-0 rounded-full mr-[20px] text-sm p-2 px-4 ${category === 'Холодные напитки' ? 'bg-gray-300' : '' }`}>Холодные напитки</NavLink>
                <NavLink to={'../snacks'} className={`w-auto shrink-0 rounded-full mr-[20px] text-sm p-2 px-4 ${category === 'Закуски' ? 'bg-gray-300' : '' }`}>Закуски</NavLink>
                <NavLink to={'../coctails'} className={`w-auto shrink-0 rounded-full mr-[20px] text-sm p-2 px-4 ${category === 'Коктейли' ? 'bg-gray-300' : '' }`}>Коктейли</NavLink>
            </div>
            <div className="w-full h-full grid overflow-y-scroll grid-cols-2 gap-x-[32px] gap-y-[10px]">
                {
                   goods && goods.map(item =>
                        <div onClick={() => navigate("../../"+params.id+"/menu/" + item.id)} key={item.id} className="w-full min-h-[210px] flex flex-col my-4">
                            <div className="w-[141px] h-[141px] rounded-[25px] flex justify-center items-center bg-gradient-to-t from-gray-200 via-gray-400 to-gray-600">
                                <img src={item.picture_url} alt="alt" className={"max-w-[95px] max-h-[120px]"} />
                            </div>
                            <div className={'mt-10px'}>{item.product_name}</div>
                            <div className={'text-md font-bold'}>{item.Price} тг</div>
                        </div>
                    )
                }


            </div>

        </div>
    );
};

export default Catalog;