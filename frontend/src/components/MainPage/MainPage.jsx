import { useState } from "react"
import MapContainer from "../Map/MapContainer"
import './mainPage.css'
import SideNav from "./SideNav";


export default function MainPage(){
    const [sideBar, setSideBar] = useState(false);

    return (
        <div id="main-page">
            <div onClick={() => setSideBar(!sideBar)} id='hamburger-wrapper'>
                <div className="hamburger"></div>
                <div className="hamburger"></div>
                <div className="hamburger"></div>                    
            </div>
            {sideBar && <SideNav />} 
        <MapContainer />
        </div>
    )
}