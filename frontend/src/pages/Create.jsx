import { MdDriveFolderUpload } from "react-icons/md";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FaArrowUpFromBracket } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";

const Spinner = () => (
  <div className="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full border-t-transparent"></div>
);

const Create = () => {
  const state = useLocation().state;

  const [value, setValue] = useState(state?.desc || "");
  const [title, setTitle] = useState(state?.title || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "art");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const upload = async () => {
    try {
      setLoading(true);

      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      await delay(3000);

      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post(
        "http://localhost:5000/api/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      return res.data;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handelPublish = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();

    try {
      state
        ? await axios.put(
            `http://localhost:5000/api/posts/${state.id}`,
            {
              title,
              desc: value,
              cat,
              img: file ? imgUrl : "",
            },
            { withCredentials: true }
          )
        : await axios.post(
            `http://localhost:5000/api/posts/`,
            {
              title,
              desc: value,
              cat,
              img: file ? imgUrl : "",
              date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            },
            { withCredentials: true }
          );
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="mx-auto mt-4 text-black flex flex-row rounded-lg">
      <div className="w-2/3 flex flex-col gap-4 px-5 py-3 shadow-lg rounded-lg h-full">
        <div className="">
          <input
            className="bg-white w-full p-2 border border-zinc-400 rounded-lg"
            type="text"
            value={title}
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          ></input>
        </div>
        <div>
          <ReactQuill
            className="h-[350px]"
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
        <div className="flex justify-end mt-10 ">
          <button
            type="submit"
            className="flex items-center rounded-lg text-white border border-zinc-500 bg-yellow-400 w-24 justify-center px-2 py-1 transition duration-150 ease-in-out hover:scale-105 active:scale-95"
            onClick={handelPublish}
          >
            {loading ? <Spinner /> : state ? "Update" : "Publish"}{" "}
            {!loading && <FaArrowUpFromBracket className="ml-2" />}
          </button>
        </div>
      </div>
      <div className="pl-5 py-4 w-1/3 ">
        <div className="w-full shadow-lg p-3 pb-8 rounded-lg h-2/5">
          <h1 className="text-3xl ">Publish</h1>
          <div className="mt-2 flex flex-col gap-1 ">
            <span>
              Status:{" "}
              {state ? (
                <span className="text-zinc-600">Update</span>
              ) : (
                <span className="text-zinc-600">Create</span>
              )}
            </span>
            <span>
              Visibility: <span className="text-zinc-600">Public</span>
            </span>
          </div>
          <div className="mt-4 flex flex-row gap-2 ml-1">
            <label className="text-white h-8 bg-yellow-400 font-bold px-2 rounded-md  items-center justify-center border border-zinc-500 transition-transform duration-300 ease-in-out hover:scale-105">
              <input
                type="file"
                name="file"
                className="hidden"
                onChange={(e) => setFile(e.target.files[0])}
                required
              />
              <div className="flex flex-row gap-2 mt-0.5">
                <span className="mt-0.5 text-sm">Upload</span>
                <MdDriveFolderUpload className="" size={25} />
              </div>
            </label>
            {loading && <div>Uploading...</div>}
          </div>
        </div>
        <div className="border-t border-gray-300 my-4"></div>
        <div className=" mt-2 px-3 shadow-lg rounded-lg pb-7 ">
          <h1 className="text-3xl pt-3">Category</h1>
          <div className="pl-2 mt-4 flex flex-col gap-2">
            <div>
              <input
                type="radio"
                name="category"
                value="art"
                className="radio h-4 w-4 border border-zinc-950"
                onChange={(e) => setCat(e.target.value)}
                checked={cat === "art"}
              />
              <label htmlFor="art" className="ml-2 text-gray-700">
                ART
              </label>
            </div>
            <div>
              <input
                type="radio"
                name="category"
                value="science"
                className="radio h-4 w-4 border border-zinc-950"
                onChange={(e) => setCat(e.target.value)}
                checked={cat === "science"}
              />
              <label htmlFor="science" className="ml-2 text-gray-700">
                SCIENCE
              </label>
            </div>
            <div>
              <input
                type="radio"
                name="category"
                value="technology"
                className="radio h-4 w-4 border border-zinc-950"
                onChange={(e) => setCat(e.target.value)}
                checked={cat === "technology"}
              />
              <label htmlFor="technology" className="ml-2 text-gray-700">
                TECHNOLOGY
              </label>
            </div>
            <div>
              <input
                type="radio"
                name="category"
                value="cinema"
                className="radio h-4 w-4 border border-zinc-950"
                onChange={(e) => setCat(e.target.value)}
                checked={cat === "cinema"}
              />
              <label htmlFor="cinema" className="ml-2 text-gray-700">
                CINEMA
              </label>
            </div>
            <div>
              <input
                type="radio"
                name="category"
                value="food"
                className="radio h-4 w-4 border border-zinc-950"
                onChange={(e) => setCat(e.target.value)}
                checked={cat === "food"}
              />
              <label htmlFor="food" className="ml-2 text-gray-700">
                FOOD
              </label>
            </div>
            <div>
              <input
                type="radio"
                name="category"
                value="design"
                className="radio h-4 w-4 border border-zinc-950"
                onChange={(e) => setCat(e.target.value)}
                checked={cat === "design"}
              />
              <label htmlFor="design" className="ml-2 text-gray-700">
                DESIGN
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
