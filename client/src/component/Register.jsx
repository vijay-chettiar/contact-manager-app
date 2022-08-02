import React from "react";
import { useState, useContext } from "react";
import dotsimg2 from "./Assets/dots.svg";
import dotsimg1 from "./Assets/dots.svg";
import topcircleimg1 from "./Assets/topleftimg.svg";
import bottomcircleimg2 from "./Assets/bottomrightimg.svg";
import "./Register.css";
import UserContext from "../context/UserContext";

const Register = () => {
    const { userRegister } = useContext(UserContext);
    const [inputData, setInputData] = useState({ email: "", password: "" });
    const [confirmpassword, setconfirmpassword] = useState({
        confirmPassword: "",
    });
    const [passwordState, setpasswordState] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            !inputData.email ||
            !inputData.password ||
            !confirmpassword.confirmPassword
        ) {
            window.alert("please provide all the fields");
            return;
        }

        if (confirmpassword.confirmPassword !== inputData.password) {
            setpasswordState(false);
            setTimeout(() => {
                setpasswordState(true);
            }, 2000);
            return;
        } else {
            userRegister(inputData);
        }
    };

    return (
        <>
            <div className="container">
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
                            <h4>Create New account</h4>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div>
                                <input
                                    style={{
                                        width: "313px",
                                        height: "35px",
                                        border: "1px solid black",
                                    }}
                                    id="tag1"
                                    required={true}
                                    onChange={(e) =>
                                        setInputData({ ...inputData, email: e.target.value })
                                    }
                                    type="text"
                                    placeholder="MAIL ID"
                                ></input>
                            </div>
                            <div>
                                <input
                                    style={{
                                        width: "313px",
                                        height: "35px",
                                        border: "1px solid black",
                                    }}
                                    id="tag2"
                                    required={true}
                                    onChange={(e) =>
                                        setInputData({ ...inputData, password: e.target.value })
                                    }
                                    type="password"
                                    placeholder="Password"
                                ></input>
                            </div>
                            <div>
                                <input
                                    required={true}
                                    onChange={(e) =>
                                        setconfirmpassword({
                                            ...confirmpassword,
                                            confirmPassword: e.target.value,
                                        })
                                    }
                                    style={
                                        passwordState
                                            ? {
                                                border: "1px solid black",
                                                width: "313px",
                                                height: "35px",
                                                marginTop: "20px",
                                                paddingLeft: "8px",
                                                borderRadius: "6px"
                                            }
                                            : {
                                                border: "1px solid red",
                                                width: "313px",
                                                height: "35px",
                                                marginTop: "20px",
                                                paddingLeft: "8px",
                                                borderRadius: "6px"
                                            }
                                    }
                                    type="password"
                                    placeholder="Confirm Password"
                                ></input>
                            </div>
                            <button id="tag3" type="submit">
                                Sign Up
                            </button>
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

export default Register;
