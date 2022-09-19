import React from 'react';
import QrReader from 'react-qr-scanner'
import {useNavigate} from "react-router";
import {useRecoilState} from "recoil";
import {QRScannedData} from "../store/store";

const Cashier = () => {

    const navigate = useNavigate()
    const [qr,setQr] = useRecoilState(QRScannedData)

    const handleError = (data) => {

    }
    const handleScan = (data) => {
        if(!data) return
        setTimeout(() => {
            setQr(data)
            navigate('cart')
        },1000)

    }


    return (
        <div style={{border:"2px solid black"}}>
            Scan QR
            <QrReader
                delay={1000}
                style={{
                    height: 340,
                    width: 330,
                }}
                onError={(e) => handleError(e)}
                onScan={(e) => handleScan(e)}
            />
        </div>
    );
};

export default Cashier;