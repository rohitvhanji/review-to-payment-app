import { useState } from 'react';
import QRCode from 'react-qr-code';

const GOOGLE_REVIEW_URL = "https://g.page/r/YOUR_PLACE_ID/review"; // replace with your Google link
const PAYMENT_LINK = "upi://pay?pa=yourupi@upi&pn=YourName"; // or Stripe

function App() {
  const [step, setStep] = useState("review");

  const handleReviewClick = () => {
    window.open(GOOGLE_REVIEW_URL, "_blank");
    setStep("confirm");
  };

  const handleConfirmClick = async () => {
    await fetch("https://your-backend-url.onrender.com/api/confirm-review", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ confirmed: true }),
    });
    setStep("pay");
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial", textAlign: "center" }}>
      {step === "review" && (
        <>
          <h1>Leave Us a Google Review</h1>
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
