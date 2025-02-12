import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";

const Navbar = () => {
  const [allBalanceSheet, setAllBalanceSheet] = useState(null);
  const [isHomePage, setIsHomePage] = useState(true);
  const location = useLocation();
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const checkHomePage = () => {
    return location.pathname === "/" || location.pathname === "";
  };

  useEffect(() => {
    if (localStorage.getItem("allBalanceSheet")) {
      setAllBalanceSheet(JSON.parse(localStorage.getItem("allBalanceSheet")));
    }
  }, []);

  useEffect(() => {
    setIsHomePage(checkHomePage());
  }, [location.pathname]);

  const handlePrint = () => {
    const printContent = document.getElementById("print-page").innerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload();
  };

  const handleDownloadPDF = () => {
    if (allBalanceSheet.length > 0) {
      const table = document.getElementById("print-page");

      html2canvas(table).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const imgWidth = 190; // A4 width (210mm - margins)
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
        pdf.save("balance-sheet.pdf");
      });
    } else {
      alert("Please add atleast one balance sheet to download the data");
    }
  };

  const handleLogout = () => {
    logout();
    toast.success("Logout successfully");
    navigate("/");
  }

  return (
    <div className="navbar">
      <div className="navbar__container">
        <h1>LOGO</h1>
        <div className="navbar">
          <ul className="navbar__ul">
            <li className="navbar__ul__li">
              <Link to="/">Home</Link>
            </li>
            {isAuthenticated ? (
              <>
                <li className="navbar__ul__li">
                  <Link to="/add-balance-sheet">Add Balance Sheet</Link>
                </li>
                {isHomePage && (
                  <li className="navbar__ul__li">
                    <button onClick={handlePrint}>Print Table</button>
                  </li>
                )}
                {isHomePage && (
                  <li className="navbar__ul__li">
                    <button onClick={handleDownloadPDF}>Download PDF</button>
                  </li>
                )}
                <div className="navbar__ul__li">
                    <Link to={'/profile/' + user.id}>Profile</Link>
                </div>
                <div className="navbar__ul__li">
                    <button onClick={handleLogout}>Logout</button>
                </div>
              </>
            ) : (
              <>
                <li className="navbar__ul__li">
                  <Link to="auth/login">Login</Link>
                </li>
                <li className="navbar__ul__li">
                  <Link to="auth/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
