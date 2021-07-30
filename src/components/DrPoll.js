import React from "react";
import { Bar } from "react-chartjs-2";


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

    let dataset = [{
        axis: 'y',
        label: '',
        data: [95, 90, 85, 80, 75, 70, 65, 60, 50, 55, 45, 40, 35, 25, 30, 25, 20, 15, 10, 5],
        backgroundColor: props.bgColors,
        borderColor: props.colors,
        borderWidth: 1
    }]

    let options = {
        indexAxis: 'y',
        plugins: {
            title: {
                display: true,
                fullSize: false,
                padding: 30,
                text: "F1 Community on Drivers' Value",
                color: "rgb(255, 255, 255)",
                font: {
                    family: "'Titillium Web', sans-serif",
                    weight: "400",
                    size: 30,
                }
            },
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        let label = context.parsed.y + "% of Community";
                        return label;
                    }
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "% of Community that Deems Driver as Valuable",
                    padding: 20,
                    color: "rgb(255, 255, 255)",
                    font: {
                        family: "'Titillium Web', sans-serif",
                        weight: "400",
                        size: 20
                    }
                },
                ticks: {
                    callback: function(value) {
                        return value + '%';
                    },
                    font: {
                        family: "'Titillium Web', sans-serif",
                        weight: "400",
                        size: 15
                    }
                },
                grid: {
                    color: "rgba(101,101,101, 0.1)"
                }
            },
            y: {
                title: {
                    display: false
                },
                ticks: {
                    font: {
                        family: "'Titillium Web', sans-serif",
                        weight: "400",
                        size: 15
                    }
                },
                min: 0,
                max: 100,
                grid: {
                    color: "rgba(101,101,101, 0.1)"
                }
            }
        },
        maintainAspectRatio: false
    }

    const data = {
        labels: props.drivers,
        datasets: dataset
    }

    return (
        <div className="poll-section">
            <div className="dr-poll">
                <h3 className="dr-poll-title">Which drivers currently have the best value?</h3>
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
                {/* <h3 className="dr-poll-title">F1 Community on</h3> */}
                <Bar data={data} options={options} />
            </div>
        </div>
    )
}

export default DrPoll;