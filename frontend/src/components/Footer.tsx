import React from "react";

export default function Footer() {
  return (
    <footer className="mt-4 ">
      © {new Date().getFullYear()}{" "}
      <strong>Shortly: O encurtador mais funcional de todos</strong>
    </footer>
  );
}
