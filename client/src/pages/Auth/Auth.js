import React from "react";
import "./Login.css";
import { api } from "../../api";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
function Auth() {
  let navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState(true);
  const phoneField = useRef(null);
  const emailField = useRef(null);
  const addressField = useRef(null);
  const usernameField = useRef(null);
  const passwordField = useRef(null);

  const [text, setText] = useState("");
  const fullText = "If not here,then where?";

  useEffect(() => {
    const interval = setInterval(() => {
      setText((prevText) => {
        if (prevText === fullText) {
          clearInterval(interval);
          return fullText;
        }
        return fullText.slice(0, prevText.length + 1);
      });
    }, 150);
    return () => clearInterval(interval);
  }, []);

  async function sendRegistrationForm(event) {
    event.preventDefault();
    let username;
    let email;
    let password;
    let phone;
    let address;
    username = usernameField.current.value;
    email = emailField.current.value;
    phone = phoneField.current.value;
    address = addressField.current.value;
    password = passwordField.current.value;
    let data;

    const phoneNumberPattern = /^\d{10}$/;
    const emailPattern =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    phone = phoneField.current.value.trim();
    email = emailField.current.value.trim();

    if (!phoneNumberPattern.test(phone)) {
      alert("Please enter a valid phone number");
    } else if (!emailPattern.test(email)) {
      alert("Please enter a valid email address");
    } else {
      data = {
        name: username,
        phone: phone,
        email: email,
        address: address,
        password: password,
      };

      try {
        const response = await api.post(`/auth/register`,data);
        if (response.status === 200) {
          setText("");
          setIsRegistered(true);
          console.log("Form data:\n", data);
          console.log("\nResponse : ", response);
          console.log("Successfully sent data");
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
  async function sendLoginForm(event) {
    event.preventDefault();
    let username;
    let password;
    username = usernameField.current.value;
    password = passwordField.current.value;
    let data;

    data = {
      name: username,
      password: password,
    };
    if (username.length === 0 && password.length === 0) {
      alert("Please enter the username and password!");
      return;
    }
    if (username.length === 0) {
      alert("Please enter the username!");
      return;
    }
    if (password.length === 0) {
      alert("Please enter the password!");
      return;
    }

    try {
      const response = await api.post(`/auth/login`, data);
      if (response.status === 200) {
        if (response.status === 200) {
          setIsRegistered(true);
          navigate("/");
        } else if (response.status === 400) {
          alert("Incorrect password,Please try again!");
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="login-container">
      <div className="top-container">
        <div className="left-container">
          {!isRegistered && (
            <>
              <div className="app-name">ShopHere </div>
              <div className="app-description">Join us Now!</div>
            </>
          )}
          {isRegistered && (
            <>
              <div className="app-name">ShopHere </div>
            </>
          )}
        </div>
        {!isRegistered && (
          <div className="right-container">
            <form
              className="form"
              onSubmit={sendRegistrationForm}
              autoComplete="off"
            >
              <div className="form-fields-container">
                <div className="label-container">
                  <label htmlFor="Username">Username </label>
                  <label htmlFor="email">Email </label>
                  <label htmlFor="phone">Phone Number </label>
                  <label htmlFor="address">Address </label>
                  <label htmlFor="password">Password </label>
                </div>
                <div className="input-container">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="    Monkey D. Luffy"
                    autoComplete="off"
                    ref={usernameField}
                  />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="    shop@here.com"
                    autoComplete="off"
                    ref={emailField}
                  />

                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="    9876543210"
                    autoComplete="off"
                    ref={phoneField}
                  />
                  <input
                    type="text"
                    id="address"
                    name="address"
                    placeholder="    Your Address"
                    autoComplete="off"
                    ref={addressField}
                  />
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="    Password here"
                    autoComplete="off"
                    ref={passwordField}
                  />
                </div>
              </div>
              <div className="buttons-login">
                <button
                  type="button"
                  className="btn"
                  onClick={() => {
                    setIsRegistered(true);
                  }}
                >
                  Login
                </button>
                <button
                  type="submit"
                  className="btn"
                  onClick={() => {
                    setIsRegistered(false);
                  }}
                >
                  Signup
                </button>
              </div>
              <div className="link-to-reg">
                Already a user ?{" "}
                <button
                  className="switch-form-link"
                  onClick={() => setIsRegistered(true)}
                >
                  Click here{" "}
                </button>
                to Login
              </div>
            </form>
          </div>
        )}
        {isRegistered && (
          <div className="right-container">
            <form className="form" onSubmit={sendLoginForm} autoComplete="off">
              <div className="form-fields-container">
                <div className="label-container">
                  <label htmlFor="Username" className="u-label">
                    Username{" "}
                  </label>
                  <label htmlFor="password">Password </label>
                </div>
                <div className="input-container">
                  <input
                    type="text"
                    id="Username"
                    name="Username"
                    placeholder="    Monkey D. Luffy"
                    autoComplete="off"
                    ref={usernameField}
                  />
                  <div className="Username-err-label">Error label-todo</div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="    Password here"
                    autoComplete="off"
                    ref={passwordField}
                  />
                  <div className="password-err-label">Error label-todo</div>
                </div>
              </div>
              <div className="buttons-login">
                <button type="submit" className="btn">
                  Login
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => {
                    setIsRegistered(false);
                  }}
                >
                  Signup
                </button>
              </div>
              <div className="link-to-reg">
                Not a user ?{" "}
                <button
                  className="switch-form-link"
                  onClick={() => setIsRegistered(false)}
                >
                  Click here{" "}
                </button>
                to register
              </div>
            </form>
          </div>
        )}
      </div>

      <div className="bottom-container">
        {isRegistered && (
          <>
            <div className="logged-app-description">{text}</div>
          </>
        )}
      </div>
    </div>
  );
}

export default Auth;
