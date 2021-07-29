import React from "react";
import { Form, Button } from "react-bootstrap";


function DrPoll(props) {
    let lastNames = [];
    for (let i = 0; i < props.drivers.length; i++) {
        lastNames.push(props.drivers[i].slice(3));
    }

    function click(button) {
        if (button.classList.contains("active")) {
            button.classList.remove("active");
        } else {
            button.classList.add("active");
        }
    }

    return (
        <div className="poll-section">
            <div className="dr-poll">
                <form className="dr-form">
                    <button id={lastNames[0]} className="custom-btn first-btn" type="button" value={props.drivers[0]} onClick={() => click(document.getElementById(lastNames[0]))}>{props.drivers[0]}</button>
                    {(props.drivers.slice(1, props.drivers.length - 1)).map((name, index) => (
                        <button id={lastNames[index + 1]} className="custom-btn" type="button" value={name} onClick={() => click(document.getElementById(lastNames[index + 1]))}>{name}</button>
                    ))}
                    <button id={lastNames[19]} className="custom-btn last-btn" type="button" value={props.drivers[19]} onClick={() => click(document.getElementById(lastNames[19]))}>{props.drivers[19]}</button>
                </form>
                <button type="submit" className="submit-btn">Submit</button>
            </div>
            <div className="dr-results">
            </div>
        </div>
    )
}

export default DrPoll;