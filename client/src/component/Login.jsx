import React from "react";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import dotsimg2 from "./Assets/dots.svg";
import dotsimg1 from "./Assets/dots.svg";
import topcircleimg1 from "./Assets/topleftimg.svg";
import bottomcircleimg2 from "./Assets/bottomrightimg.svg";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import "./Login.css";
import { useRef } from "react";
import UserContext from "../context/UserContext";

const Login = () => {
    const { userLogin } = useContext(UserContext);
    const [eye, setEye] = useState(false);
    const [signin, setSignin] = useState({ email: "", password: "" });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!signin.email || !signin.password) {
            window.alert("Please provide all the required fields");
            return;
        }
        userLogin(signin);
    };

    const passwordRef = useRef();
    const handleEye = () => {
        setEye(!eye);
    };
    return (
        <>
            <div className="container">
                <div className="eye" onClick={handleEye}>
                    {eye ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
                </div>
                <div className="top-corner">
                    <img
                        src={topcircleimg1}
                        width="200px"
                        height="200px"
                        alt="byicons"
                    ></img>
                </div>
                <div className="rectangle-container">
                    <div className="left-part">
                        <img src={dotsimg1} width="100px" height="90px" alt="byicons" />
                    </div>
                    <div className="middle-part">
                        <div style={{ marginBottom: "50px" }}>
                            <h1>Logo</h1>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <h5>Enter your credentials to access your account</h5>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div>
                                {" "}
                                <input
                                    style={{
                                        width: "313px",
                                        height: "35px",
                                        border: "1px solid black",
                                    }}
                                    id="tag1"
                                    required={true}
                                    onChange={(e) => {
                                        setSignin({ ...signin, email: e.target.value });
                                    }}
                                    type="text"
                                    placeholder="User ID"
                                ></input>
                            </div>
                            <div>
                                <input
                                    style={{
                                        width: "313px",
                                        height: "35px",
                                        border: "1px solid black",
                                        marginBottom: "35px",
                                    }}
                                    id="tag2"
                                    required={true}
                                    onChange={(e) => {
                                        setSignin({ ...signin, password: e.target.value });
                                    }}
                                    type={eye ? "text" : "password"}
                                    placeholder="Password"
                                    ref={passwordRef}
                                ></input>
                            </div>
                            <div>
                                {" "}
                                <button
                                    id="tag3"
                                    type="submit"
                                    style={{ border: "none", cursor: "pointer" }}
                                >
                                    Sign In
                                </button>{" "}
                            </div>
                            <div id="tag4">
                                <Link
                                    style={{
                                        textDecoration: "none",
                                        color: "#7D8CC4",
                                        fontSize: "15px",
                                    }}
                                    to={"/register"}
                                >
                                    Sign Up
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="right-part">
                    <img src={dotsimg2} width="100px" height="100px" alt="byicons" />
                </div>
                <div className="bottom-corner">
                    <img
                        src={bottomcircleimg2}
                        width="200px"
                        height="200px"
                        alt="byicons"
                    />
                </div>
            </div>
        </>
    );
};

export default Login;
