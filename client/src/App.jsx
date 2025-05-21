import { useState } from 'react';
import QRCode from 'react-qr-code';
import PatientForm from './PatientForm';

const GOOGLE_REVIEW_URL = "https://www.google.com/search?rlz=1C5GCCM_en___IN1147&sca_esv=b97c0088c4eec1a1&cs=1&si=APYL9bs7Hg2KMLB-4tSoTdxuOx8BdRvHbByC_AuVpNyh0x2KzQON-usm7ehNRpdkdqvhOZKKPSstjoKtQ2CnFy0Vt1Y7LBMuPBHBWzJdz36Pvc6uTC5IeAjE6vU3riloyClqFMzroMBObusigP17WT2VIugZpgSrDQ%3D%3D&q=Dr.+Dhanale+Dental+Care+Reviews&sa=X&ved=2ahUKEwjq9ousx7SNAxXQ-TgGHao5NrsQ0bkNegQIHxAD&biw=1382&bih=793&dpr=2.5#lrd=0x3bc101acc68de19d:0x71178828d31100c6,3,,,,";
const PAYMENT_LINK = "upi://pay?pa=yourupi@upi&pn=DhanaleDental";

function App() {
  const [step, setStep] = useState("case");

  const handleFormSubmit = () => setStep("review");
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
    <div className="p-6 max-w-xl mx-auto text-center font-sans">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Dhanale Dental Care</h1>

      {step === "case" && <PatientForm onSubmit={handleFormSubmit} />}

      {step === "review" && (
        <>
          <h2 className="text-xl mb-4">Please leave us a review on Google</h2>
          <button onClick={handleReviewClick} className="bg-green-600 text-white px-4 py-2 rounded">
            Leave Review
          </button>
        </>
      )}

      {step === "confirm" && (
        <>
          <h2 className="mb-4">Did you submit the review?</h2>
          <button onClick={handleConfirmClick} className="bg-blue-600 text-white px-4 py-2 rounded">
            Yes, show payment QR
          </button>
        </>
      )}

      {step === "pay" && (
        <>
          <h2 className="mb-4">Scan to Pay</h2>
          <QRCode value={PAYMENT_LINK} size={200} />
        </>
      )}
    </div>
  );
}

export default App;
