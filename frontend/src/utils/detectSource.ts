import React from "react";
import { FiLink } from "react-icons/fi";
import { FaPinterest } from "react-icons/fa";
import type { JSX } from "react/jsx-runtime";

const sourceMap: Record<string, { icon: JSX.Element; name: string }> = {
  "pinterest.com": { icon: React.createElement(FaPinterest), name: "Pinterest" },
  "i.pinimg.com": { icon: React.createElement(FaPinterest), name: "Pinterest" },
  "youtube.com": { icon: React.createElement(FiLink), name: "YouTube" },
  "youtu.be": { icon: React.createElement(FiLink), name: "YouTube" },
  "instagram.com": { icon: React.createElement(FiLink), name: "Instagram" },
  "twitter.com": { icon: React.createElement(FiLink), name: "Twitter" },
  "facebook.com": { icon: React.createElement(FiLink), name: "Facebook" },
  "amazon.com": { icon: React.createElement(FiLink), name: "Amazon" },
  "etsy.com": { icon: React.createElement(FiLink), name: "Etsy" },
};

export const detectSource = (
  link: string
): { icon: JSX.Element; name: string } => {
  try {
    const url = new URL(link);
    const hostname = url.hostname;

    for (const key in sourceMap) {
      if (hostname.includes(key)) {
        return sourceMap[key];
      }
    }
  } catch {
    // Invalid URL
  }
  return { icon: React.createElement(FiLink), name: "Unknown Source" };
};
