import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import { useNotification } from "../../contexts/NotificationContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "../../contexts/AdminContext";

const Profile = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    fullname: user?.fullname || "",
    username: user?.username || "",
    phoneNumber: user?.phoneNumber || "",
  });
  const [isEditMode, setIsEditMode] = useState(false);
//   const { setNotificationMessage } = useNotification();
  const navigate = useNavigate();
  const { isAuthenticated, updateUser } = useAuth();
  const { isAdminMode, toggleAdminMode } = useAdmin();

  useEffect(() => {
    if (user) {
      setFormData({
        fullname: user.fullname,
        username: user.username,
        phoneNumber: user.phoneNumber,
      });
      //   if (isAuthenticated && !user.isVerified) {
      //     setNotificationMessage("Please verify your phone number");
      //   } else {
      //     setNotificationMessage(null);
      //   }
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditClick = async (e) => {
    setIsEditMode((prev) => !prev);
    if (isEditMode) {
      if (!formData.fullname || !formData.username || !formData.phoneNumber) {
        toast.error("Please fill all the details");
      } else {
        if (
          user.fullname !== formData.fullname ||
          user.username !== formData.username
        ) {
          try {
            const result = await axios.post(
              `http://localhost:5000/api/auth/update-user/${user.id}`,
              formData
            );
            toast.success(result.data.message);
            updateUser(result.data.user);
            navigate(`/profile/${user.id}`);
          } catch (error) {
            toast.error(error.response.data.message);
            console.log("Error: ", error);
          }
        }
      }
    }
  };

  return (
    <div className="container">
      <div className="sub__container">
        <h1 className="title">Details</h1>
        <div className="profile__info">
          <div className="profile__box flex-j-sb">
            <h3>Full Name</h3>
            {isEditMode ? (
              <input
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleInputChange}
              />
            ) : (
              <p>{formData.fullname}</p>
            )}
          </div>
          <div className="profile__box flex-j-sb">
            <h3>Username</h3>
            {isEditMode ? (
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
              />
            ) : (
              <p>{formData.username}</p>
            )}
          </div>
          <div className="profile__box flex-j-sb">
            <h3>Phone Number</h3>
            {/* {isEditMode ? (
              <input
                type="number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
              />
            ) : (
              <p>{formData.phoneNumber}</p>
              )} */}
            <p>{formData.phoneNumber}</p>
          </div>
        </div>
        {/* <div className={`profile__button flex-${ user?.isAdmin ? 'j-sb' : 'center'}`}>
          <button className="button secondary-button" onClick={handleEditClick}>
            {isEditMode ? "Save" : "Edit"}
          </button>
          { user?.isAdmin && <button className="button secondary-button">See All Users</button>}
          { user?.isAdmin && <button className="button secondary-button" onClick={toggleAdminMode}>Admin Mode {isAdminMode ? "Off" : "On"}</button>}
        </div> */}
      </div>
    </div>
  );
};

export default Profile;
