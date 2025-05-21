import { useState } from 'react';
import QRCode from 'react-qr-code';
import axios from 'axios';

const GOOGLE_REVIEW_URL = "https://g.co/kgs/jEdHyuL"; // Your Google review link
const PAYMENT_LINK = "upi://pay?pa=yourupi@upi&pn=Dhanale Dental Care"; // Replace with your actual UPI or payment link

export default function App() {
  const [step, setStep] = useState("review");
  const [caseData, setCaseData] = useState({
    name: "",
    contact: "",
    description: "",
    date: "",
  });
  const [caseSubmitted, setCaseSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleReviewClick = () => {
    window.open(GOOGLE_REVIEW_URL, "_blank");
    setStep("confirm");
  };

  const handleConfirmClick = async () => {
    try {
      await axios.post("https://review-to-payment-app.onrender.com/api/confirm-review", { confirmed: true });
      setStep("pay");
    } catch {
      alert("Failed to confirm review, please try again.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCaseData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCaseSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await axios.post("https://review-to-payment-app.onrender.com/api/case", caseData);
      setCaseSubmitted(true);
      setCaseData({ name: "", contact: "", description: "", date: "" });
    } catch (err) {
      setError("Failed to submit case. Please try again.");
      console.log(err)
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 480, margin: "2rem auto", fontFamily: "Arial, sans-serif", padding: "1rem", textAlign: "center", border: "1px solid #ddd", borderRadius: 8 }}>
      <h1 style={{ color: "#0070f3" }}>Dhanale Dental Care</h1>
      <p>Thank you for visiting Dhanale Dental Care.<br />Support us with a quick Google review ❤️<br />Tap below and share your feedback.</p>

      {step === "review" && (
        <button style={btnStyle} onClick={handleReviewClick}>Leave a Review</button>
      )}

      {step === "confirm" && (
        <>
          <h2>Did you leave the review?</h2>
          <button style={btnStyle} onClick={handleConfirmClick}>Yes, Show Payment QR</button>
        </>
      )}

      {step === "pay" && (
        <>
          <h2>Scan to Pay</h2>
          <QRCode value={PAYMENT_LINK} size={180} />
          <p>Thank you for your support!</p>
        </>
      )}

      <hr style={{ margin: "2rem 0" }} />

      <h2>Submit Your Case Details</h2>
      {caseSubmitted && <p style={{ color: "green" }}>Case submitted successfully!</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleCaseSubmit} style={{ textAlign: "left" }}>
        <label>
          Name:<br />
          <input type="text" name="name" value={caseData.name} onChange={handleInputChange} required style={inputStyle} />
        </label><br /><br />
        <label>
          Contact Number:<br />
          <input type="tel" name="contact" value={caseData.contact} onChange={handleInputChange} required style={inputStyle} />
        </label><br /><br />
        <label>
          Description:<br />
          <textarea name="description" value={caseData.description} onChange={handleInputChange} required rows={3} style={inputStyle} />
        </label><br /><br />
        <label>
          Preferred Appointment Date:<br />
          <input type="date" name="date" value={caseData.date} onChange={handleInputChange} required style={inputStyle} />
        </label><br /><br />
        <button type="submit" disabled={loading} style={btnStyle}>
          {loading ? "Submitting..." : "Submit Case"}
        </button>
      </form>
    </div>
  );
}

const btnStyle = {
  backgroundColor: "#0070f3",
  color: "white",
  padding: "0.6rem 1.2rem",
  border: "none",
  borderRadius: 4,
  cursor: "pointer",
  fontSize: "1rem",
};

const inputStyle = {
  width: "100%",
  padding: "0.4rem 0.6rem",
  fontSize: "1rem",
  borderRadius: 4,
  border: "1px solid #ccc",
  boxSizing: "border-box",
};
