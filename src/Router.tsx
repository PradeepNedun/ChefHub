import { Routes, Route } from "react-router-dom";
import App from "./App";
import {BookingDialog} from "./components/BookingDialog"




export const RouteFiles = () =>{
    return(
        <Routes>
            <Route path='/' element={<App />} />
            <Route path='/bookchef/:id' element={<BookingDialog />} />
        </Routes>
    );
};