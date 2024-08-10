import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Suggestions = ({ cat ,currId}) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/posts/?cat=${cat}`
        );
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchdata();
  }, [cat]);

  const filteredPosts = posts.filter(item => item.id !== currId);

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    const textSet = doc.body.textContent;
    const limit = 10;
    const words = textSet.split(" ");
    if (words.length > limit) {
      return words.slice(0, limit).join(" ") + "...";
    }
    return textSet;
  };

  return (
    <div className="w-full p-6 shadow-md rounded-lg text-black">
      <h2 className="text-2xl font-bold mb-4">Suggestions</h2>
      <div className="flex flex-col gap-4">
        {filteredPosts.map((data) => (
          <div key={data.id}  className="card card-compact bg- w-60 shadow-xl">
            <figure>
              <img
                src={`/upload/${data.img}`}
                alt="image"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{data.title}</h2>
              <p>{getText(data.desc)}</p>
              <Link to={`/post/${data.id}`} className="card-actions justify-end">
                <button className="text-zinc-500 transition duration-150 ease-in-out hover:scale-105 active:scale-95 hover:text-black">Read More!</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Suggestions;
