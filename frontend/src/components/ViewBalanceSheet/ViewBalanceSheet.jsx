import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const ViewBalanceSheet = () => {
  const [formData, setFormData] = useState({
    lrNo: "",
    lrDate: "",
    vehicleNo: "",
    vehicleType: "",
    from: "",
    to: "",
    reportingDate: "",
    uploadingDate: "",
    podDate: "",
    freight: "",
    advance: "",
    detention: "",
    warai: "",
    penaltyCharges: "",
    balance: "",
    totalBalance: "",
    tds: "",
    payableAmount: "",
  });

  const navigate = useNavigate();
  const { id } = useParams(); // Get ID from URL if available

  useEffect(() => {
    if (id) {
      fetchBalanceSheet(id);
    }
  }, [id]);

  // Fetch existing data for edit mode
  const fetchBalanceSheet = async (balanceSheetId) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/get-balance-sheet/${balanceSheetId}`
      );
      const data = res.data;

      // Convert date fields to `YYYY-MM-DD` format for input type="date"
      const formattedData = {
        ...data,
        lrDate: data.lrDate ? data.lrDate.split("T")[0] : "",
        reportingDate: data.reportingDate
          ? data.reportingDate.split("T")[0]
          : "",
        uploadingDate: data.uploadingDate
          ? data.uploadingDate.split("T")[0]
          : "",
        podDate: data.podDate ? data.podDate.split("T")[0] : "",
      };

      setFormData(formattedData);
    } catch (error) {
      console.error("Error fetching balance sheet:", error);
      toast.error(error);
    }
  };

  // Delete a balance sheet record
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const answer = confirm("Do you really want to delete this sheet?");
      if (answer) {
        const result = await axios.delete(
          `http://localhost:5000/api/delete-balance-sheet/${id}`,
          {
            headers: {
              Authorization: `Bearen ${token}`,
              "Content-Type": "application/json"
            }
          }
        );
        console.log(result.data.message);
        navigate("/");
      }
    } catch (error) {
      console.error("Error deleting balance sheet:", error);
    }
  };

  return (
    <div className="container">
      <div className="sub__container">
        <div className="back__links">
          <Link to="/">Home</Link>
        </div>
        <h2 className="header">Balance View Mode</h2>

        <form className="form-group">
          <div className="form__input">
            <label htmlFor="lrNo">LR No</label>
            <input
              type="text"
              id="lrNo"
              name="lrNo"
              placeholder="LR No"
              value={formData.lrNo}
              required
            />
          </div>

          <div className="form__input">
            <label htmlFor="lrDate">LR Date</label>
            <input
              type="date"
              id="lrDate"
              name="lrDate"
              value={formData.lrDate}
              required
            />
          </div>

          <div className="form__input">
            <label htmlFor="vehicleNo">Vehicle No</label>
            <input
              type="text"
              id="vehicleNo"
              name="vehicleNo"
              placeholder="Vehicle No"
              value={formData.vehicleNo}
              required
            />
          </div>

          <div className="form__input">
            <label htmlFor="vehicleType">Vehicle Type</label>
            <input
              type="text"
              id="vehicleType"
              name="vehicleType"
              placeholder="Vehicle Type"
              value={formData.vehicleType}
              required
            />
          </div>

          <div className="form__input">
            <label htmlFor="from">From</label>
            <input
              type="text"
              id="from"
              name="from"
              placeholder="From"
              value={formData.from}
              required
            />
          </div>

          <div className="form__input">
            <label htmlFor="to">To</label>
            <input
              type="text"
              id="to"
              name="to"
              placeholder="To"
              value={formData.to}
              required
            />
          </div>

          <div className="form__input">
            <label htmlFor="reportingDate">Reporting Date</label>
            <input
              type="date"
              id="reportingDate"
              name="reportingDate"
              value={formData.reportingDate}
              required
            />
          </div>

          <div className="form__input">
            <label htmlFor="uploadingDate">Uploading Date</label>
            <input
              type="date"
              id="uploadingDate"
              name="uploadingDate"
              value={formData.uploadingDate}
              required
            />
          </div>

          <div className="form__input">
            <label htmlFor="podDate">POD Date</label>
            <input
              type="date"
              id="podDate"
              name="podDate"
              value={formData.podDate}
              required
            />
          </div>

          <div className="form__input">
            <label htmlFor="freight">Freight</label>
            <input
              type="number"
              id="freight"
              name="freight"
              placeholder="Freight"
              value={formData.freight}
              required
            />
          </div>

          <div className="form__input">
            <label htmlFor="advance">Advance</label>
            <input
              type="number"
              id="advance"
              name="advance"
              placeholder="Advance"
              value={formData.advance}
              required
            />
          </div>

          <div className="form__input">
            <label htmlFor="detention">Detention</label>
            <input
              type="number"
              id="detention"
              name="detention"
              placeholder="Detention"
              value={formData.detention}
              required
            />
          </div>

          <div className="form__input">
            <label htmlFor="warai">Warai</label>
            <input
              type="number"
              id="warai"
              name="warai"
              placeholder="Warai"
              value={formData.warai}
              required
            />
          </div>

          <div className="form__input">
            <label htmlFor="penaltyCharges">Penalty Charges</label>
            <input
              type="number"
              id="penaltyCharges"
              name="penaltyCharges"
              placeholder="Penalty Charges"
              value={formData.penaltyCharges}
              required
            />
          </div>

          <div className="form__input">
            <label htmlFor="balance">Balance</label>
            <input
              type="number"
              id="balance"
              name="balance"
              placeholder="Balance"
              value={formData.balance}
              required
            />
          </div>

          <div className="form__input">
            <label htmlFor="totalBalance">Total Balance</label>
            <input
              type="number"
              id="totalBalance"
              name="totalBalance"
              placeholder="Total Balance"
              value={formData.totalBalance}
              required
            />
          </div>

          <div className="form__input">
            <label htmlFor="tds">TDS</label>
            <input
              type="number"
              id="tds"
              name="tds"
              placeholder="TDS"
              value={formData.tds}
              required
            />
          </div>

          <div className="form__input">
            <label htmlFor="payableAmount">Payable Amount</label>
            <input
              type="number"
              id="payableAmount"
              name="payableAmount"
              placeholder="Payable Amount"
              value={formData.payableAmount}
              required
            />
          </div>
        </form>
        <div>
          <button
            className="button"
            onClick={() => navigate(`/edit-balance-sheet/${formData._id}`)}
          >
            Edit
          </button>
          <button
            className="button"
            onClick={() => handleDelete(formData._id)}
            style={{ marginLeft: "10px", color: "red" }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewBalanceSheet;
