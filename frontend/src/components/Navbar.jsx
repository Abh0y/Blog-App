import { useContext, useState } from "react";
import { TbLogout } from "react-icons/tb";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <div className="navbar bg-yellow-400 rounded-b-lg ">
      <Link to={"/"}>
        <div className="flex ml-5 my-1 transition duration-150 ease-in-out hover:scale-105 active:scale-95">
          <img
            src="/blog-icon2.png"
            alt="Blog Icon"
            className="w-16 h-16 rounded-full shadow-lg shadow-black "
          ></img>
          <h1 className="ml-1 text-4xl pt-3 text-gray-900 text font-semibold">
            Blogs!
          </h1>
        </div>
      </Link>
      <span className="flex-1"></span>
      <div className="flex flex-row gap-6 pr-10 text-white text-md">
        <div className="mt-6 font-semibold transition duration-150 ease-in-out hover:scale-105 active:scale-95">
          <Link to={"/"}>
            <span>Home</span>
          </Link>
        </div>
        <ul>
          <li>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="mt-6 font-semibold transition duration-150 ease-in-out hover:scale-105 active:scale-95 "
                onClick={toggleDropdown}
              >
                <span className="">Category</span>
              </div>
              {isOpen && (
                <ul
                  tabIndex={0}
                  className="dropdown-content flex flex-col gap-1 bg-white rounded-box z-[1] w-52 p-2 shadow text-black mt-3"
                >
                  <Link to={"/?cat=art"} onClick={closeDropdown}>
                    <li className="py-0.5 hover:bg-stone-200 px-2 rounded-lg">
                      ART
                    </li>
                  </Link>
                  <Link to={"/?cat=science"} onClick={closeDropdown}>
                    <li className="py-0.5 hover:bg-stone-200 px-2 rounded-lg">
                      SCIENCE
                    </li>
                  </Link>
                  <Link to={"/?cat=technology"} onClick={closeDropdown}>
                    <li className="py-0.5 hover:bg-stone-200 px-2 rounded-lg">
                      TECHNOLOGY
                    </li>
                  </Link>
                  <Link to={"/?cat=cinema"} onClick={closeDropdown}>
                    <li className="py-0.5 hover:bg-stone-200 px-2 rounded-lg">
                      CINEMA
                    </li>
                  </Link>
                  <Link to={"/?cat=food"} onClick={closeDropdown}>
                    <li className="py-0.5 hover:bg-stone-200 px-2 rounded-lg">
                      FOOD
                    </li>
                  </Link>
                  <Link to={"/?cat=design"} onClick={closeDropdown}>
                    <li className="py-0.5 hover:bg-stone-200 px-2 rounded-lg">
                      DESIGN
                    </li>
                  </Link>
                </ul>
              )}
            </div>
          </li>
        </ul>
        <div className="mt-6 font-semibold transition duration-150 ease-in-out hover:scale-105 active:scale-95">
          <Link to={"/create"}>
            <span>Create</span>
          </Link>
        </div>
      </div>
      {currentUser ? (
        <div className="flex gap-2 ">
          <div className="pt-6 text-black font-bold">
            <span>{currentUser.username}</span>
          </div>
          <div className="relative w-14 h-14 rounded-full mr-4 flex items-center justify-center">
            <img
              src={currentUser.image}
              alt=""
              className="w-full h-full rounded-full border-2"
            />
            <div>
              <button
                onClick={logout}
                className="absolute -top-1.5 -right-2 bg-white  mt-10 w-6 h-6 flex items-center justify-center rounded-lg text-gray-900"
              >
                <TbLogout size={18} className="ml-0.5" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Link to={"/login"} className="mt-6 text-white font-semibold ml-2 mr-8">
          Login
        </Link>
      )}
    </div>
  );
};

export default Navbar;
