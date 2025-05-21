import { useState } from 'react';
import QRCode from 'react-qr-code';

const GOOGLE_REVIEW_URL = "https://www.google.com/search?q=amogh+dhanale+clinic+kolhapur&sca_esv=b97c0088c4eec1a1&rlz=1C5GCCM_en___IN1147&ei=hsQtaIX4H97V4-EPma7IkAs&ved=0ahUKEwiF0_bfxbSNAxXe6jgGHRkXErIQ4dUDCBA&uact=5&oq=amogh+dhanale+clinic+kolhapur&gs_lp=Egxnd3Mtd2l6LXNlcnAiHWFtb2doIGRoYW5hbGUgY2xpbmljIGtvbGhhcHVyMgcQIRigARgKMgcQIRigARgKSLkQUIADWJEPcAF4AJABAJgB_QGgAZ8MqgEFMC44LjG4AQPIAQD4AQGYAgmgAqYLwgILEAAYgAQYsAMYogSYAwCIBgGQBgWSBwUxLjYuMqAH6i6yBwUwLjYuMrgHoQs&sclient=gws-wiz-serp&lqi=Ch1hbW9naCBkaGFuYWxlIGNsaW5pYyBrb2xoYXB1ckjjmdSG2bGAgAhaKRAAEAEQAhgBGAMiHWFtb2doIGRoYW5hbGUgY2xpbmljIGtvbGhhcHVykgENZGVudGFsX2NsaW5pYw#rlimm=8149131759671378118&lrd=0x3bc101acc68de19d:0x71178828d31100c6,3,,,,"; // replace with your Google link
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
