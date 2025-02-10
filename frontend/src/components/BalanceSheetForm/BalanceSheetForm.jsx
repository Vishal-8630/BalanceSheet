import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/AuthContext";

function BalanceSheetForm() {
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

  const [isEditMode, setIsEditMode] = useState(false);
  const [message, setMessage] = useState("");
  const { isAuthenticated } = useAuth();

  const navigate = useNavigate();
  const { id } = useParams(); // Get ID from URL if available

  useEffect(() => {
    if (!isAuthenticated) {
        navigate("/");
      }
  }, [isAuthenticated]);

  useEffect(() => {
    if (id) {
      setIsEditMode(true);
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
      setIsEditMode(true);
    } catch (error) {
      console.error("Error fetching balance sheet:", error);
      toast.error(error);
    }
  };

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission (Add / Update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditMode) {
        await axios.put(
          `http://localhost:5000/api/update-balance-sheet/${id}`,
          formData
        );
        setMessage("Balance Sheet updated successfully!");
        toast.success("Balance Sheet updated successfully");
      } else {
        await axios.post(
          "http://localhost:5000/api/add-balance-sheet/",
          formData
        );
        setMessage("Balance Sheet added successfully!");
        toast.success("Balance Sheet added successfully");
      }
      navigate("/"); // Redirect to home page
    } catch (error) {
      setMessage("Error submitting Balance Sheet.");
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="form__container">
        <h2 className="header">
          {isEditMode ? "Update Balance Sheet" : "Add Balance Sheet"}
        </h2>

        <form onSubmit={handleSubmit} className="form-group">
          <div className="form__input">
            <label htmlFor="lrNo">LR No</label>
            <input
              type="text"
              id="lrNo"
              name="lrNo"
              placeholder="LR No"
              value={formData.lrNo}
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
              required
            />
          </div>

          <div className="form__buttons">
            <button type="submit" className="button">
              {isEditMode ? "Update Balance Sheet" : "Add Balance Sheet"}
            </button>
          </div>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default BalanceSheetForm;
