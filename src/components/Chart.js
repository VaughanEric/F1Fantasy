import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

import Poll from './Poll';
import fantasyapiRetrieve from '../services/fantasyapiRetrieve';

function Chart() {
    const [weeks, setWeeks] = useState([]);
    const [drNames, setDrNames] = useState([]);
    const [drLNames, setDrLNames] = useState([]);
    const [drPriceHistories, setDrPriceHistories] = useState([]);
    const [drColors, setDrColors] = useState([]);
    const [drBgColors, setDrBgColors] = useState([]);
    const [drDashes, setDrDashes] = useState([]);
    const [crNames, setCrNames] = useState([]);
    const [crPriceHistories, setCrPriceHistories] = useState([]);
    const [crColors, setCrColors] = useState([]);
    const [crBgColors, setCrBgColors] = useState([]);
    const [crTeamAbbr, setCrTeamAbbr] = useState([]);

    async function getApiData() {
        const response = await fantasyapiRetrieve();
        setWeeks(response.data.weeks);
        setDrNames(response.data.drNames);
        setDrLNames(response.data.drLNames);
        setDrPriceHistories(response.data.drPriceHistories);
        setDrColors(response.data.drColors);
        setDrBgColors(response.data.drBgColors);
        setDrDashes(response.data.drDashes);
        setCrNames(response.data.crNames);
        setCrPriceHistories(response.data.crPriceHistories);
        setCrColors(response.data.crColors);
        setCrBgColors(response.data.crBgColors);
        setCrTeamAbbr(response.data.crTeamAbbr);
    }

    useEffect(() => {
        getApiData();
    }, []);

    const drPollData = [95, 90, 85, 80, 75, 70, 65, 60, 50, 55, 45, 40, 35, 25, 30, 25, 20, 15, 10, 5];
    const crPollData = [95, 50, 80, 75, 45, 40, 35, 30, 10, 5];


    let drDatasets = []
    for(let i = 0; i < drNames.length; i++) {
        drDatasets.push({
            label: drNames[i],
            data: drPriceHistories[i],
            backgroundColor: drBgColors[i],
            borderColor: drColors[i],
            borderDash: drDashes[i], 
            borderWidth: 1.5,
            pointBackgroundColor: drColors[i]
        });
    }

    let drOptions = {
        plugins: {
            title: {
                display: true,
                fullSize: false,
                padding: 30,
                text: "Drivers' Price Per Round",
                color: "rgb(0, 0, 0)",
                font: {
                    family: "'Titillium Web', sans-serif",
                    weight: "700",
                    size: 30
                }
            },
            legend: {
                display: true,
                fullSize: false,
                title: {
                    display: true,
                    text: "Drivers (Most to Least Fantasy Points)",
                    color: "rgb(0, 0, 0)",
                    font: {
                        family: "'Titillium Web', sans-serif",
                        weight: "400",
                        style: "italic",
                        size: 20
                    }
                },
                labels: {
                    boxWidth: 12,
                    boxHeight: 12,
                    padding: 20,
                    font: {
                        family: "'Titillium Web', sans-serif",
                        weight: "400",
                    }
                }
            },
            tooltip: {
                callbacks: {
                    title: function(context) { 
                        return "Round " + context[0].label;
                    },
                    label: function(context) {
                        let label = context.dataset.label + ": ";
                        label += ('$' + context.parsed.y + " M");
                        return label;
                    }
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Rounds",
                    padding: 20,
                    color: "rgb(0, 0, 0)",
                    font: {
                        family: "'Titillium Web', sans-serif",
                        weight: "400",
                        size: 20
                    }
                },
                ticks: {
                    font: {
                        family: "'Titillium Web', sans-serif",
                        weight: "400",
                        size: 15
                    }
                }
            },
            y: {
                title: {
                    display: true,
                    text: "Price (Millions of $)",
                    padding: 20,
                    color: "rgb(0, 0, 0)",
                    font: {
                        family: "'Titillium Web', sans-serif",
                        weight: "400",
                        size: 20
                    }
                },
                ticks: {
                    callback: function(value) {
                        return '$' + value;
                    },
                    font: {
                        family: "'Titillium Web', sans-serif",
                        weight: "400",
                        size: 15
                    }
                },
                min: 0,
                max: 35
            }
        },
        aspectRatio: 1.5
    }

    const drData = {
        labels: weeks,
        datasets: drDatasets
    };

    let crDatasets = []
    for(let i = 0; i < crNames.length; i++) {
        crDatasets.push({
            label: crNames[i],
            data: crPriceHistories[i],
            backgroundColor: crBgColors[i],
            borderColor: crColors[i],
            borderWidth: 1.5,
            pointBackgroundColor: crColors[i]
        });
    }

    let crOptions = {
        plugins: {
            title: {
                display: true,
                fullSize: false,
                padding: 30,
                text: "Constructors' Price Per Round",
                color: "rgb(0, 0, 0)",
                font: {
                    family: "'Titillium Web', sans-serif",
                    weight: "700",
                    size: 30
                }
            },
            legend: {
                display: true,
                fullSize: false,
                title: {
                    display: true,
                    text: "Constructors (Most to Least Fantasy Points)",
                    color: "rgb(0, 0, 0)",
                    font: {
                        family: "'Titillium Web', sans-serif",
                        weight: "400",
                        style: "italic",
                        size: 20
                    }
                },
                labels: {
                    boxWidth: 12,
                    boxHeight: 12,
                    padding: 20,
                }
            },
            tooltip: {
                callbacks: {
                    title: function(context) { 
                        return "Round " + context[0].label;
                    },
                    label: function(context) {
                        let label = context.dataset.label + ": ";
                        label += ('$' + context.parsed.y + " M");
                        return label;
                    }
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Rounds",
                    padding: 20,
                    color: "rgb(0, 0, 0)",
                    font: {
                        family: "'Titillium Web', sans-serif",
                        weight: "400",
                        size: 20
                    }
                },
                ticks: {
                    font: {
                        family: "'Titillium Web', sans-serif",
                        weight: "400",
                        size: 15
                    }
                }
            },
            y: {
                title: {
                    display: true,
                    text: "Price (Millions of $)",
                    padding: 20,
                    color: "rgb(0, 0, 0)",
                    font: {
                        family: "'Titillium Web', sans-serif",
                        weight: "400",
                        size: 20
                    }
                },
                ticks: {
                    callback: function(value) {
                        return '$' + value;
                    },
                    font: {
                        family: "'Titillium Web', sans-serif",
                        weight: "400",
                        size: 15
                    }
                },
                min: 0,
                max: 40
            }
        },
        aspectRatio: 1.5
    }

    const crData = {
        labels: weeks,
        datasets: crDatasets
    }

    return (
        <div>
            <div className="chart"> 
                <Line data={drData} options={drOptions} />
            </div>
            <Poll 
                data={drPollData}
                playerClass={"driver"} 
                idNames={drLNames}
                submitIdName={"submit-drivers"}
                displayNames={drNames} 
                position={"Driver"} 
            />
            <div className="chart">
                <Line data={crData} options={crOptions} />
            </div>
            <Poll
                data={crPollData}
                playerClass={"constructor"}
                idNames={crTeamAbbr}
                submitIdName={"submit-contructors"} 
                displayNames={crNames} 
                position={"Constructor"} 
            />
            <div className="footer">
                <p>Site by Eric Vaughan (2021)</p>
            </div>
        </div>
    );
}

export default Chart;