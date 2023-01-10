import "./App.css";
import HomePage from "./Routes/Home";
import AuthPage from "./Routes/Auth";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage/>,
    errorElement: <div>Something went wrong</div>,
  },  {
    path: "/login",
    element: <AuthPage/>,
    errorElement: <div>Something went wrong</div>,
  },
]);


function App() {
  return (
    <div className="App">

    <RouterProvider router={router} />
    </div>
  );
}

export default App;