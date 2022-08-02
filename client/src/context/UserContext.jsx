import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [user, setUser] = useState(null);

    useEffect(() => {
        verifyUserLogin();
    }, []);

    const userLogin = async (data) => {
        try {
            fetch("http://localhost:8080/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
                .then((response) => response.json())
                .then((data) => {
                    localStorage.setItem("token", data.token);
                    setUser(data.user);
                    navigate("/", { replace: true });
                })
                .catch((error) => {
                    console.error("Error:", error);
                    window.alert("Enter correct mail or password");
                });
            navigate("/", { replace: true });
        } catch (error) {
            console.log(error);
        }
    };

    const userRegister = async (data) => {
        try {
            fetch("http://localhost:8080/user/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log("Success:", data);
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
            navigate("/login", { replace: true });
        } catch (error) {
            console.log(error);
        }
    };

    const verifyUserLogin = async () => {
        try {
            const res = await fetch("http://localhost:8080/user/check", {
                method: "GET",
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            });
            const result = await res.json();
            if (!result.error) {
                if (
                    location.pathname === "/login" ||
                    location.pathname === "/register"
                ) {
                    setTimeout(() => {
                        navigate("/", { replace: true });
                    }, 100);
                } else {
                    navigate(location.pathname ? location.pathname : "/");
                }
                setUser(result);
            } else {
                navigate("/login", { replace: true });
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <UserContext.Provider value={{ user, setUser, userLogin, userRegister }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
