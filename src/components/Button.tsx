import React from "react";
import "./button.css";

interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset"; // Limit type options
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  buttonStyle?: "btn--primary" | "btn--outline" | "btn--form";
  buttonSize?: "btn--medium" | "btn--large" | "btn--form";
}

const STYLES: ButtonProps["buttonStyle"][] = [
  "btn--primary",
  "btn--outline",
  "btn--form",
];
const SIZES: ButtonProps["buttonSize"][] = [
  "btn--medium",
  "btn--large",
  "btn--form",
];

export const Button: React.FC<ButtonProps> = ({
  children,
  type = "button",
  onClick,
  buttonStyle = "btn--primary",
  buttonSize = "btn--medium",
}) => {
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : "btn--primary";
  const checkButtonSize = SIZES.includes(buttonSize)
    ? buttonSize
    : "btn--medium";

  return (
    <button
      className={`btn ${checkButtonStyle} ${checkButtonSize}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};
