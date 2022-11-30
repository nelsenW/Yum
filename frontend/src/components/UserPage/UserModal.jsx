import "./userModal.css";
import { useEffect, useState } from "react";
import jwtFetch from "../../store/jwt";
import P1 from '../../assets/cookingP1.jpg'
import P2 from '../../assets/cookingp2.jpg'
import P3 from '../../assets/cookingP3.jpg'
import P4 from '../../assets/cookingP4.jpg'

export default function UserModal({ userId }) {
  const [user, setUser] = useState();
  const peopleImgs = [P1, P2, P3, P4];

  const fetchUser = async (userId) => {
    try {
     const res = await jwtFetch(`/api/users/${userId}`)
     const data = await res.json();
     setUser(data[0])
    } catch (err) {
      const resBody = await err.json();
      console.log(resBody);
    }
  };

  useEffect(() => {
    fetchUser(userId);
  }, []);

  const reviewsAverage = (type) => {
    if (user && user[type].length > 0){
      return user[type].reduce((acc, el) => {
        return acc.rating + el.rating
      }) / user[type].length 
    }
  };

  
  return (
    <div id="user-modal">
      <img src={peopleImgs[Math.floor(Math.random()*3)]} className='person-img'></img>
      <div className="user-modal-info">
        <h1 id="user-modal-info-username">{user?.username}</h1>
      <h2>Host Reviews: <span>{reviewsAverage('hostReviews')} <i className="fa-regular fa-star"></i></span></h2>
      <ul className="reviews-list">
        {user?.hostReviews?.map((review) => {
          return (
            <li className="review-bubble">
              <h3>{review.title} <span>{review.rating} <i className="fa-regular fa-star"></i></span></h3>
              <p>{review.body}</p>
            </li>
          );
        })}
      </ul>
      <h2>Guest Reviews:  <span>{reviewsAverage('guestReviews')} <i className="fa-regular fa-star"></i></span></h2>
      <ul className="reviews-list">
        {user?.guestReviews?.map((review) => {
          return (
            <li className="review-bubble">
              <h3>{review.title} <span>{review.rating} <i className="fa-regular fa-star"></i></span></h3>
              <p>{review.body}</p>
            </li>
          );
        })}
      </ul>
      </div>
      
    </div>
  );
}
