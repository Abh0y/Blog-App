import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast"
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Layout from "./layout/Layout";
import Single from "./pages/Single";
import Create from "./pages/Create";

const router = createBrowserRouter([
  {
    path : "/login",
     element : <Login></Login>
  },
  {
    path : "/signup",
     element : <Signup></Signup>
  },
  {
    path : "/",
     element : <Layout></Layout>,
     children:[
      {
        index : true,
         element : <Home></Home>
      },
      {
        path : "/post/:id",
         element : <Single></Single>
      },
      {
        path : "/create",
         element : <Create></Create>
      },

     ]
  }

])

function App() {
  return (
    <div className="bg-white">
      <RouterProvider router={router}></RouterProvider>
      <div><Toaster/></div>
    </div>
  );
}

export default App;
