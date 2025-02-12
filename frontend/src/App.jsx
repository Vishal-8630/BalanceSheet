import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Navbar from "./components/Navbar";
import Notification from "./components/Notification";
import { useNotification } from "./contexts/NotificationContext";

function App() {
  const { notification } = useNotification();

  return (
    <>
      <Navbar />
      {/* { notification && <Notification /> } */}
      <ToastContainer />
      <Outlet />
    </>
  );
}

export default App;
