import { useState } from "react";
import Register1 from "./register1";
import Register2 from "./register2";

export default function Register({ onClose }) {
  const [step, setStep] = useState(1);

  return (
    <>
      {step === 1 && <Register1 onNext={() => setStep(2)} onClose={onClose} />}
      {step === 2 && <Register2 onBack={() => setStep(1)} onRegister={onClose} />}
    </>
  );
}
