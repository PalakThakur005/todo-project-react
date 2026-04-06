import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, Link} from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errorEmail, seterrorEmail] = useState("");
  const [errorPassword, seterrorPassword] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });

    seterrorEmail("");
    seterrorPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.email) return seterrorEmail("Please enter email");
    if (!form.password) return seterrorPassword("Please enter password");

    if (!emailPattern.test(form.email)) {
      return toast.error("Invalid Email");
    }


    const UserData=JSON.parse(localStorage.getItem("User-Data")) || [];

    const user=UserData.find((u)=>u.email===form.email)
     

    if(!user){
      return toast.error("User not found with this email")
    }
    if(user.password !== form.password){
      return toast.error("Password does not match")
    }

    localStorage.setItem("email", user.email);

  toast.success("Login successful");
  setTimeout(() => {
        navigate("/notes" ,{replace:true});
      }, 1200);
  };

  return (
 
  <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">

    <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl shadow-lg p-8 space-y-6">

      <h2 className="text-2xl font-semibold text-center text-gray-800">
        Login
      </h2>

      <p className="text-center text-gray-500 text-sm">
        Enter your credentials to continue
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Email */}
        <div>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            onChange={handleChange}
            className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errorEmail && (
            <p className="text-red-500 text-sm mt-1">{errorEmail}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            onChange={handleChange}
            className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errorPassword && (
            <p className="text-red-500 text-sm mt-1">{errorPassword}</p>
          )}
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-medium transition"
        >
          Login
        </button>
      </form>

      {/* Bottom Text */}
      <p className="text-center text-gray-500 text-sm">
        Don’t have an account?{" "}
        <Link
          to="/register"
          className="text-blue-600 hover:underline font-medium"
        >
          Register
        </Link>
      </p>
    </div>
  </div>
);
  
};

export default Login;