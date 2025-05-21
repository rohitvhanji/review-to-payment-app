import { useState } from 'react';
import QRCode from 'react-qr-code';
import './index.css';

const GOOGLE_REVIEW_URL = "https://www.google.com/search?rlz=1C5GCCM_en___IN1147&sca_esv=b97c0088c4eec1a1&cs=1&si=APYL9bs7Hg2KMLB-4tSoTdxuOx8BdRvHbByC_AuVpNyh0x2KzQON-usm7ehNRpdkdqvhOZKKPSstjoKtQ2CnFy0Vt1Y7LBMuPBHBWzJdz36Pvc6uTC5IeAjE6vU3riloyClqFMzroMBObusigP17WT2VIugZpgSrDQ%3D%3D&q=Dr.+Dhanale+Dental+Care+Reviews&sa=X&ved=2ahUKEwjq9ousx7SNAxXQ-TgGHao5NrsQ0bkNegQIHxAD&biw=1382&bih=793&dpr=2.5#lrd=0x3bc101acc68de19d:0x71178828d31100c6,3,,,,"; // Your Google review link
const PAYMENT_LINK = "upi://pay?pa=dhanaledental@upi&pn=DhanaleDentalCare"; // Replace with real UPI or Stripe link

export default function App() {
  const [step, setStep] = useState("review");

  const handleReviewClick = () => {
    window.open(GOOGLE_REVIEW_URL, "_blank");
    setStep("confirm");
  };

  const handleConfirmClick = async () => {
    // Optional: record confirmation in backend
    try {
      await fetch("https://your-backend-url.onrender.com/api/confirm-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ confirmed: true }),
      });
    } catch (err) {
      console.log("Confirmation logging failed:", err);
    }
    setStep("pay");
  };

  return (
    <div className="container">
      <header>
        <img src="/logo.png" alt="Dhanale Dental Care" className="logo" />
        <h1>Thank you for visiting <span>Dhanale Dental Care</span></h1>
      </header>

      <main>
        {step === "review" && (
          <div className="card">
            <h2>Support us with a quick Google review ❤️</h2>
            <p>Tap below and share your feedback.</p>
            <button className="btn" onClick={handleReviewClick}>
              Leave a Review
            </button>
          </div>
        )}

        {step === "confirm" && (
          <div className="card">
            <h2>Did you leave the review?</h2>
            <button className="btn" onClick={handleConfirmClick}>
              Yes, show payment QR
            </button>
          </div>
        )}

        {step === "pay" && (
          <div className="card">
            <h2>Scan to Pay</h2>
            <QRCode value={PAYMENT_LINK} size={200} />
            <p style={{ marginTop: "1rem" }}>UPI ID: dhanaledental@upi</p>
          </div>
        )}
      </main>

      <footer>
        © 2025 Dhanale Dental Care · Crafted with care
      </footer>
    </div>
  );
}
