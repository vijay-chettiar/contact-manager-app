import React from "react";
import "./Sidebar.css";
import dashboardIcon from "../assets/sidebar/dashboardIcon.png";
import contactIcon from "../assets/sidebar/contactIcon.png";
import straightLine from "../assets/sidebar/straightLine.png";
import logoutIcon from "../assets/sidebar/logoutIcon.png";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login", { replace: true });
    };

    return (
        <>
            <div className="sidebar">
                <div className="logo-div">
                    <h2 className="logo">Logo</h2>
                </div>
                <div className="function">
                    <div className="dashboard">
                        <div className="dashIcon">
                            <img
                                src={dashboardIcon}
                                style={{ width: "17px", height: "17px" }}
                                alt="dash icon"
                            />
                        </div>
                        <div className="dashText">Dashboard</div>
                    </div>
                    <div className="contactBtn">
                        <button className="contact">
                            <div className="btnContent">
                                <div>
                                    <img src={contactIcon} alt="contact-icon" />
                                </div>
                                <div>Total Contacts</div>
                                <div>
                                    <img src={straightLine} alt="line" />
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
                <div className="logout">
                    <div className="logoutContent" onClick={handleLogout}>
                        <div>
                            <img src={logoutIcon} alt="contact-icon" />
                        </div>
                        <div>Logout</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
