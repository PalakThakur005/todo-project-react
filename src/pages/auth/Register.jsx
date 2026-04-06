import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
    gender: "",
  });

  const [errorName, seterrorName] = useState("");
  const [errorEmail, seterrorEmail] = useState("");
  const [errorPassword, seterrorPassword] = useState("");
  const [errorContact, seterrorContact] = useState("");
  const [errorGender, seterrorGender] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    seterrorName("");
    seterrorContact("");
    seterrorGender("");
    seterrorEmail("");
    seterrorPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const namePattern = /^[A-Za-z\s]+$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    const contactPattern = /^[0-9]{10}$/;

    if (!form.name) return seterrorName("Please enter name!!");
    if (!form.email) return seterrorEmail("Please enter email!!");
    if (!form.password) return seterrorPassword("Please enter password!!");
    if (!form.contact) return seterrorContact("Please enter contact!!");
    if (!form.gender) return seterrorGender("Please select gender!!");

    if (form.name.trim().length < 3) {
      return toast.error("Name must be at least 3 characters");
    }

    if (!namePattern.test(form.name)) {
      return toast.error("Invalid Name");
    }

    if (!emailPattern.test(form.email)) {
      return toast.error("Invalid Email");
    }

    if (!passwordPattern.test(form.password)) {
      return toast.error("Weak Password");
    }

    if (!contactPattern.test(form.contact)) {
      return toast.error("Contact must be exactly 10 digits");
    }

    // try {
    //   await axios.post(
    //     "http://localhost:5000/api/auth/register",
    //     form
    //   );

    //   toast.success("Registered Successfully");

    //   setTimeout(() => {
    //     navigate("/login");
    //   }, 1200);
    // } catch (err) {
    //   toast.error(err.response?.data?.message || "Error");
    // }
  
    const existingUser=JSON.parse(localStorage.getItem("User-Data"))||[]
    existingUser.push(form)
    localStorage.setItem("User-Data",JSON.stringify(existingUser))
  
  toast.success("Registered Successfully");
    setTimeout(() => {
        navigate("/login");
      }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">

  <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl shadow-lg p-8 space-y-5">

    <h2 className="text-2xl font-semibold text-center text-gray-800">
      Create Account
    </h2>

    <p className="text-center text-gray-500 text-sm">
      Please fill the details to register
    </p>

    <form onSubmit={handleSubmit} className="space-y-4">

      <div>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errorName && <p className="text-red-500 text-sm mt-1">{errorName}</p>}
      </div>

      <div>
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          onChange={handleChange}
          className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errorEmail && <p className="text-red-500 text-sm mt-1">{errorEmail}</p>}
      </div>

      <div>
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errorPassword && <p className="text-red-500 text-sm mt-1">{errorPassword}</p>}
      </div>

      <div>
        <input
          type="text"
          name="contact"
          placeholder="Contact Number"
          onChange={handleChange}
          className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errorContact && <p className="text-red-500 text-sm mt-1">{errorContact}</p>}
      </div>

      <div>
        <p className="text-gray-600 mb-1 text-sm font-medium">Gender</p>
        <div className="flex gap-6 text-gray-700">
          <label className="flex items-center gap-2">
            <input type="radio" name="gender" value="male" onChange={handleChange} />
            Male
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="gender" value="female" onChange={handleChange} />
            Female
          </label>
        </div>
        {errorGender && <p className="text-red-500 text-sm mt-1">{errorGender}</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-medium transition"
      >
        Register
      </button>
    </form>

    <p className="text-center text-gray-500 text-sm">
      Already have an account?{" "}
      <Link to="/login" className="text-blue-600 hover:underline font-medium">
        Login
      </Link>
    </p>
  </div>
</div>
  );
};

export default Register;