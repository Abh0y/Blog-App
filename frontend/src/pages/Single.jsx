import { useContext, useEffect, useState } from "react";
import SinglePost from "../components/SinglePost";
import Suggestions from "../components/Suggestions";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import toast from "react-hot-toast";

const Single = () => {

  const [post, setPost] = useState({});

  const location = useLocation();
  const navigate = useNavigate();

  const { currentUser } = useContext(AuthContext);

  const postId = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/posts/${postId}`);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchdata();
  }, [postId]);

  const handelDelete = async () =>{
    try {
      const res=await axios.delete(`http://localhost:5000/api/posts/${postId}`, {
        withCredentials: true,
      });
      navigate("/");
      toast.success(res.data)
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 w-full">
          <SinglePost  post={post} currentUser={currentUser} handelDelete={handelDelete}></SinglePost>
        </div>
        <div className="">
          <Suggestions cat={post.cat} currId={post.id}></Suggestions>
        </div>
      </div>
    </div>
  );
};

export default Single;
