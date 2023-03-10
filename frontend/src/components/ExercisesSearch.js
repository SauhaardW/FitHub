import React, {useState} from 'react';
import Select from 'react-select';
import {MdFilterList} from "react-icons/md";
import {BsSearch} from "react-icons/bs";
import "./ExercisesSearch.css";
import axios from 'axios';

const ExercisesSearch = ({exerciseSetter}) => {
    const [muscleSelectVal, setMuscleSelectVal] = useState([]);
    const [forceSelectVal, setForceSelectVal] = useState([]);
    const [mechanicsSelectVal, setMechanicsSelectVal] = useState([]);
    const [utilitySelectVal, setUtilitySelectVal] = useState([]);
    const [nameSearchVal, setNameSearchVal] = useState("");
    const [filtersCollapsed, setFiltersCollapsed] = useState(true);

    const muscle_options = [
        { value: 'Subscapularis', label: 'Subscapularis' },
        { value: 'Gastrocnemius', label: 'Gastrocnemius' },
        { value: 'Triceps Brachii', label: 'Triceps Brachii' },
        { value: 'Serratus Anterior', label: 'Serratus Anterior' },
        { value: 'Quadriceps', label: 'Quadriceps' },
        { value: 'Gluteus Maximus', label: 'Gluteus Maximus' },
        { value: 'Supinator', label: 'Supinator' },
        { value: 'Teres Minor', label: 'Teres Minor' },
        { value: 'Pronators', label: 'Pronators' },
        { value: 'Deltoid, Lateral', label: 'Deltoid, Lateral' },
        { value: 'Brachialis', label: 'Brachialis' },
        { value: 'Trapezius, Upper', label: 'Trapezius, Upper' },
        { value: 'Erector Spinae', label: 'Erector Spinae' },
        { value: 'Infraspinatus', label: 'Infraspinatus' },
        { value: 'Hamstrings', label: 'Hamstrings' },
        { value: 'Back, General', label: 'Back, General' },
        { value: 'Brachioradialis', label: 'Brachioradialis' },
        { value: 'Obliques', label: 'Obliques' },
        { value: 'Extensor Carpi Radialis Flexor Carpi Radialis', label: 'Extensor Carpi Radialis Flexor Carpi Radialis' },
        { value: 'Latissimus Dorsi', label: 'Latissimus Dorsi' },
        { value: 'Pectoralis Major, Clavicular', label: 'Pectoralis Major, Clavicular' },
        { value: 'Wrist Flexors', label: 'Wrist Flexors' },
        { value: 'Pectoralis Major, Sternal', label: 'Pectoralis Major, Sternal' },
        { value: 'Wrist Extensors', label: 'Wrist Extensors' },
        { value: 'Supraspinatus', label: 'Supraspinatus' },
        { value: 'Rectus Abdominis', label: 'Rectus Abdominis' },
        { value: 'Tibialis Anterior', label: 'Tibialis Anterior' },
        { value: 'Flexor Carpi Ulnaris Extensor Carpi Ulnaris', label: 'Flexor Carpi Ulnaris Extensor Carpi Ulnaris' },
        { value: 'Hip Abductors', label: 'Hip Abductors' },
        { value: 'Deltoid, Anterior', label: 'Deltoid, Anterior' },
        { value: 'Gluteus Maximus', label: 'Gluteus Maximus' },
        { value: 'Deltoid, Posterior', label: 'Deltoid, Posterior' },
        { value: 'Biceps Brachii', label: 'Biceps Brachii' }
    ]

    const force_options = [
        { value: 'Pull', label: 'Pull' },
        { value: 'Push', label: 'Push' },
    ]

    const mechanics_options = [
        { value: 'Isolated', label: 'Isolated' },
        { value: 'Compound', label: 'Compound' },
    ]

    const utility_options = [
        { value: 'Auxiliary', label: 'Auxiliary' },
        { value: 'Basic', label: 'Basic' },
    ]

    function getExercises() {
        axios.get("http://localhost:3001/api/exercise/filter", {
            params: {
                muscles: muscleSelectVal.map(x=>x.value),
                mechanics: mechanicsSelectVal.map(x=>x.value),
                force: forceSelectVal.map(x=>x.value),
                utility: utilitySelectVal.map(x=>x.value),
                name: nameSearchVal
            }
        }).then((res) => {
            exerciseSetter(res.data.data)
        })
    }

    return (
        <div className="container">
            <div className="search-bar flex justify-between">
                <input
                    className="py-1.5 px-2 w-10/12 bg-gray-100 outline outline-1 outline-gray-300 rounded-lg text-gray-500"
                    type="text"
                    placeholder="Search exercises by name"
                    onChange={(event) => {setNameSearchVal(event.target.value)}}
                />

                <BsSearch
                    className="relative right-[9vw] h-6 w-6 top-1.5 fill-gray-400"
                    onClick={(e) => { getExercises() }}
                />

                <MdFilterList 
                    className='h-9 w-9 rounded-lg outline outline-2 outline-gray-300 transition-all duration-200' 
                    style={{fill: filtersCollapsed?"rgba(56, 152, 242, 1)":"white", backgroundColor: filtersCollapsed?"white":"rgba(56, 152, 242, 1)"}}
                    onClick={(e)=> {setFiltersCollapsed(!filtersCollapsed);}}
                    />
            </div>

                <div className="filters-container bg-gray-200 rounded-lg mt-3" aria-expanded={filtersCollapsed}>
                    <div className="muscle-select my-3 mx-3">
                        <p>Muscles</p>
                        <Select 
                            options={muscle_options} 
                            isMulti
                            className='w-full'
                            onChange={(e) => {setMuscleSelectVal(e)}}
                            maxMenuHeight={200}
                        />
                    </div>

                    <div className="my-3 mx-3 force-select">
                        <p>Force</p>
                        <Select 
                            options={force_options} 
                            isMulti
                            className='w-full'
                            onChange={(e) => {setForceSelectVal(e)}}
                        />
                    </div>

                    <div className="my-3 mx-3 mechanics-select">
                        <p>Mechanics</p>
                        <Select 
                            options={mechanics_options} 
                            isMulti
                            className='w-full'
                            onChange={(e) => {setMechanicsSelectVal(e)}}
                        />
                    </div>

                <div className="mt-3 mx-3 mb-28 utility-select">
                        <p>Utility</p>
                        <Select 
                            options={utility_options} 
                            isMulti
                            className='w-full'
                            onChange={(e) => {setUtilitySelectVal(e)}}
                        />
                    </div>
                </div>            
        </div>
    );

}

export default ExercisesSearch;
