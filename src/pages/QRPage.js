import React from 'react';
import QRCodeSVG from "qrcode.react";
import {useParams} from "react-router";
import {useRecoilValue} from "recoil";
import {Cart, User} from "../store/store";

const QrPage = () => {
    const user = useRecoilValue(User)
    const userId = user.id ?? undefined
    const cart = useRecoilValue(Cart)
    const res = {
        anonUser: !!userId || true,
        userId: userId ?? 0,
        cart: cart,
    }

    return (
        <div className={'w-full h-[85hv] p-4 flex flex-col justify-center text-center'}>
            <div className={'w-full text-[25px] text-bold mb-[20px]'}>
                Кассир отсканирует ваш QR и примет заказ.
            </div>
            <div className={'w-full text-[25px] text-bold mb-[20px]'}>
                Товары в корзине сразу попадут в текущий заказ.
            </div>
            <div className={'w-[100%] h-[100%] flex justify-center'}>
                <QRCodeSVG value={JSON.stringify(res)} renderAs={'svg'} className={'w-[300px] h-[300px]'} />
            </div>
        </div>
    );
};

export default QrPage;