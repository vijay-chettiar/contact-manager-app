import React, { useContext } from "react";
import "./Searchbox.css";
import userimg from "../assets/sidebar/user.jpg";
import UserContext from "../context/UserContext";

const Searchbox = ({ username, setUsername, searchEmail, setSearchEmail }) => {
    const { user } = useContext(UserContext);

    return (
        <>
            <div className="searchbar">
                <div className="head">Total Contacts</div>
                <div className="bar">
                    <img
                        src={require("../assets/searchbar/searchicon.png")}
                        alt="searchicon"
                        className="search-icon"
                    />
                    <input
                        type="search"
                        className="search-box"
                        placeholder=" Search by Email Id..."
                        onChange={(e) => {
                            setSearchEmail(e.target.value);
                        }}
                    />
                </div>
                <div className="userDetail">
                    <div className="user-image">
                        <img
                            src={userimg}
                            style={{ width: "44px", height: "44px", borderRadius: "50%" }}
                            alt="user"
                        />
                    </div>
                    <div className="name">
                        <div className="username">
                            {user ? user.email.slice(0, 7) : "Welcome"}
                        </div>
                        <div className="role">Super Admin</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Searchbox;
