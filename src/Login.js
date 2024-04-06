import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCsrfToken = async () => {
            try {
                await axios.get("/sanctrum/csrf-cookie");
            } catch (error) {
                console.error("Error fetching CSRF token:", error);
            }
        };

        fetchCsrfToken();
    }, []); 

    // In the handleLogin function
const handleLogin = async (event) => {
    event.preventDefault();
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/login', { email, password });
        console.log("Login API Response:", response.data); // Log the response data
        const token = response.data.token;
        console.log(token);
     
        localStorage.setItem('token', token);
        const userData = response.data;
        localStorage.setItem("user-info", JSON.stringify(userData));

        // Extract userRole from userData
        const userRole = response.data.user.role; // Assuming the user role is provided in response data
        console.log("User Role:", userRole); // Log the user role

        // Set user role in localStorage
        localStorage.setItem("user-role", userRole);
        console.log("User Role set in localStorage:", userRole); // Log the user role after setting it

        // Redirect based on user role
        if (userRole === "organizer") {
            navigate("/organizer");
        } else if (userRole === "volunteer") {
            navigate("/volunteer");
        } else {
            navigate("/");
        }
    } catch (error) {
        alert(error.message);
    }
};


    return (
        <div className="flex flex-col items-center min-h-screen pt-6 bg-gray-50">
            <div className="w-full max-w-md px-6 py-4 mt-6 bg-white shadow-md sm:rounded-lg">
                <h1 className="text-3xl font-semibold text-center text-gray-800">LOGIN PAGE</h1>
                <form className="mt-6" onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            type="email"
                            name="email"
                            id="email"
                            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            type="password"
                            name="password"
                            id="password"
                            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 text-sm font-semibold text-white uppercase bg-gray-900 border border-transparent rounded-md hover:bg-gray-800 focus:outline-none focus:border-gray-900 focus:ring focus:ring-gray-900 focus:ring-opacity-50 transition duration-150 ease-in-out"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}