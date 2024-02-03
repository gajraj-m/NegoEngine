import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../config/axios";
import { FcGoogle } from "react-icons/fc";
import { Button } from "../components/ui/button";
import { CONST } from "../config";
import axios from "axios";

export default function Login() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await axiosInstance.post(
        CONST.uri.auth.CREDENTIALS_LOGIN,
        formData
      );
      const data = res.data;
      if (res.status !== 200) {
        dispatch(signInFailure(data));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/dashboard");
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto pt-24">
      <h1 className="text-3xl text-center font-semibold my-7">Log In</h1>
      <Button variant="secondary" className="flex space-x-2 mb-4 mx-auto">
        <FcGoogle size={25} />
        <span className="text-sm font-light">Continue with Google</span>
      </Button>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Log In"}
        </button>
        {/* <OAuth /> */}
      </form>
      <div className="flex gap-2 mt-5">
        <p>Dont Have an account?</p>
        <Link to="/register">
          <span className="text-blue-500">Register</span>
        </Link>
      </div>
      <p className="text-red-700 mt-5">
        {error ? error.message || "Something went wrong!" : ""}
      </p>
    </div>
  );
}
