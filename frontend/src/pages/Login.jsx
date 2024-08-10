import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handelOnChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(inputs);
  };

  const handelOnClick = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      toast.success("User logged in!");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data || "An unexpected error occurred");
      setInputs({
        username: "",
        password: "",
      });
    }
  };

  return (
    <div className="bg-[url('/bg-login.jpg')] bg-cover bg-center min-h-screen flex flex-col items-center justify-center">
      <div className="shadow-xl shadow-black rounded-2xl bg-white w-[400px] h-[460px] flex flex-col items-center justify-center">
        <div className="mb-4 flex flex-row gap-2">
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
          className="flex flex-col gap-2 items-center w-full bg-gray-900 h-[320px] pt-5 rounded-lg"
          onSubmit={handelOnClick}
        >
          <div>
            <label className="label p-2">
              <span className="text-base text-white label-text">Username</span>
            </label>
            <input
              type="text"
              name="username"
              placeholder="Enter Username"
              className="rounded-lg px-4 py-3 border border-zinc-500 action:border-white w-72"
              onChange={handelOnChange}
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base text-white label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              className="rounded-lg px-4 py-3 border border-zinc-500 action:border-white w-72"
              onChange={handelOnChange}
            />
          </div>
          <div className="text-base text-white hover:text-gray-500">
            <Link to={"/signup"}>Don&apos;t have an account?</Link>
          </div>
          <div>
            <button
              type="submit"
              className="btn btn-sm my-1 border hover:bg-white hover:text-black text-white border-white w-40"
            >
              Login
            </button>
          </div>
        </form>
        
      </div>
    </div>
  );
};

export default Login;
