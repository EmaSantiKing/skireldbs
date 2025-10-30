import React from "react";
import Card from "./components/Card";
import Panel from "./components/Panel";
import "./user.css";

export default function User() {
  return (
    <div className="user-page">
      <div className="user-content"> {/* NUEVO */}
        <Card />
        <Panel />
      </div>
    </div>
  );
}
