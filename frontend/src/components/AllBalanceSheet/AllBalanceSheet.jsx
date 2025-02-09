import axios from "axios";
import React, { useEffect, useState } from "react";

const BalanceDetails = () => {
  const [allBalanceSheet, setAllBalanceSheet] = useState([]);

  useEffect(() => {
    getAllBalanceSheet();
  }, []);

  const getAllBalanceSheet = async () => {
    try {
      const result = await axios.get(
        "http://localhost:5000/api/get-all-balance-sheet"
      );
      setAllBalanceSheet(result.data);
      localStorage.setItem("allBalanceSheet", JSON.stringify(result.data));
    } catch (error) {
      console.error("Error fetching balance sheets:", error);
    }
  };

  // Calculate totals
  const totals = allBalanceSheet.reduce(
    (acc, sheet) => {
      acc.freight += sheet.freight || 0;
      acc.advance += sheet.advance || 0;
      acc.detention += sheet.detention || 0;
      acc.warai += sheet.warai || 0;
      acc.penaltyCharges += sheet.penaltyCharges || 0;
      acc.balance += sheet.balance || 0;
      acc.totalBalance += sheet.totalBalance || 0;
      acc.tds += sheet.tds || 0;
      acc.payableAmount += sheet.payableAmount || 0;
      return acc;
    },
    {
      freight: 0,
      advance: 0,
      detention: 0,
      warai: 0,
      penaltyCharges: 0,
      balance: 0,
      totalBalance: 0,
      tds: 0,
      payableAmount: 0,
    }
  );

  return (
    <div className="container">
      <div id="print-page">
        <div className="underline"></div>
        <h1 className="header">Balance Details</h1>
        <div className="underline"></div>
        <div className="company__details">
          <div className="line__1">
            <div className="left">
              <div className="title">Supplier</div>
              <div className="value">SHREE SHYAM ROAD LINES</div>
            </div>
            <div className="right">
              <div className="title">Receipt No.</div>
              <div className="value">DI/SR/RCPT202401661</div>
            </div>
          </div>
          <div className="line__2">
            <div className="left">
              <div className="title">Address</div>
              <div className="value">
                MAHENDRA SINGH YAMUNA VIHAR COLONY BALDEV ROAD, NEAR ESSAR PUMP,
                LOHAVAN, LOHABAN , MATHURA UTTAR PRADESH- 281204
              </div>
            </div>
            <div className="right">
              <div className="title">Date</div>
              <div className="value">25-01-2025</div>
            </div>
          </div>
          <div className="line__3">
            <div className="left">
              <div className="title">City</div>
              <div className="value">Mathura-UP</div>
            </div>
            <div className="middle">
              <div className="title">Contact No.</div>
              <div className="value">8630836045</div>
            </div>
            <div className="right">
              <div className="title">GST No.</div>
              <div className="value">NA</div>
            </div>
          </div>
        </div>
        <div className="underline"></div>
        <div className="address__para">
          <div className="address_lines">
            <div className="address__line__1">DVS International Pvt. Ltd.</div>
            <div className="address__line__2">
              Corporate Address - Office No. 914 & 912A, 9th Floor, Gera
              Imperium Alpha, Grant Road, Kharadi, Pune - 411 014
            </div>
          </div>
          <div className="contact__info">
            <div className="contact__info__line__1">
              <div className="contact__info__left">
                <div className="contact__info__title">Mobile No.</div>
                <div className="contact__info__value">+91-9070707607</div>
              </div>
              <div className="contact__info__right">
                <div className="contact__info__title">Email Id.</div>
                <div className="contact__info__value">vishal8630@gmail.com</div>
              </div>
            </div>
            <div className="contact__info__line__2">
              <div className="contact__info__left">
                <div className="contact__info__title">GST IN</div>
                <div className="contact__info__value">27AAKCD3593N1ZY</div>
              </div>
              <div className="contact__info__right">
                <div className="contact__info__title">PAN No.</div>
                <div className="contact__info__value">AAKCS3593N</div>
              </div>
            </div>
          </div>
        </div>
        <table
          border="1"
          cellPadding="10"
          id="balance-sheet-table"
          className="table"
        >
          <thead>
            <tr>
              <th>LR No</th>
              <th>LR Date</th>
              <th>Vehicle No</th>
              <th>Vehicle Type</th>
              <th>From</th>
              <th>To</th>
              <th>Reporting Date</th>
              <th>Uploading Date</th>
              <th>POD Date</th>
              <th>Freight</th>
              <th>Advance</th>
              <th>Detention</th>
              <th>Warai</th>
              <th>Penalty Charges</th>
              <th>Balance</th>
              <th>Total Balance</th>
              <th>TDS</th>
              <th>Payable Amount</th>
            </tr>
          </thead>
          <tbody>
            {allBalanceSheet.length > 0 ? (
              allBalanceSheet.map((sheet) => (
                <tr key={sheet._id}>
                  <td>{sheet.lrNo}</td>
                  <td>{new Date(sheet.lrDate).toLocaleDateString()}</td>
                  <td>
                    <a href={`/view-balance-sheet/` + sheet._id}>
                      {sheet.vehicleNo}
                    </a>
                  </td>
                  <td>{sheet.vehicleType}</td>
                  <td>{sheet.from}</td>
                  <td>{sheet.to}</td>
                  <td>{new Date(sheet.reportingDate).toLocaleDateString()}</td>
                  <td>{new Date(sheet.uploadingDate).toLocaleDateString()}</td>
                  <td>{new Date(sheet.podDate).toLocaleDateString()}</td>
                  <td>{sheet.freight}</td>
                  <td>{sheet.advance}</td>
                  <td>{sheet.detention}</td>
                  <td>{sheet.warai}</td>
                  <td>{sheet.penaltyCharges}</td>
                  <td>{sheet.balance}</td>
                  <td>{sheet.totalBalance}</td>
                  <td>{sheet.tds}</td>
                  <td>{sheet.payableAmount}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="19">No balance sheets available</td>
              </tr>
            )}
            {/* Total Row */}
            {allBalanceSheet.length > 0 && (
              <tr>
                <td colSpan="9" style={{ fontWeight: "bold" }}>
                  Total
                </td>
                <td>{totals.freight}</td>
                <td>{totals.advance}</td>
                <td>{totals.detention}</td>
                <td>{totals.warai}</td>
                <td>{totals.penaltyCharges}</td>
                <td>{totals.balance}</td>
                <td>{totals.totalBalance}</td>
                <td>{totals.tds}</td>
                <td>{totals.payableAmount}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BalanceDetails;
