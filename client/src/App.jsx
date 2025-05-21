import { useState } from 'react';
import axios from 'axios';
import QRCode from 'react-qr-code';

const GOOGLE_REVIEW_URL = "https://g.co/kgs/jEdHyuL"; // Your Google Review Link
const PAYMENT_LINK = "upi://pay?pa=yourupi@upi&pn=YourName"; // Your payment link

function App() {
  const [step, setStep] = useState("review");
  const [caseData, setCaseData] = useState({
    name: "",
    contact: "",
    description: "",
    date: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Review flow handlers (as before)
  const handleReviewClick = () => {
    window.open(GOOGLE_REVIEW_URL, "_blank");
    setStep("confirm");
  };
  const handleConfirmClick = async () => {
    await axios.post('/api/confirm-review', { confirmed: true });
    setStep("pay");
  };

  // Patient case form submit handler
  const handleInputChange = e => {
    setCaseData({ ...caseData, [e.target.name]: e.target.value });
  };

  const handleSubmitCase = async e => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await axios.post('https://review-to-payment-app.onrender.com/api/case', caseData);
      alert("Case submitted successfully!");
      setCaseData({ name: "", contact: "", description: "", date: "" });
    } catch (err) {
      setError("Failed to submit case. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial", maxWidth: 600, margin: "auto" }}>
      <h1>Dhanale Dental Care</h1>

      {/* Patient Case Form */}
      <section style={{ marginBottom: "2rem" }}>
        <h2>Submit Your Case</h2>
        <form onSubmit={handleSubmitCase}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={caseData.name}
            onChange={handleInputChange}
            required
            style={{ display: "block", marginBottom: "0.5rem", width: "100%" }}
          />
          <input
            type="text"
            name="contact"
            placeholder="Contact Number"
            value={caseData.contact}
            onChange={handleInputChange}
            required
            style={{ display: "block", marginBottom: "0.5rem", width: "100%" }}
          />
          <textarea
            name="description"
            placeholder="Case Description"
            value={caseData.description}
            onChange={handleInputChange}
            required
            style={{ display: "block", marginBottom: "0.5rem", width: "100%", minHeight: 80 }}
          />
          <input
            type="date"
            name="date"
            value={caseData.date}
            onChange={handleInputChange}
            required
            style={{ display: "block", marginBottom: "0.5rem" }}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Case"}
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      </section>

      {/* Review & Payment flow */}
      {step === "review" && (
        <>
          <h2>Leave Us a Google Review</h2>
          <button onClick={handleReviewClick}>Leave Review</button>
        </>
      )}
      {step === "confirm" && (
        <>
          <h2>Did you leave the review?</h2>
          <button onClick={handleConfirmClick}>Yes, show QR</button>
        </>
      )}
      {step === "pay" && (
        <>
          <h2>Scan to Pay</h2>
          <QRCode value={PAYMENT_LINK} size={200} />
        </>
      )}
    </div>
  );
}

export default App;
