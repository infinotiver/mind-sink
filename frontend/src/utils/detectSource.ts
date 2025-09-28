import React from "react";
import { FiLink, FiLinkedin } from "react-icons/fi";
import { FaAmazon, FaDiscord, FaEtsy, FaFacebook, FaGithub, FaInstagram, FaPinterest, FaReddit, FaTwitter, FaUnsplash, FaYoutube } from "react-icons/fa";
import type { JSX } from "react/jsx-runtime";

const sourceMap: Record<string, { icon: JSX.Element; name: string }> = {
  "pinterest.com": { icon: React.createElement(FaPinterest), name: "Pinterest" },
  "i.pinimg.com": { icon: React.createElement(FaPinterest), name: "Pinterest" },
  "youtube.com": { icon: React.createElement(FaYoutube), name: "YouTube" },
  "youtu.be": { icon: React.createElement(FaYoutube), name: "YouTube" },
  "instagram.com": { icon: React.createElement(FaInstagram), name: "Instagram" },
  "twitter.com": { icon: React.createElement(FaTwitter), name: "Twitter" },
  "facebook.com": { icon: React.createElement(FaFacebook), name: "Facebook" },
  "amazon.com": { icon: React.createElement(FaAmazon), name: "Amazon" },
  "etsy.com": { icon: React.createElement(FaEtsy), name: "Etsy" },
  "unsplash.com": { icon: React.createElement(FaUnsplash), name: "Unsplash" },
  "discord.com": { icon: React.createElement(FaDiscord), name: "Discord" },
  "discord.gg": { icon: React.createElement(FaDiscord), name: "Discord" },
  "github.com": { icon: React.createElement(FaGithub), name: "GitHub" },
  "linkedin.com": { icon: React.createElement(FiLinkedin), name: "LinkedIn" },
  "reddit.com": { icon: React.createElement(FaReddit), name: "Reddit" },
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
