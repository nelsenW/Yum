import { useState } from "react"
import MapContainer from "../Map/MapContainer"
import './mainPage.css'
import SideNav from "./SideNav";


export default function MainPage(){
    const [sideBar, setSideBar] = useState(false)

    const rot = () => {
        return sideBar ? ' rotated' : ' unrotated'
    }


    return (
        <div id="main-page">
            <div onClick={() => setSideBar(!sideBar)} id='hamburger-wrapper'>
                <div className={`hamburger${rot()}`}></div>
                <div className={`hamburger${rot()}`}></div>
                <div className={`hamburger${rot()}`}></div>                    
            </div>
            <SideNav rot={rot}/>
        <MapContainer />
        </div>
    )
}