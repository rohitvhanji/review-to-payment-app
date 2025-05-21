import { useState } from 'react';
import QRCode from 'react-qr-code';
import PatientForm from './PatientForm';

const GOOGLE_REVIEW_URL = "https://g.co/kgs/jEdHyuL";
const PAYMENT_LINK = "upi://pay?pa=yourupi@upi&pn=YourName";

function PatientHome() {
  const [step, setStep] = useState("review");

  const handleReviewClick = () => {
    window.open(GOOGLE_REVIEW_URL, "_blank");
    setStep("confirm");
  };

  const handleConfirmClick = async () => {
    await fetch("https://review-to-payment-app.onrender.com/api/confirm-review", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ confirmed: true }),
    });
    setStep("pay");
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center", fontFamily: "sans-serif" }}>
      <h1>Dhanale Dental Care</h1>
      {step === "review" && (
        <>
          <h2>Support us with a quick Google review ❤️</h2>
          <button onClick={handleReviewClick}>Leave a Review</button>
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
      <hr style={{ margin: "2rem 0" }} />
      <PatientForm />
    </div>
  );
}

export default PatientHome;
