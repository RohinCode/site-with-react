import { useState } from "react";
import ColorsMenu from "./ColorsMenu";
import SetTheme from "./setTheme";
import "../../../styles/admin/setColors.css";

function ColorTheme({ token, colors, setColors }) {
  return (
    <>
      <ColorsMenu token={token} setColors={setColors} colors={colors} />

      <SetTheme color={colors} />
    </>
  );
}

export default ColorTheme;
