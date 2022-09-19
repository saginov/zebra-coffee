import './App.css';
import {Route, Routes} from "react-router";
import MapPage from "./pages/MapPage";
import GeneralLayout from "./layouts/generalLayout";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import Register from "./pages/Register";
import MenuPage from "./pages/MenuPage";
import Catalog from "./pages/Catalog";
import Product from "./pages/Product";
import CartPage from "./pages/Cart";
import QRPage from "./pages/QRPage";
import Payment from "./pages/Payment";
import Cashier from "./pages/Cashier";
import CashierCart from "./pages/CashierCart";
import CashierMenu from "./pages/CashierMenu";



function App() {
  return (
    <Routes>
        <Route path="/" element={<GeneralLayout />} >
            <Route index={true} path="selectPoint" element={<MapPage />} />
            <Route path={'/login'} element={<LoginPage />} />
            <Route path={'/register'} element={<Register />} />
            <Route path={':id'} element={<MainPage />} />
            <Route path={':id/menu'} element={<MenuPage />} />
            <Route path={':id/menu/catalog'} >
                <Route path={"hot-drinks"} element={<Catalog category={'Горячие напитки'} />}/>
                <Route path={"cold-drinks"} element={<Catalog category={'Холодные напитки'} />}/>
                <Route path={"snacks"} element={<Catalog category={'Закуски'} />}/>
                <Route path={"coctails"} element={<Catalog category={'Коктейли'} />}/>
            </Route>
            <Route path={':id/menu/:productId'} element={<Product />} />
            <Route path={':id/cart/:idx'} element={<Product edit={true} /> } />
            <Route path={':id/cart'} element={<CartPage />} />
            <Route path={':id/cart/qr'} element={<QRPage />} />
            <Route path={':id/payment'} element={<Payment />} />


            <Route path={'cashier/scan'} element={<Cashier />} />
            <Route path={'cashier/scan/cart'} element={<CashierCart />} />
            <Route path={'cashier/menu'} element={<CashierMenu category={'Горячие напитки'} />} />
        </Route>
    </Routes>
  );
}
export default App;
