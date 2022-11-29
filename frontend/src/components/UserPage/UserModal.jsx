import "./userModal.css";
import { useEffect } from "react";
import jwtFetch from "../../store/jwt";

export default function UserModal({ userId }) {
  let user;

  const fetchUser = (userId) => async (dispatch) => {
    try {
      await jwtFetch(`/api/users/${userId}`)
        .then((res) => res.json())
        .then((data) => (user = data));
    } catch (err) {
      const resBody = await err.json();
      console.log(resBody);
    }
  };

  useEffect(() => {
    fetchUser(userId);
  }, []);

  return (
    <div>
      <h1>{user?.userName}</h1>
      <h2>Host Reviews:</h2>
      <ul>
        {user?.hostReviews.map((review) => {
          return (
            <li>
              <h3>{review.title}</h3>
              <span>{review.rating}</span>
              <p>{review.body}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
