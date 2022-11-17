import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { Modal } from "../../context/Modal";
import MapContainer from "../Map/MapContainer"
import SearchBar from "../SearchBar/SearchBar"
import { fetchEvents } from "../../store/events";
import EventForm from "../UserPage/TabFiles/EventForm";
import UserPage from "../UserPage/UserPage";
import './mainPage.css'
import SideNav from "./SideNav";


export default function MainPage(){
    const dispatch = useDispatch();
    const events = useSelector(state=>state.events)

    useEffect(()=>{
        dispatch(fetchEvents())
    },[])

    return (
        <div id="main-page">
            <SearchBar placeholder="Find a Specific Event" data={events?.all}/>
            {/* <div onClick={() => setSideBar(!sideBar)} id='hamburger-wrapper'>
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
			)} */}
        </div>
    )
}
