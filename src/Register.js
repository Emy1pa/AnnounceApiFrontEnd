import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password_confirmation, setPasswordConfirmation] = useState("");
    const [role, setRole] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/registeer', { name, email, password, password_confirmation, role }, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            });
            console.log(response.data); // Optionally, handle the response data
            setName("");
            setEmail("");
            setPassword("");
            setPasswordConfirmation("");
            setRole("");
            navigate("/login");
        } catch (e) {
            alert(e.message);
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen pt-6 bg-gray-50">
            <div className="w-full max-w-md px-6 py-4 mt-6 bg-white shadow-md sm:rounded-lg">
                <h1 className="text-3xl font-semibold text-center text-gray-800">REGISTER PAGE</h1>
                <form className="mt-6" onSubmit={handleRegister}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            name="name"
                            value={name}
                            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            name="email"
                            value={email}
                            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            name="password"
                            value={password}
                            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                        <input
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                            type="password"
                            name="password_confirmation"
                            value={password_confirmation}
                            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                        <select
                            onChange={(e) => setRole(e.target.value)}
                            value={role}
                            name="role"
                            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <option value="">Select Role</option>
                            <option value="volunteer">Volunteer</option>
                            <option value="organizer">Organizer</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 text-sm font-semibold text-white uppercase bg-gray-900 border border-transparent rounded-md hover:bg-gray-800 focus:outline-none focus:border-gray-900 focus:ring focus:ring-gray-900 focus:ring-opacity-50 transition duration-150 ease-in-out"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}
