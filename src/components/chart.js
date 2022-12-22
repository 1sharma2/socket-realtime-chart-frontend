import React, {useEffect, useState} from "react";
import ReactECharts from 'echarts-for-react';
import io from "socket.io-client";
const options = {
    grid: { top: 8, right: 8, bottom: 24, left: 36 },
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
        type: 'value',
    },
    series: [
        {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            smooth: true,
        },
    ],
    tooltip: {
        trigger: 'axis',
    },
};

let socket;
const Chart = () => {
    const ENDPOINT = "http://localhost:5000";
    socket = io(ENDPOINT, {
        transports: ["websocket", "polling", "flashsocket"],
    });


    const [optionsFromState, setOptions] = useState(options);

    useEffect(() => {
        // listen from backend and add message
        socket.on("lineChartFetchResponse", (data) => {
            const newData = {
                data: data,
                type: 'line',
                smooth: true,
            }
            setOptions(prevState => ({...prevState, series: [newData]}));
        });
    }, []);

    // Function to send message from frontend
    const getStartGettingData = (e) => {
        e.preventDefault();
            socket.emit("fetchRequestForLineChart", true);
    };
    return (
        <>
            <button onClick={getStartGettingData}>Start Real time data</button>
            <ReactECharts option={optionsFromState} />
        </>
    );
};

export default Chart;
