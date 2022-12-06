import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./SessionForm.css";
import { signup, clearSessionErrors } from "../../store/session";
import Errors from "../Errors/Errors";
import Swal from "sweetalert2";

function SignupForm() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const errors = useSelector((state) =>
    state.errors.session ? state.errors.session : []
  );
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = (field) => {
    let setState;
    if (password !== password2) {
      errors.passwordMatch = "Confirm Password field must match";
    }

    switch (field) {
      case "email":
        setState = setEmail;
        break;
      case "username":
        setState = setUsername;
        break;
      case "password":
        setState = setPassword;
        break;
      case "password2":
        setState = setPassword2;
        break;
      default:
        throw Error("Unknown field in Signup Form");
    }

    return (e) => setState(e.currentTarget.value);
  };

  const usernameSubmit = (e) => {
    e.preventDefault();
    const user = {
      email,
      username,
      password,
    };

    dispatch(signup(user)).then((res) => {
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
      }
    });
  };

  return (
    <form className="session-form" onSubmit={usernameSubmit}>
      <div className="h2-wrapper">
        <h2>Sign Up Form</h2>
      </div>

      <Errors errors={errors} />
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
        <span>Username</span>
        <input
          type="text"
          value={username}
          onChange={update("username")}
          placeholder="Username"
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
      <label>
        <span>Confirm Password</span>
        <input
          type="password"
          value={password2}
          onChange={update("password2")}
          placeholder="Confirm Password"
        />
      </label>
      <button type="submit">Signup</button>
    </form>
  );
}

export default SignupForm;
