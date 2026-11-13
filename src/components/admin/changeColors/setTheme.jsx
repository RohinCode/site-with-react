import { useEffect, useState } from "react";

const themes = {
  blue: {
    primary: "#115696",
    secondary: "#64748b",
    background: "#ffffff",
    Darkbackground: "#1f1f1f",
    headerBackgroind: "#234a85ee",
    surface: "#f1f5f9",
    text: "#121b30",
    text2: "#a9b7d1",
    background2: "#1b3264",
    danger: "#ef4444",
    navy: "#0b1b34",
    botton: "#1e3a6e",
    border: "#ffffff99",
  },

  purple: {
    primary: "#961180",
    secondary: "#64748b",
    background: "#ffffff",
    Darkbackground: "#1f1f1f",
    headerBackgroind: "#7a2385ee",
    surface: "#f1f5f9",
    text: "#30122b",
    text2: "#d1a9cc",
    background2: "#641b4c",
    danger: "#ef4444",
    navy: "#340b2d",
    botton: "#6e1e56",
    border: "#ffffff99",
  },

  green: {
    primary: "#2c9213",
    secondary: "#64748b",
    background: "#ffffff",
    Darkbackground: "#1f1f1f",
    headerBackgroind: "#378523ee",
    surface: "#f1f5f9",
    text: "#123012",
    text2: "#d1a9cc",
    background2: "#1d5017",
    danger: "#ef4444",
    navy: "#0b340b",
    botton: "#20611a",
    border: "#ffffff99",
  },

  orange: {
    primary: "#ff9a03",
    secondary: "#64748b",
    background: "#ffffff",
    Darkbackground: "#1f1f1f",
    headerBackgroind: "#ff7d03ee",
    surface: "#f1f5f9",
    text: "#6d3615",
    text2: "#a9b7d1",
    background2: "#8a5417",
    danger: "#ef4444",
    navy: "#7a4e1c",
    botton: "#cf8b25",
    border: "#ffffff99",
  },

  yellow: {
    primary: "#ddda0f",
    secondary: "#64748b",
    background: "#ffffff",
    Darkbackground: "#1f1f1f",
    headerBackgroind: "#cfc31aee",
    surface: "#f1f5f9",
    text: "#262c11",
    text2: "#a9b7d1",
    background2: "#717a20",
    danger: "#ef4444",
    navy: "#474610",
    botton: "#bdc020",
    border: "#ffffff99",
  },

  pink: {
    primary: "#eb9de0",
    secondary: "#64748b",
    background: "#ffffff",
    Darkbackground: "#1f1f1f",
    headerBackgroind: "#e746ecee",
    surface: "#f1f5f9",
    text: "#1f0c1c",
    text2: "#a9b7d1",
    background2: "#772083",
    danger: "#ef4444",
    navy: "#a72dac",
    botton: "#c83fe4",
    border: "#ffffff99",
  },

  gray: {
    primary: "#9d9e9d",
    secondary: "#64748b",
    background: "#ffffff",
    Darkbackground: "#1f1f1f",
    headerBackgroind: "#b1b1b1ee",
    surface: "#f1f5f9",
    text: "#292829",
    text2: "#a9b7d1",
    background2: "#646464",
    danger: "#ef4444",
    navy: "#424242",
    botton: "#969595",
    border: "#ffffff99",
  },
};

function SetTheme({ color }) {
  useEffect(() => {
    const theme = themes[color];

    if (!theme) return;

    Object.entries(theme).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--${key}`, value);
    });
  }, [color]);

  return null;
}

export default SetTheme;
