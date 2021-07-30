import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import DrPoll from "./DrPoll";

function Chart() {
    function quickSort(arr, left, right) {
        let pivot, partitionIndex;

        if(left < right) {
            pivot = right;
            partitionIndex = partition(arr, pivot, left, right);
            quickSort(arr, left, partitionIndex - 1);
            quickSort(arr, partitionIndex + 1, right);
        }
        return arr;
    }

    function partition(arr, pivot, left, right) {
        let pivotValue = arr[pivot].season_score;
        let partitionIndex = left;

        for(let i = left; i < right; i++) {
            if(arr[i].season_score > pivotValue) {
                swap(arr, i, partitionIndex);
                partitionIndex++;
            }
        }
        swap(arr, right, partitionIndex);
        return partitionIndex;
    }

    function swap(arr, i, j) {
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    const [weeks, setWeeks] = useState([]);
    const [drNames, setDrNames] = useState([]);
    const [drPriceHistories, setDrPriceHistories] = useState([]);
    const [crNames, setCrNames] = useState([]);
    const [crPriceHistories, setCrPriceHistories] = useState([]);
    const [drColors, setDrColors] = useState([]);
    const [drBgColors, setDrBgColors] = useState([]);
    const [drDashes, setDrDashes] = useState([]);
    const [crColors, setCrColors] = useState([]);
    const [crBgColors, setCrBgColors] = useState([]);

    let alf = 0;
    let alp = 0;
    let alt = 0;
    let ast = 0;
    let haa = 0;
    let fer = 0;
    let mcl = 0;
    let mer = 0;
    let red = 0;
    let wil = 0;

    useEffect(() => {
        let players = [];
        let weeksTemp = [];
        let drNamesTemp = [];
        let drPriceHistoriesTemp = [];
        let crNamesTemp = [];
        let crPriceHistoriesTemp = [];
        let drColorsTemp = [];
        let drBgColorsTemp = [];
        let drDashesTemp = [];
        let crColorsTemp = [];
        let crBgColorsTemp = [];

        axios
            .get("https://fantasy-api.formula1.com/partner_games/f1/players#")
            .then(res => {
                console.log(res);

                for(let i = 0; i < res.data.players.length; i++) {
                    players.push(res.data.players[i]);
                }
                quickSort(players, 0, players.length - 1);
                console.log(players);
                    
                for(let i = 0; i < players.length; i++) {
                    let player = players[i];

                    if(player.position === "Driver") {
                        drNamesTemp.push(player.display_name);

                        switch(player.team_abbreviation) {
                            case "ALF":
                                drColorsTemp.push("rgb(144, 0, 0)");
                                drBgColorsTemp.push("rgba(144, 0, 0, 0.5)");

                                if(alf === 0) {
                                    drDashesTemp.push([]);
                                    alf++;
                                } else {
                                    drDashesTemp.push([4]);
                                }
                                break;
                            case "ALP":
                                drColorsTemp.push("rgb(0, 144, 255)");
                                drBgColorsTemp.push("rgba(0, 144, 255, 0.5)");

                                if(alp === 0) {
                                    drDashesTemp.push([]);
                                    alp++;
                                } else {
                                    drDashesTemp.push([4]);
                                }
                                break;
                            case "ALT":
                                drColorsTemp.push("rgb(43, 69, 98)");
                                drBgColorsTemp.push("rgba(43, 69, 98, 0.5)");

                                if(alt === 0) {
                                    drDashesTemp.push([]);
                                    alt++;
                                } else {
                                    drDashesTemp.push([4]);
                                }
                                break;
                            case "AST":
                                drColorsTemp.push("rgb(0, 111, 98)");
                                drBgColorsTemp.push("rgba(0, 111, 98, 0.5)");

                                if(ast === 0) {
                                    drDashesTemp.push([]);
                                    ast++;
                                } else {
                                    drDashesTemp.push([4]);
                                }
                                break;
                            case "FER":
                                drColorsTemp.push("rgb(220, 0, 0)");
                                drBgColorsTemp.push("rgba(220, 0, 0, 0.5)");

                                if(fer === 0) {
                                    drDashesTemp.push([]);
                                    fer++;
                                } else {
                                    drDashesTemp.push([4]);
                                }
                                break;
                            case "HAA":
                                drColorsTemp.push("rgb(0, 0, 0)");
                                drBgColorsTemp.push("rgba(0, 0, 0, 0.5)");

                                if(haa === 0) {
                                    drDashesTemp.push([]);
                                    haa++;
                                } else {
                                    drDashesTemp.push([4]);
                                }
                                break;
                            case "MCL":
                                drColorsTemp.push("rgb(255, 152, 0)");
                                drBgColorsTemp.push("rgba(255, 152, 0, 0.5)");

                                if(mcl === 0) {
                                    drDashesTemp.push([]);
                                    mcl++;
                                } else {
                                    drDashesTemp.push([4]);
                                }
                                break;
                            case "MER":
                                drColorsTemp.push("rgb(0, 210, 190)");
                                drBgColorsTemp.push("rgba(0, 210, 190, 0.5)");

                                if(mer === 0) {
                                    drDashesTemp.push([]);
                                    mer++;
                                } else {
                                    drDashesTemp.push([4]);
                                }
                                break;
                            case "RED":
                                drColorsTemp.push("rgb(6, 0, 239)");
                                drBgColorsTemp.push("rgba(6, 0, 239, 0.5)");

                                if(red === 0) {
                                    drDashesTemp.push([]);
                                    red++;
                                } else {
                                    drDashesTemp.push([4]);
                                }
                                break;
                            case "WIL":
                                drColorsTemp.push("rgb(0, 90, 255)");
                                drBgColorsTemp.push("rgba(0, 90, 255, 0.5)");

                                if(wil === 0) {
                                    drDashesTemp.push([]);
                                    wil++;
                                } else {
                                    drDashesTemp.push([4]);
                                }
                                break; 
                            default:  
                        }
                    } else {
                        crNamesTemp.push(player.display_name);

                        switch(player.team_abbreviation) {
                            case "ALF":
                                crColorsTemp.push("rgb(144, 0, 0)");
                                crBgColorsTemp.push("rgba(144, 0, 0, 0.5)");
                                break;
                            case "ALP":
                                crColorsTemp.push("rgb(0, 144, 255)");
                                crBgColorsTemp.push("rgba(0, 144, 255, 0.5)");
                                break;
                            case "ALT":
                                crColorsTemp.push("rgb(43, 69, 98)");
                                crBgColorsTemp.push("rgba(43, 69, 98, 0.5)");
                                break;
                            case "AST":
                                crColorsTemp.push("rgb(0, 111, 98)");
                                crBgColorsTemp.push("rgba(0, 111, 98, 0.5)");
                                break;
                            case "FER":
                                crColorsTemp.push("rgb(220, 0, 0)");
                                crBgColorsTemp.push("rgba(220, 0, 0, 0.5)");
                                break;
                            case "HAA":
                                crColorsTemp.push("rgb(0, 0, 0)");
                                crBgColorsTemp.push("rgba(0, 0, 0, 0.5)");
                                break;
                            case "MCL":
                                crColorsTemp.push("rgb(255, 152, 0)");
                                crBgColorsTemp.push("rgba(255, 152, 0, 0.5)");
                                break;
                            case "MER":
                                crColorsTemp.push("rgb(0, 210, 190)");
                                crBgColorsTemp.push("rgba(0, 210, 190, 0.5)");
                                break;
                            case "RED":
                                crColorsTemp.push("rgb(6, 0, 239)");
                                crBgColorsTemp.push("rgba(6, 0, 239, 0.5)");
                                break;
                            case "WIL":
                                crColorsTemp.push("rgb(0, 90, 255)");
                                crBgColorsTemp.push("rgba(0, 90, 255, 0.5)");
                                break;
                            default:
                        }  
                    }

                    let seasonPrices = [];
                    for(let j = 0; j < player.season_prices.length; j++) {
                        seasonPrices.push(parseFloat(player.season_prices[j].price));
                    }
                    if(player.position === "Driver") {
                        drPriceHistoriesTemp.push(seasonPrices);
                    } else {
                        crPriceHistoriesTemp.push(seasonPrices);
                    }
                }

                let numberOfWeeks = drPriceHistoriesTemp[0].length;
                for(let i = 1; i <= numberOfWeeks; i++) {
                    weeksTemp.push(i);
                }

                setWeeks(weeksTemp);
                setDrNames(drNamesTemp);
                setDrPriceHistories(drPriceHistoriesTemp);
                setCrNames(crNamesTemp);
                setCrPriceHistories(crPriceHistoriesTemp);
                setDrColors(drColorsTemp);
                setDrBgColors(drBgColorsTemp);
                setDrDashes(drDashesTemp);
                setCrColors(crColorsTemp);
                setCrBgColors(crBgColorsTemp);
            })
            .catch(err => {
                console.log(err);
            }) 
    }, []);

    console.log(weeks, weeks.length);
    console.log(drNames, drNames.length);
    console.log(drPriceHistories, drPriceHistories.length);
    console.log(crNames, crNames.length);
    console.log(crPriceHistories, crPriceHistories.length);
    console.log(drColors, drColors.length);
    console.log(drDashes, drDashes.length);
    console.log(crColors, crColors.length);

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
            <DrPoll drivers={drNames} colors={drColors} bgColors={drBgColors} />
            <div className="chart">
                <Line data={crData} options={crOptions} />
            </div>
        </div>
    );
}

export default Chart;