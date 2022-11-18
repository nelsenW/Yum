import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchEvents } from "../../store/events";
import "./eventCard.css";

export default function EventCard() {
  const [expand, toggleExpand] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEvents());
  }, []);

  let images; //event images
  return (
    <div className="event-card">
      {images?.map((image) => (
        <img src={image} className="event-card-image"></img>
      ))}
      <div>
        <div>
          {/* <h1>{event.title}</h1> */}
          {/* <h6>{event.guests}</h6> */}
          {/* <svg className={`${expand ? '' : 'rot'}`} onClick={() => {
                        toggleExpand(!expand)}}
						width='12px'
						height='12px'
						viewBox='0 0 512 512'
						xmlns='http://www.w3.org/2000/svg'>
						<path d='M464,464H48a16,16,0,0,1-14.07-23.62l208-384a16,16,0,0,1,28.14,0l208,384A16,16,0,0,1,464,464Z' />
					</svg> */}
        </div>
      </div>
    </div>
  );
}
