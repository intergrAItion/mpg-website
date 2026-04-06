"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href="https://wa.me/27711720480"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundColor: "#25D366",
        borderRadius: "50px",
        padding: isHovered ? "12px 20px" : "14px",
        boxShadow: "0 4px 20px rgba(37, 211, 102, 0.4)",
      }}
    >
      <MessageCircle
        size={24}
        color="white"
        className="whatsapp-pulse flex-shrink-0"
      />
      {isHovered && (
        <span
          className="text-white text-sm font-medium whitespace-nowrap"
          style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
        >
          Chat with us
        </span>
      )}
    </a>
  );
}
