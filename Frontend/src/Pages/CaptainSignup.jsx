import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [color, setColor] = useState("");
  const [plate, setPlate] = useState("");
  const [capacity, setCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  const navigate = useNavigate();

  const [captain, setCaptain] = useContext(CaptainDataContext);

  const submitHandler = async (e) => {
    console.log("captain signup entered");
    e.preventDefault();

    const newCaptain = {
      fullname: { 
        firstname : firstname,
        lastname : lastname
      },
      email : email,
      password : password,
      vehicle: { 
        color : color,
        plate : plate,
        capacity : capacity,
        VehicleType : vehicleType 
      }
    };

    try {
      // console.log(newCaptain);
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captain/register`,
        newCaptain
      );

      if (response.status === 201) {
        const data = response.data;
        setCaptain(data.captain)
        // console.log(data.token);
        localStorage.setItem("token",data.token);
        navigate("/captain-home");
      }
    } catch (error) {
      // console.log("error in saptain signup catch");
      console.error(
        "Error during registration:",
        error.response?.data || error.message
      );
    }

    // Reset form
    setFirstname("");
    setLastname("");
    setEmail("");
    setPassword("");
    setColor("");
    setPlate("");
    setCapacity("");
    setVehicleType("");
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-purple-200 w-3/4 max-w-4xl p-10 rounded-lg shadow-lg">
        {/* Uber Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
            alt="Uber Logo"
            className="w-28"
          />
        </div>

        <form onSubmit={submitHandler} className="bg-purple-300 w-full p-4 py-4 rounded shadow-md">
          {/* Full Name */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-lg font-semibold">First Name</label>
              <input
                className="w-full bg-gray-200 rounded px-4 py-2 border text-lg"
                required
                type="text"
                placeholder="First Name"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>
            <div>
              <label className="text-lg font-semibold">Last Name</label>
              <input
                className="w-full bg-gray-200 rounded px-4 py-2 border text-lg"
                required
                type="text"
                placeholder="Last Name"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
          </div>

          {/* Email & Password */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-lg font-semibold">Email</label>
              <input
                className="w-full bg-gray-200 rounded px-4 py-2 border text-lg"
                required
                type="email"
                placeholder="youremail@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="text-lg font-semibold">Password</label>
              <input
                className="w-full bg-gray-200 rounded px-4 py-2 border text-lg"
                required
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Vehicle Details */}
          <h3 className="text-xl font-semibold">Vehicle Information</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-lg font-semibold">Color</label>
              <input
                className="w-full bg-gray-200 rounded px-4 py-2 border text-lg"
                required
                type="text"
                placeholder="Vehicle Color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </div>
            <div>
              <label className="text-lg font-semibold">Plate</label>
              <input
                className="w-full bg-gray-200 rounded px-4 py-2 border text-lg"
                required
                type="text"
                placeholder="Vehicle Plate"
                value={plate}
                onChange={(e) => setPlate(e.target.value)}
              />
            </div>
            <div>
              <label className="text-lg font-semibold">Capacity</label>
              <input
                className="w-full bg-gray-200 rounded px-4 py-2 border text-lg"
                required
                type="number"
                placeholder="Capacity"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                step="1"
              />
            </div>
          </div>

          {/* Vehicle Type */}
          <div>
            <label className="text-lg font-semibold">Vehicle Type</label>
            <select
              className="w-full bg-gray-200 rounded px-4 py-2 border text-lg"
              required
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
            >
              <option value="">Select Vehicle Type</option>
              <option value="car">Car</option>
              <option value="motorcycle">Motorcycle</option>
              <option value="auto">Auto</option>
            </select>
          </div>

          {/* Sign Up Button */}
          <button className="bg-black text-white w-full font-semibold rounded mt-4 px-4 py-2 text-lg">
            Create Captain Account
          </button>

          {/* Already have an account? */}
          <p className="text-center mt-4">
            Already have an account?{" "}
            <Link to="/captain-login" className="text-blue-600">Login</Link>
          </p>
        </form>

        {/* reCAPTCHA Info */}
        <p className="text-center text-sm text-gray-600 mt-4">
          This site is protected by reCAPTCHA and the{" "}
          <span className="underline">Google Privacy Policy</span> and{" "}
          <span className="underline">Terms of Service</span> apply.
        </p>
      </div>
    </div>
  );
};

export default CaptainSignup;
