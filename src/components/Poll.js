import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

import mongodbUpdate from '../services/mongodbUpdate';
import mongodbRetrieve from '../services/mongodbRetrieve';


function Poll(props) {
    let playerClass = props.playerClass
    let idNames = props.idNames;
    let submitIdName = props.submitIdName;
    let displayNames = props.displayNames;
    let position = props.position;
    const [playerNames, setPlayerNames] = useState([]);
    const [playerPercentages, setPlayerPercentages] = useState([]);
    const [colors, setColors] = useState([]);
    const [bgColors, setBgColors] = useState([]);

    useEffect(() => {
        console.log("Values changed", props.idNames);
        getDataOnLoad();
    }, [props.idNames]);
    
    async function getDataOnLoad() {
        let response = await mongodbRetrieve(playerClass, idNames);
        setPlayerNames(response.data.data.playerData.names);
        setPlayerPercentages(response.data.data.playerData.percentages);
        setColors(response.data.data.playerData.colors);
        setBgColors(response.data.data.playerData.bgColors);
    }

    function playerClick(button) {
        if (button.classList.contains('active')) {
            button.classList.remove('active');
        } else {
            button.classList.add('active');
        }
    }

    async function submitClick() {
        let buttons = [];
        let activeButtonIds = [];
        buttons = document.getElementsByClassName(playerClass);

        for(let i = 0; i < buttons.length; i++) {
            if (buttons[i].classList.contains('active')) {
                activeButtonIds.push(buttons[i].id);
                buttons[i].classList.remove('active');
            }
        }
        await mongodbUpdate(activeButtonIds, playerClass);
        
        // There is a latency for which I cannot account, even after consulting with a professional in the field.
        // The function above updates the database, but the retrieval function pulls data from the database before the update function finishes despite using the keyword await.
        // This could simply be a side effect of me using the free version of mongoDB.
        // Thus, at least for now, I am using setTimeout.
        setTimeout(async function() {
            let response = await mongodbRetrieve(playerClass, idNames);
            setPlayerNames(response.data.data.playerData.names);
            setPlayerPercentages(response.data.data.playerData.percentages);
            setColors(response.data.data.playerData.colors);
            setBgColors(response.data.data.playerData.bgColors);
        }, 150);
    }

    console.log(playerPercentages);

    let dataset = [{
        axis: 'y',
        label: '',
        data: playerPercentages,
        backgroundColor: bgColors,
        borderColor: colors,
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
                grid: {
                    color: "rgba(101,101,101, 0.1)"
                }
            }
        },
        maintainAspectRatio: false
    }

    const data = {
        labels: playerNames,
        datasets: dataset
    }

    return (
        <div className="poll-section">
            <h2 className="poll-title">F1 Community on {position}s' Value</h2>
            <div className="poll"> 
                <h3 className="poll-question">Which {position}s currently have the best value?</h3>
                <form className="form">
                    <button id={idNames[0]} className={`custom-btn first-btn ${playerClass}`} type="button" value={idNames[0]} onClick={() => playerClick(document.getElementById(idNames[0]))}>{displayNames[0]}</button>
                    {(displayNames.slice(1, displayNames.length - 1)).map((name, index) => (
                        <button id={idNames[index + 1]} className={`custom-btn ${playerClass}`} type="button" value={name} onClick={() => playerClick(document.getElementById(idNames[index + 1]))}>{name}</button>
                    ))}
                    <button id={idNames[idNames.length - 1]} className={`custom-btn last-btn ${playerClass}`} type="button" value={idNames[idNames.length - 1]} onClick={() => playerClick(document.getElementById(idNames[idNames.length - 1]))}>{displayNames[idNames.length - 1]}</button>
                </form>
                <button id={submitIdName} className="submit-btn" type="submit" onClick={submitClick}>Submit</button>
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