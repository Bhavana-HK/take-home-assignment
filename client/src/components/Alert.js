import React from "react";

export default function Alert(props) {
  return (
    <p className="">
      {props.message}
      {props.children}
    </p>
  );
}