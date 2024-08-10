import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Signup = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handelOnChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(inputs);
  };

  const handelOnClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/signup", inputs);
      toast.success("User created succesfully!");
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data || "An unexpected error occurred");
      setInputs({
        username: "",
        email: "",
        password: "",
      });
    }
  };

  return (
    <div className="bg-[url('/bg-login.jpg')] bg-cover bg-center min-h-screen flex items-center justify-center">
      <div className="shadow-xl shadow-black rounded-2xl bg-white w-[400px] h-[520px] flex flex-col items-center">
        <div className="flex flex-row gap-2 mb-4 mt-2">
          <img
            src="/blog-icon2.png"
            alt="Blog Icon"
            className="w-20 h-20 rounded-full shadow-lg shadow-black"
          ></img>
          <h1 className="text-6xl pt-2 text-gray-900 text font-semibold ">
            Blogs!
          </h1>
        </div>
        <form
          className="flex flex-col gap-1 items-center w-full bg-gray-900 h-[400px] pt-1 rounded-lg"
          onSubmit={handelOnClick}
        >
          <div>
            <label className="label p-2">
              <span className="text-base text-white label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter Username"
              className="rounded-lg px-4 py-3 border border-zinc-500 action:border-white w-72"
              name="username"
              onChange={handelOnChange}
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base text-white label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Enter Username"
              className="rounded-lg px-4 py-3 border border-zinc-500 action:border-white w-72"
              name="email"
              onChange={handelOnChange}
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base text-white label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="rounded-lg px-4 py-3 border border-zinc-500 action:border-white w-72"
              name="password"
              onChange={handelOnChange}
            />
          </div>
          <div className="text-base text-white hover:text-gray-500 mt-3 ">
            <Link to={"/login"}>Already have an account?</Link>
          </div>
          <div>
            <button
              type="submit"
              className="btn btn-sm mt-2 border hover:bg-white hover:text-black text-white border-white w-40"
            >
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>  
  );
};

export default Signup;
