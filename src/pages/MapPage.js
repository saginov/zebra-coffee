import React, {useEffect, useRef, useState} from 'react';
import {Map, Placemark, YMaps} from "react-yandex-maps";
import logo from '../recources/images/placemark.png'
import image from '../recources/images/location.jpg'
import {NavLink} from "react-router-dom";
import {item} from "prompts/lib/util/style";

const MapPage = () => {
    const ref = useRef(null)
    const slider = useRef(null)
    const processTMove = (e, init) => {
        if((Math.abs(e.targetTouches[0].clientY - init) < 50)) return
        const y = e.targetTouches[0].clientY
        const d = y - init
        const h = (-(d) + (-350))
        if(d < 0 && d > -350) {
            ref.current.style.bottom = h + 'px'
        }
    }



    const [selected, setSelected] = useState(null)
    const [mapState, setMapState] = useState({center: [51.128207, 71.430420], zoom: 12})
    const [points, setPoints] = useState([
        {
            id: 1,
            address: "ул Аманбава 36",
            x: 51.087404,
            y: 71.414391
        },
        {
            id: 2,
            address: "ул E-3, 25",
            x: 51.088474,
            y: 71.425170,
        },
        {
            id:3,
            address: "ул Кабанбай батыра 36",
            x: 51.104864,
            y: 71.431478,
        },
        {
            id: 4,
            address: "ул Бокейхана, 48",
            x: 51.088474,
            y: 71.445770,
        },
        {
            id:5,
            address: "ул Кабанбай батыра 64",
            x: 51.114864,
            y: 71.441678,
        },
        {
            id:6,
            address: "ул Кабанбай батыра 36",
            x: 51.114864,
            y: 71.451478,
        },
        {
            id: 7,
            address: "ул Бокейхана, 48",
            x: 51.128474,
            y: 71.465770,
        },
        {
            id:8,
            address: "ул Кабанбай батыра 64",
            x: 51.104564,
            y: 71.481678,
        }
    ])

    const handeSelect = (item) => {
        setMapState({center: [item.x-0.000650, item.y], zoom: 17})
        setSelected(item)
    }
    const handleClearSelect = () => {
        setMapState({center: [51.128207, 71.430420], zoom: 12})
        setSelected(undefined)
    }

    useEffect(()=> {
        if(slider && ref && ref.current && slider.current) {
            slider && slider.current.addEventListener('touchstart', (ev) => {
                if(!(ev.target === slider.current)) return
                let p = undefined
                slider.current.addEventListener('touchmove', (e) => processTMove(e,ev.targetTouches[0].clientY))
            })
            slider.current.addEventListener('touchend', (e) => {
                if(ref.current.getBoundingClientRect().y >= 570)  ref.current.style.bottom = '-350px'; else  ref.current.style.bottom = 0
            })
            return () => {
                if (slider && slider.current) {
                    slider.current.removeEventListener('touchstart', processTMove)
                }
            }
        }
    })

    return (
        <div className="w-full h-full overflow-hidden relative">
            <YMaps>
                <div>
                    <Map state={mapState}
                         options={{ maxZoom: 23, minZoom: 9, avoidFractionalZoom: true }}
                         className={"h-[92vh] w-screen"}
                    >
                        {
                            points && points.map(item =>
                                <Placemark key={item.id} onClick={()=>handeSelect(item)} geometry={[item.x,item.y]} options={{
                                    iconLayout: 'default#image',
                                    iconImageHref: logo,
                                    iconImageSize: [15, 15],
                                    iconImageOffset: [-10, -10],
                                }} />
                            )
                        }



                    </Map>
                </div>
            </YMaps>

            <div
                ref={ref}
                className={`w-full flex flex-col p-0 m-0 transition duration-[1ms] rounded-t-[25px] h-[450px] absolute z-0 bottom-[-350px] left-0 bg-general `}>
                <div ref={slider} className="w-full shrink-0 h-[70px] rounded-t-[25px] flex justify-center items-center text-white text-sm ">
                    Выберите точку самовывоза
                </div>
                <div className="flex flex-col overflow-y-scroll rounded-t-[25px] bg-white px-[21px] py-[29px] h-full">
                    {selected ?
                        <div className="h-full flex flex-col justify-between">
                            <div className="text-xl flex basis-1/4 justify-between">
                                {selected.address}
                                <div><i onClick={() => handleClearSelect()} className="bi bi-x-lg"></i></div>
                            </div>
                            <div className="flex justify-center items-center basis-2/4 h-[300px] overflow-hidden">
                                <img src={image} alt="alt"/>
                            </div>
                            <div className="flex items-center justify-center mt-[20px]">
                                <NavLink to={'/' + selected.id} >
                                    <div className="flex items-center justify-center text-white bg-general py-[13px] px-[21px] rounded-[16px] text-xl ">Подтвердить</div>
                                </NavLink>
                            </div>
                        </div>
                        :
                        <>
                                {
                                    points && points.map(item =>
                                        <div key={item.id}
                                             onClick={()=>handeSelect(item)}
                                             className="w-full rounded-[16px] p-[17px] text-white flex flex-row justify-between items-center mb-2 h-[70px] bg-gradient-to-r from-indigo-300 to-purple-400 " >
                                            <i className="bi bi-house"></i> {item.address} <div> > </div>
                                        </div>
                                    )
                                }
                        </>
                    }
                </div>
            </div>
        </div>
    );
};

export default MapPage;