import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const csrf = () => axios.get("/sanctrum/csrf-cookie");

    const handleLogin = async (event) => {
        event.preventDefault();
        await csrf();
        try {
            await axios.post('/login', {email, password});
            setEmail("");
            setPassword("");
            navigate("/register"); ;
        } catch (e){
            alert(e.message);
        }

    }
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