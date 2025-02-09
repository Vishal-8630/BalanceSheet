import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Navbar = () => {
    const [allBalanceSheet, setAllBalanceSheet] = useState(null);

    useEffect(() => {
        if (localStorage.getItem("allBalanceSheet")) {
            setAllBalanceSheet(JSON.parse(localStorage.getItem("allBalanceSheet")));
        }
    }, []);

  const handlePrint = () => {
    window.print();
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
  return (
    <div className="navbar">
      <div className="navbar__container">
        <h1>LOGO</h1>
        <div className="navbar">
          <ul className="navbar__ul">
            <li className="navbar__ul__li">
              <Link to="/">Home</Link>
            </li>
            <li className="navbar__ul__li">
              <Link to="/add-balance-sheet">Add Balance Sheet</Link>
            </li>
            <li className="navbar__ul__li">
              <button onClick={handlePrint}>Print Table</button>
            </li>
            <li className="navbar__ul__li">
              <button onClick={handleDownloadPDF}>Download PDF</button>
            </li>
            <li className="navbar__ul__li">
              <Link to="/admin-mode">Admin Mode</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
