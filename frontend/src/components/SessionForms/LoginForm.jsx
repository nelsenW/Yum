import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./SessionForm.css";
import Swal from "sweetalert2";
import { login, clearSessionErrors } from "../../store/session";
import Errors from "../Errors/Errors";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector((state) =>
    state.errors.session ? state.errors.session : []
  );
  const dispatch = useDispatch();
  const [showErrors, setShowErrors] = useState(false);

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = (field) => {
    const setState = field === "email" ? setEmail : setPassword;
    return (e) => setState(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(login({ email, password })).then((res) => {
      if (!res.errors) {
        Swal.fire({
          title: "Note!",
          text: "To experience Yum, please enable your location services. Thank you!",
          buttons: {
            confirm: { className: "ok-btn" },
          },
          icon: "info",
          iconColor: "#f48c06",
          confirmButtonText: "Ok",
          confirmButtonColor: "var(--dodger-blue)",
        });
      } else {
        setShowErrors(true);
      }
    });
  };

  const demoUser = () => {
    setEmail("demo@user.io");
    setPassword("password");
  };

  const handleShowErrors = () => {
    setShowErrors(false);
  };

  return (
    <form className="session-form" onSubmit={handleSubmit}>
      <div className="h2-wrapper">
        <h2>Log In Form</h2>
      </div>
      {showErrors && (
        <Errors errors={errors} handleShowErrors={handleShowErrors} />
      )}

      <label>
        <span>Email</span>
        <input
          type="text"
          value={email}
          onChange={update("email")}
          placeholder="Email"
        />
      </label>
      <label>
        <span>Password</span>
        <input
          type="password"
          value={password}
          onChange={update("password")}
          placeholder="Password"
        />
      </label>

      <div>
        <button type="submit">Log In!</button>
        <button type="submit" onClick={demoUser}>
          Demo User
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
