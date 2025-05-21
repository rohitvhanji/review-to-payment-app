import { useState } from 'react';
import QRCode from 'react-qr-code';
import PatientForm from './PatientForm';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

const GOOGLE_REVIEW_URL = "https://g.co/kgs/jEdHyuL";
const PAYMENT_LINK = "upi://pay?pa=yourupi@upi&pn=YourName";

function App() {
  const [step, setStep] = useState("review");
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);

  const handleReviewClick = () => {
    window.open(GOOGLE_REVIEW_URL, "_blank");
    setStep("confirm");
  };

  const handleConfirmClick = async () => {
    await fetch("/api/confirm-review", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ confirmed: true }),
    });
    setStep("pay");
  };

  if (isAdmin && !adminLoggedIn) {
    return <AdminLogin onLogin={() => setAdminLoggedIn(true)} />;
  }

  if (isAdmin && adminLoggedIn) {
    return <AdminDashboard />;
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial", textAlign: "center" }}>
      <button onClick={() => setIsAdmin(true)} style={{ position: 'absolute', top: 10, right: 10 }}>Admin</button>

      {step === "review" && (
        <>
          <h1>Thank you for visiting Dhanale Dental Care</h1>
          <p>Support us with a quick Google review ❤️</p>
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
          <PatientForm />
        </>
      )}
    </div>
  );
}

export default App;
