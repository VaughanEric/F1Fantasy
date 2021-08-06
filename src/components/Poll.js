import React from 'react';
import { Bar } from 'react-chartjs-2';

import mongodbUpdate from '../services/mongodbUpdate';
import mongodbRetrieve from '../services/mongodbRetrieve';


function Poll(props) {
    let idNames = props.idNames;
    let displayNames = props.displayNames;
    let position = props.position;

    function playerClick(button) {
        if (button.classList.contains('active')) {
            button.classList.remove('active');
        } else {
            button.classList.add('active');
        }
    }

    function submitClick() {
        let buttons = document.getElementsByClassName('custom-btn');
        let activeButtonIds = [];

        for(let i = 0; i < buttons.length; i++) {
            if (buttons[i].classList.contains('active')) {
                activeButtonIds.push(buttons[i].id);
                buttons[i].classList.remove('active');
            }
        }

        mongodbUpdate(activeButtonIds);
        mongodbRetrieve();
    }

    let dataset = [{
        axis: 'y',
        label: '',
        data: props.data,
        backgroundColor: props.bgColors,
        borderColor: props.colors,
        borderWidth: 2
    }]

    let options = {
        indexAxis: 'y',
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        let label = context.parsed.x + '% of Community';
                        return label;
                    }
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: false,
                    text: `% of Community that Deems ${position} as Valuable`,
                    padding: 20,
                    color: 'rgb(255, 255, 255)',
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
                    color: 'rgba(101,101,101, 0.1)'
                },
                position: "top"
                
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
        labels: displayNames,
        datasets: dataset
    }

    return (
        <div className="poll-section">
            <h2 className="poll-title">F1 Community on {position}s' Value</h2>
            <div className="poll">
                <h3 className="poll-question">Which {position}s currently have the best value?</h3>
                <form className="form">
                    <button id={idNames[0]} className="custom-btn first-btn" type="button" value={idNames[0]} onClick={() => playerClick(document.getElementById(idNames[0]))}>{displayNames[0]}</button>
                    {(displayNames.slice(1, displayNames.length - 1)).map((name, index) => (
                        <button id={idNames[index + 1]} className="custom-btn" type="button" value={name} onClick={() => playerClick(document.getElementById(idNames[index + 1]))}>{name}</button>
                    ))}
                    <button id={idNames[idNames.length - 1]} className="custom-btn last-btn" type="button" value={idNames[idNames.length - 1]} onClick={() => playerClick(document.getElementById(idNames[idNames.length - 1]))}>{displayNames[idNames.length - 1]}</button>
                </form>
                <button type="submit" className="submit-btn" onClick={submitClick}>Submit</button>
            </div>
            <div id={position} className="results">
                <h3 className="results-axis">% of Community that Deems Each {position} as Valuable</h3>
                <Bar data={data} options={options} />
                <br></br>
            </div>
        </div>
    )
}

export default Poll;