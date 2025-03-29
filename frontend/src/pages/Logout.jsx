import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        const controller = new AbortController();

        const logoutUser = async () => {
            try {
                await axios.post(
                    "http://localhost:8000/users/logout",
                    {},
                    {
                        headers: { Authorization: `Bearer ${token}` },
                        withCredentials: true,
                        signal: controller.signal,
                    }
                );
            } catch (error) {
                if (error.name !== "AbortError") {
                    console.error("Logout Error:", error.response?.data || error.message);
                }
            }

            localStorage.removeItem("token");
            navigate("/login");
        };

        logoutUser();

        return () => controller.abort();
    }, [navigate]);

    return <div>Logging out...</div>;
}

export default Logout;
