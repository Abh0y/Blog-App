import { MdEditNote, MdOutlineDelete } from "react-icons/md";
import moment from "moment";
import { Link } from "react-router-dom";
import DOMPurify from 'dompurify';

const SinglePost = ({ post, currentUser ,handelDelete }) => {

  const DisplayContent = ( htmlContent ) => (
    <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(htmlContent) }} />
  );
  
  return (
    <div className="w-full h-full p-6 bg-white shadow-md rounded-lg text-black">
      <div>
        <img
          src={`/upload/${post.img}`}
          className="w-full h-80 rounded-lg"
        ></img>
      </div>
      <div className="flex flex-row my-4">
        <img
          src={post.image}
          className=" w-12 h-12 rounded-full"
        />
        <div className="flex flex-col ml-2">
          <p>{post.username}</p>
          <span className="text-sm">{moment(post.date).fromNow(true)} ago</span>
        </div>
      </div>
      <div>
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <div className="text-gray-700 mb-4">{DisplayContent(post.desc)}</div>
      </div>
      {(currentUser?.username === post.username) && (
        <div className="flex justify-end gap-5">
          <Link to={`/create?edit=${post.id}`} state={post} className="flex gap-2 border border-zinc-600 p-1 justify-center w-[90px] rounded-lg hover:bg-blue-400 transition duration-150 ease-in-out hover:scale-105 active:scale-95">
            <button>Edit</button>
            <MdEditNote size={23} className="mt-0.5" />
          </Link>
          <Link className="flex gap-1 border p-1 justify-center w-[90px] rounded-lg hover:bg-red-400 transition duration-150 ease-in-out hover:scale-105 active:scale-95 border-zinc-600"
          onClick={handelDelete}>
            <button>Delete</button>
            <MdOutlineDelete size={20} className="mt-0.5" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default SinglePost;
