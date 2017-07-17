import React from 'react';
import "../css/buttonStyle.css";

export default function FacebookButton(props){
    return (
      <a className="facebookButton" onClick={() => props.onClick()}>Continue with Facebook</a>
    );
};