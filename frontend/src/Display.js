import axios from 'axios';
import {React, useState} from 'react'


const Display = () => {

    const [state, setState] = useState([])

    function handleClick(event){
        event.preventDefault();
        
        axios.get('http://localhost:3001/api/exercises').then(res => {
            setState(res.data);
            console.log(res.data)
        })
      }
    

  return (
    <div>
        <button  onClick={handleClick} className="btn btn-lg btn-info">
            Get Data
        </button>

        <div>
            {state.map((ex)=>{
                return(<p key={ex._id}>{JSON.stringify(ex)}</p>)
            })}
            {/* {state.output} */}
        </div>
    </div>
  )
}

export default Display