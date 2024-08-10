import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);

  const cat = useLocation().search;

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/posts${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchdata();
  }, [cat]);

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    const textSet = doc.body.textContent;
    const limit = 40;
    const words = textSet.split(" ");
    if (words.length > limit) {
      return words.slice(0, limit).join(" ") + "...";
    }
    return textSet;
  };

  return (
    <div>
      {posts.map((data, index) => (
        <div
          key={data.id}
          className={`card mt-5 mb-4 flex flex-row gap-3 bg-gray-50 shadow-xl rounded-lg ${
            index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
          }`}
        >
          <figure className="h-[260px] w-[900px] overflow-hidden">
            <img
              src={`/upload/${data.img}`}
              alt="Album"
              className="h-full w-full object-cover rounded-lg "
            />
          </figure>
          <div className="card-body text-black">
            <Link to={`/post/${data.id}`}>
              <h2 className="card-title">{data.title}</h2>
            </Link>
            <p>{getText(data.desc)}</p>
            <div className={`card-actions ${index % 2 === 0 ? `justify-end` : `justify-start` } `}>
              <Link to={`/post/${data.id}`}>
                <div className=" bg-white w-24 h-9 flex justify-center border rounded-lg  text-black hover:bg-zinc-200 hover:border-zinc-700 transition duration-150 ease-in-out hover:scale-105 active:scale-95">
                  <button className=" text-sm">Read More!</button>
                </div>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
