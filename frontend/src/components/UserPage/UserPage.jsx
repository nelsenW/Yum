import { useDispatch } from "react-redux";
import "./userPage.css";
import { useEffect, useState } from "react";
import { logout } from "../../store/session";
import MyPosts from "./TabFiles/MyPosts";
import ReviewForm from "./TabFiles/ReviewForm";
import EventForm from "./TabFiles/EventForm";
import MyReviews from "./TabFiles/MyReviews";

function UserPage({ setUserModal, inputTab }) {
  const dispatch = useDispatch();
  const [tab, setTab] = useState(
    inputTab ?? <EventForm setUserModal={setUserModal} />
  );

  const logoutUser = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <div className="user-form-modal">
      <aside className="user-form-modal-nav">
        <ul className="modal-nav-tabs">
          <li
            onClick={() =>
              setTab(
                <MyPosts
                  setTab={setTab}
                  setUserModal={setUserModal}
                  type={"hosted"}
                />
              )
            }
          >
            My Hosted Events
          </li>
          <div className="seperator"></div>

          <li
            onClick={() =>
              setTab(
                <MyPosts
                  setTab={setTab}
                  setUserModal={setUserModal}
                  type={"attending"}
                />
              )
            }
          >
            Attending Events
          </li>
          <div className="seperator"></div>
          <li
            onClick={() =>
              setTab(
                <MyReviews
                  setTab={setTab}
                  setUserModal={setUserModal}
                  type={"MyReviews"}
                />
              )
            }
          >
            My Reviews
          </li>
          <div className="seperator"></div>
          <li
            onClick={() =>
              setTab(
                <MyReviews
                  setTab={setTab}
                  setUserModal={setUserModal}
                  type={"ReviewsOfMe"}
                />
              )
            }
          >
            Reviews of Me
          </li>
          <div className="seperator"></div>
          <li onClick={() => setTab(<EventForm setUserModal={setUserModal} />)}>
            Make an Event
          </li>
          <div className="seperator"></div>
          <li onClick={logoutUser}>
            <span id="logout-user">Log Out</span>
            <svg role="img" width="16" height="16" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M18 2H7C5.897 2 5 2.898 5 4V11H12.59L10.293 8.708L11.706 7.292L16.414 11.991L11.708 16.706L10.292 15.294L12.582 13H5V20C5 21.103 5.897 22 7 22H18C19.103 22 20 21.103 20 20V4C20 2.898 19.103 2 18 2Z"
              ></path>
            </svg>
          </li>
          <div className="seperator"></div>
        </ul>
      </aside>
      <main className="user-form-modal-main">
        <div className="modal-main-column">{tab}</div>

        <div id="esc-toolbar" onClick={() => setUserModal(false)}>
          <div id="esc-button">
            <svg role="img" width="18" height="18" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"
              ></path>
            </svg>
          </div>
          <h2>ESC</h2>
        </div>
      </main>
    </div>
  );
}

export default UserPage;
