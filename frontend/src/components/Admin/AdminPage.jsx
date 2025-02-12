import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/AuthContext";

const AdminPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
        navigate("/");
      }
  }, [isAuthenticated]);

//   const adminList = (
//     <div>
//       {allAdmins.length === 0 ? (
//         <h3>No Admin Found</h3>
//       ) : (
//         <table className="table">
//           <thead>
//             <tr>
//               <th>Username</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {allAdmins.map((admin) => (
//               <tr key={admin._id}>
//                 <td>{admin.username}</td>
//                 <td>
//                   <button
//                     className="btn"
//                     onClick={() => handleDelete(admin._id)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );

  return (
    <div className="container">
    </div>
  );
};

export default AdminPage;
