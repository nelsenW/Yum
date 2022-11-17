import { useState } from "react"
import { Modal } from "../../context/Modal";
import MapContainer from "../Map/MapContainer"
import EventForm from "../UserPage/TabFiles/EventForm";
import UserPage from "../UserPage/UserPage";
import './mainPage.css'
import SideNav from "./SideNav";


export default function MainPage(){
    const [sideBar, setSideBar] = useState(false);
    const [userModal, setUserModal] = useState();

    const hidden = () => {
        return sideBar ? ' hidden' : ''
    }


    return (
        <div id="main-page">
            <div onClick={() => setSideBar(!sideBar)} id='hamburger-wrapper'>
                <div className={`hamburger${hidden()}`}></div>
                <div className={`hamburger${hidden()}`}></div>
                <div className={`hamburger${hidden()}`}></div>                    
            </div>
            <SideNav hidden={hidden}/>
            <MapContainer />
            <button onClick={() => setUserModal(true)} id='make-event'>
                +
            </button>
            {userModal && (
					<Modal onClose={() => setUserModal(false)}>
						<UserPage setUserModal={setUserModal} inputTab={<EventForm />}/>
					</Modal>
				)}
        </div>
    )
}