import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../config/axios";
import { FcGoogle } from "react-icons/fc";
import { Button } from "../components/ui/button";
import { CONST } from "../config";

export default function Register() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await axiosInstance.post(CONST.uri.auth.REGISTER, formData);
      setLoading(false);
      if (res.status !== 200) {
        setError(true);
        return;
      }
      navigate("/login");
    } catch (error) {
      setLoading(false);
      setError(true);
      console.log(error);
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto pt-24">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <Button variant="secondary" className="flex space-x-2 mb-4 mx-auto">
        <FcGoogle size={25} />
        <span className="text-sm font-light">Continue with Google</span>
      </Button>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Full Name"
          id="fullname"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="Number"
          placeholder="Rating"
          id="rating"
          step={0.1}
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="Number"
          placeholder="Number of Users"
          id="numberOfUsers"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
        {/* <OAuth /> */}
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to="/login">
          <span className="text-blue-500">Sign in</span>
        </Link>
      </div>
      <p className="text-red-700 mt-5">{error && "Something went wrong!"}</p>
    </div>
  );
}
