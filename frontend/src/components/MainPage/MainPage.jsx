import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import Map from "../Map/Map"
import SearchBar from "../SearchBar"
import { fetchEvents } from "../../store/events";

export default function MainPage(){

    const dispatch = useDispatch();
    const events = useSelector(state=>state.events)

    useEffect(()=>{
        dispatch(fetchEvents())
    },[])

    // debugger
    if (Object.keys(events.all) < 1) return null

    return (
        <>
            {/* <Map /> */}
            <SearchBar placeholder="Find a Specific Event" data={events.all}/>
        </>
    )
}
