import React, { useEffect, useState } from "react";

export default function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPopup(true);
    });
  }, []);

  if (!showPopup) return null;

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    if (choice.outcome === "accepted") {
      setShowPopup(false);
    }
  };

  return (
    <div className="fixed top-2 left-1/2 -translate-x-1/2 z-50 bg-gradient-to-r from-[#E9AB1D] to-[#c98a00] text-white px-4 py-3 rounded-2xl shadow-lg flex items-center gap-3 animate-fade-in">
      <span className="font-semibold"> ثبّت التطبيق</span>
      <button
        onClick={handleInstall}
        className="bg-white text-[#E9AB1D] font-bold px-3 py-1 rounded-xl"
      >
        تثبيت الآن
      </button>
      <button
        onClick={() => setShowPopup(false)}
        className="text-white ml-2 font-bold"
      >
        ✕
      </button>

      <style>
        {`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease-out;
        }
      `}
      </style>
    </div>
  );
}
