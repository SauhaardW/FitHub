import React, {useEffect, useState} from 'react';
import './Pages.css';
import axios from "axios";
import { BsArrowRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { Line } from 'react-chartjs-2';
import {Chart as ChartJS, Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement, Filler} from 'chart.js';


ChartJS.register(
    Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement, Filler
)

const History = () => {
    function padTo2Digits(num) {
        return num;
      }
      
    const navigate = useNavigate();


    const [streak, setStreak] = useState("");


    useEffect( () => {
        var today = new Date();
        axios.post("http://localhost:3001/api/workout-history/streak", {
            date: today
        }).then(res => {
            axios.get("http://localhost:3001/api/workout-history/streak").then((res) => {
                if (res.data.success){
                    setStreak(res.data.data.streak);
                }
            })  
        })
    }, []);

    const [data, setData]= useState({
        labels:["Jan", "Feb", "Mar", "April", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],

        datasets:[
            {
                label:"Height",
                hidden: true,
                data:[10, 20, 30, 42, 51, 82, 31, 59, 61, 73, 91, 58],
                backgroundColor:'Black',
                borderColor:'Red',
                tension:0.2,
                // fill: true,
                pointStyle: 'circle',
                pointBorderColor: 'Black'
            },
            {
                label:"Weight",

                data:[40, 35, 50, 60, 28, 39, 31, 59, 41, 50, 54, 58],
                backgroundColor:'Black',
                borderColor:'Green',
                tension:0.2,
                // fill: true,
                pointStyle: 'circle',
                pointBorderColor: 'Black'
            },
            {
                label:"Forearm Circumference",
                hidden: true,
                data:[10, 11, 21, 14, 8, 12, 6, 9, 11, 16, 18, 14],
                backgroundColor:'Black',
                borderColor:'Blue',
                tension:0.2,
                // fill: true,
                pointStyle: 'circle',
                pointBorderColor: 'Black'
            },
            {
                label:"Calf Circumference",
                hidden: true,
                data:[5, 2, 3, 1, 4, 2, 3, 2, 6, 2, 4, 3],
                backgroundColor:'Black',
                borderColor:'Brown',
                tension:0.2,
                // fill: true,
                pointStyle: 'circle',
                pointBorderColor: 'Black'
            },
            {
                label:"Upper Arm Circumference",
                hidden: true,
                data:[5, 2, 3, 1, 4, 2, 3, 2, 6, 2, 4, 3],
                backgroundColor:'Black',
                borderColor:'Yellow',
                tension:0.2,
                // fill: true,
                pointStyle: 'circle',
                pointBorderColor: 'Black'
            },
            {
                label:"Chest Circumference",
                hidden: true,
                data:[5, 2, 3, 1, 4, 2, 3, 2, 6, 2, 4, 3],
                backgroundColor:'Black',
                borderColor:'Purple',
                tension:0.2,
                // fill: true,
                pointStyle: 'circle',
                pointBorderColor: 'Black'
            },
            {
                label:"Thigh Circumference",
                hidden: true,
                data:[5, 2, 3, 1, 4, 2, 3, 2, 6, 2, 4, 3],
                backgroundColor:'Black',
                borderColor:'Orange',
                tension:0.2,
                // fill: true,
                pointStyle: 'circle',
                pointBorderColor: 'Black'
            },
            {
                label:"Waist Circumference",
                hidden: true,
                data:[5, 2, 3, 1, 4, 2, 3, 2, 6, 2, 4, 3],
                backgroundColor:'Black',
                borderColor:'Gray',
                tension:0.2,
                // fill: true,
                pointStyle: 'circle',
                pointBorderColor: 'Black'
            },
            {
                label:"Shoulder Circumference",
                hidden: true,
                data:[5, 2, 3, 1, 4, 2, 3, 2, 6, 2, 4, 3],
                backgroundColor:'Black',
                borderColor:'Pink',
                tension:0.2,
                // fill: true,
                pointStyle: 'circle',
                pointBorderColor: 'Black'
            }

        ]
    })

    useEffect( () => {
        axios.get("http://localhost:3001/api/get-stats").then(res => {
            const weightArr = [];
            const heightArr = [];
            const upperArr = [];
            const chestArr = [];
            const thighArr = [];
            const waistArr = [];
            const shoulderArr = [];
            const calfArr = [];
            const forearmArr = [];
            const allTimes = [];
            function formatDate(date) {
                return [
                  padTo2Digits(date.getDate()),
                  padTo2Digits(date.getMonth() + 1),
                  date.getFullYear(),
                ].join('/');
              }

            function getAllDaysInMonth(year, month) {
                const date = new Date(year, month, 1);
              
                const dates = [];
              
                while (date.getMonth() === month) {
                  dates.push(formatDate(new Date(date)));
                  date.setDate(date.getDate() + 1);
                }
              
                return dates;
        
              }
            
        
            const now = new Date();
            const thisMonth = [padTo2Digits(now.getMonth() + 1),now.getFullYear(),].join('/');

    
      
            //all days of the current month
            const month = getAllDaysInMonth(now.getFullYear(), now.getMonth());

    ;   if (res.data.success && res.data.data.length !== 0) {
            for (const weight of res.data.data.weight){


                if (((weight.date.substring(weight.date.indexOf("/") + 1)).substring((weight.date.substring(weight.date.indexOf("/") + 1)).indexOf("/") + 1)) === thisMonth.toString()){
                        
                    weightArr.push([weight.value, weight.date.substring(weight.date.indexOf("/") + 1)]);    
                    allTimes.push(weight.date.substring(weight.date.indexOf("/") + 1));
                }

            }
            for (const height of res.data.data.height){


                if (((height.date.substring(height.date.indexOf("/") + 1)).substring((height.date.substring(height.date.indexOf("/") + 1)).indexOf("/") + 1)) === thisMonth.toString()){
                        
                    heightArr.push([height.value, height.date.substring(height.date.indexOf("/") + 1)]);    
                    allTimes.push(height.date.substring(height.date.indexOf("/") + 1));
                }

            }
            for (const upper_arm_circumference of res.data.data.upper_arm_circumference){
            

                if (((upper_arm_circumference.date.substring(upper_arm_circumference.date.indexOf("/") + 1)).substring((upper_arm_circumference.date.substring(upper_arm_circumference.date.indexOf("/") + 1)).indexOf("/") + 1)) === thisMonth.toString()){
                        
                    upperArr.push([upper_arm_circumference.value, upper_arm_circumference.date.substring(upper_arm_circumference.date.indexOf("/") + 1)]);    
                    allTimes.push(upper_arm_circumference.date.substring(upper_arm_circumference.date.indexOf("/") + 1));
                }

            }
            for (const forearm_circumference of res.data.data.forearm_circumference){


                if (((forearm_circumference.date.substring(forearm_circumference.date.indexOf("/") + 1)).substring((forearm_circumference.date.substring(forearm_circumference.date.indexOf("/") + 1)).indexOf("/") + 1)) === thisMonth.toString()){
                        
                    forearmArr.push([forearm_circumference.value, forearm_circumference.date.substring(forearm_circumference.date.indexOf("/") + 1)]);    
                    allTimes.push(forearm_circumference.date.substring(forearm_circumference.date.indexOf("/") + 1));
                }

            }
            for (const chest_circumference of res.data.data.chest_circumference){
                

                if (((chest_circumference.date.substring(chest_circumference.date.indexOf("/") + 1)).substring((chest_circumference.date.substring(chest_circumference.date.indexOf("/") + 1)).indexOf("/") + 1)) === thisMonth.toString()){
                        
                    chestArr.push([chest_circumference.value, chest_circumference.date.substring(chest_circumference.date.indexOf("/") + 1)]);    
                    allTimes.push(chest_circumference.date.substring(chest_circumference.date.indexOf("/") + 1));
                }

            }
            for (const thigh_circumference of res.data.data.thigh_circumference){
                

                if (((thigh_circumference.date.substring(thigh_circumference.date.indexOf("/") + 1)).substring((thigh_circumference.date.substring(thigh_circumference.date.indexOf("/") + 1)).indexOf("/") + 1)) === thisMonth.toString()){
                        
                    thighArr.push([thigh_circumference.value, thigh_circumference.date.substring(thigh_circumference.date.indexOf("/") + 1)]);    
                    allTimes.push(thigh_circumference.date.substring(thigh_circumference.date.indexOf("/") + 1));
                }

            }
            for (const calf_circumference of res.data.data.calf_circumference){
                

                if (((calf_circumference.date.substring(calf_circumference.date.indexOf("/") + 1)).substring((calf_circumference.date.substring(calf_circumference.date.indexOf("/") + 1)).indexOf("/") + 1)) === thisMonth.toString()){
                        
                    calfArr.push([calf_circumference.value, calf_circumference.date.substring(calf_circumference.date.indexOf("/") + 1)]);    
                    allTimes.push(calf_circumference.date.substring(calf_circumference.date.indexOf("/") + 1));
                }

            }
            for (const waist_circumference of res.data.data.waist_circumference){
               

                if (((waist_circumference.date.substring(waist_circumference.date.indexOf("/") + 1)).substring((waist_circumference.date.substring(waist_circumference.date.indexOf("/") + 1)).indexOf("/") + 1)) === thisMonth.toString()){
                        
                    waistArr.push([waist_circumference.value, waist_circumference.date.substring(waist_circumference.date.indexOf("/") + 1)]);    
                    allTimes.push(waist_circumference.date.substring(waist_circumference.date.indexOf("/") + 1));
                }

            }
            for (const shoulder_circumference of res.data.data.shoulder_circumference){
                

                if (((shoulder_circumference.date.substring(shoulder_circumference.date.indexOf("/") + 1)).substring((shoulder_circumference.date.substring(shoulder_circumference.date.indexOf("/") + 1)).indexOf("/") + 1)) === thisMonth.toString()){
                        
                    shoulderArr.push([shoulder_circumference.value, shoulder_circumference.date.substring(shoulder_circumference.date.indexOf("/") + 1)]);    
                    allTimes.push(shoulder_circumference.date.substring(shoulder_circumference.date.indexOf("/") + 1));
                }

            }

            
        }

        
        const weightTempArr = [];
        
        for (const weightElements of weightArr){
            weightTempArr.push({y: weightElements[0], x: weightElements[1]});
        }

        const heightTempArr = [];
        
        for (const heightElements of heightArr){
            heightTempArr.push({y: heightElements[0], x: heightElements[1]});
        }
        
        const upperTempArr = [];
        
        for (const upperElements of upperArr){
            upperTempArr.push({y: upperElements[0], x: upperElements[1]});
        }

        const forearmTempArr = [];
        
        for (const forearmElements of forearmArr){
            forearmTempArr.push({y: forearmElements[0], x: forearmElements[1]});
        }

        const chestTempArr = [];
        
        for (const chestElements of chestArr){
            chestTempArr.push({y: chestElements[0], x: chestElements[1]});
        }

        const thighTempArr = [];
        
        for (const thighElements of thighArr){
            thighTempArr.push({y: thighElements[0], x: thighElements[1]});
        }

        const calfTempArr = [];
        
        for (const calfElements of calfArr){
            calfTempArr.push({y: calfElements[0], x: calfElements[1]});
        }

        const waistTempArr = [];
        
        for (const waistElements of waistArr){
            waistTempArr.push({y: waistElements[0], x: waistElements[1]});
        }

        const shoulderTempArr = [];
        
        for (const shoulderElements of shoulderArr){
            shoulderTempArr.push({y: shoulderElements[0], x: shoulderElements[1]});
        }

        allTimes.sort(function(a,b) {
            var aComps = a.split("/");
            var bComps = b.split("/");
            var aDate = new Date(aComps[2], aComps[1], aComps[0]);
            var bDate = new Date(bComps[2], bComps[1], bComps[0]);
            return aDate.getTime() - bDate.getTime();
        });


        setData({
            labels:month,
    
            datasets:[
                {
                    label:"Height",
                    hidden: true,
                    data: heightTempArr,
                    backgroundColor:'Red',
                    borderColor:'Red',
                    tension:0.2,
                    // fill: true,
                    pointStyle: 'circle',
                    pointBorderColor: 'Black'
                },
                {
                    label:"Weight",
    
                    data:weightTempArr,
                    backgroundColor:'Green',
                    borderColor:'Green',
                    tension:0.2,
                    // fill: true,
                    pointStyle: 'circle',
                    pointBorderColor: 'Black'
                },
                {
                    label:"Forearm Circumference",
                    hidden: true,
                    data:forearmTempArr,
                    backgroundColor:'Blue',
                    borderColor:'Blue',
                    tension:0.2,
                    // fill: true,
                    pointStyle: 'circle',
                    pointBorderColor: 'Black'
                },
                {
                    label:"Calf Circumference",
                    hidden: true,
                    data:calfTempArr,
                    backgroundColor:'Brown',
                    borderColor:'Brown',
                    tension:0.2,
                    // fill: true,
                    pointStyle: 'circle',
                    pointBorderColor: 'Black'
                },
                {
                    label:"Upper Arm Circumference",
                    hidden: true,
                    data:upperTempArr,
                    backgroundColor:'Yellow',
                    borderColor:'Yellow',
                    tension:0.2,
                    // fill: true,
                    pointStyle: 'circle',
                    pointBorderColor: 'Black'
                },
                {
                    label:"Chest Circumference",
                    hidden: true,
                    data:chestTempArr,
                    backgroundColor:'Purple',
                    borderColor:'Purple',
                    tension:0.2,
                    // fill: true,
                    pointStyle: 'circle',
                    pointBorderColor: 'Black'
                },
                {
                    label:"Thigh Circumference",
                    hidden: true,
                    data:thighTempArr,
                    backgroundColor:'Orange',
                    borderColor:'Orange',
                    tension:0.2,
                    // fill: true,
                    pointStyle: 'circle',
                    pointBorderColor: 'Black'
                },
                {
                    label:"Waist Circumference",
                    hidden: true,
                    data:waistTempArr,
                    backgroundColor:'Gray',
                    borderColor:'Gray',
                    tension:0.2,
                    // fill: true,
                    pointStyle: 'circle',
                    pointBorderColor: 'Black'
                },
                {
                    label:"Shoulder Circumference",
                    hidden: true,
                    data:shoulderTempArr,
                    backgroundColor:'Pink',
                    borderColor:'Pink',
                    tension:0.2,
                    // fill: true,
                    pointStyle: 'circle',
                    pointBorderColor: 'Black'
                }
    
    
            ],
            options: {
                scales: {
                  x: {
                    type: 'linear'
                  }
                }
                
            }
        })

        })
      }, []);


    return (

        <div className="page-title mx-3 pages">
            <div className="flex justify-between">
                <div className="text-4xl font-bold">
                    Statistics
                </div>

                {streak.length !== 0 && <div className="text-2xl flex items-center px-3 rounded-md bg-[#F2F2F2] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <span>{"🔥"}</span>
                    <span className="ml-1">{streak}</span>
                </div>}
            </div>
            <hr className="mt-2 mb-2 h-px bg-black border-0"></hr>

            <div className='redirect flex justify-end'>
                <button onClick={() => {
                    navigate("/history/workouts");
                }}
                        className="flex pt-1 items-center font-normal text-gray-600 dark:text-gray-500 underline"
                >
                    <div className="flex items-center">
                        <span className="pr-2">View workout history</span>
                        <BsArrowRight/>
                    </div>
                </button>
            </div>




            <Line data={data} className="mt-8" height={"300%"}>

            </Line>

            <button
                    className="absolute bottom-10 bg-default-gradient text-white py-4 px-10 w-3/4 left-[calc(12.5vw)] rounded text-xl"
                    onClick={() => {
                        navigate("/user/log-stats");
                    }}
                >
                    Add Stats
                </button>
        </div>
        
        
        
    );
}

export default History;