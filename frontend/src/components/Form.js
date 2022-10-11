import React, {useEffect, useState} from 'react'
import RegistrationAccount from './RegistrationAccount';
import RegistrationAge from './RegistrationAge';
import RegistrationExperience from './RegistrationExperience';
import RegistrationName from './RegistrationName';
import "./Form.css";
import { GrLinkPrevious } from 'react-icons/gr'
import { useNavigate} from 'react-router-dom';
import axios from 'axios';

const Form = () => {

  const navigate = useNavigate();
  const [page, setPage] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    age: 0,
    experiece: "",
    username: "",
    email: "",
    password: ""
  })

  useEffect( () => {
    //hide topbar on mount
    document.getElementById('top-bar').style.display = "none"
    return () => {
      //show topbar on unmount
      document.getElementById('top-bar').style.display = "initial"
    }
  }, []);

  const registerUser = () => {
    axios.post("http://localhost:3001/api/user", formData).then(res => {
      if (res.status === 200){
        if (res.data.success){
          navigate('/login');
        }
        else{
          navigate('/registration');
        }
      }
    })
  }

  const PageDisplay = () => {

    if(page === -1){
      navigate('/');
    }
    else if (page === 0){
      return <RegistrationName formData={formData} setFormData={setFormData} />
    }
    else if(page === 1){
      return <RegistrationAge formData={formData} setFormData={setFormData} />
    }

    else if(page === 2){
      return <RegistrationExperience formData={formData} setFormData={setFormData} />
    }
    else{
      return <RegistrationAccount formData={formData} setFormData={setFormData} />
    }
  }

  return (
    <div className="form vertical-center">
      <div className='cont'>
        <GrLinkPrevious className='top-12 left-7 absolute scale-150' onClick={() =>{
              setPage((currentPage) => currentPage-1)
            }}/>

        <div className='progressBar'>
          <div style={{backgroundColor: "#3293EE"}}></div>
          <div style={{backgroundColor: page >= 1 ? "#3293EE" : "darkgray"}}></div>
          <div style={{backgroundColor: page >= 2 ? "#3293EE" : "darkgray"}}></div>
          <div style={{backgroundColor: page >= 3 ? "#3293EE" : "darkgray"}}></div>
        </div>
        </div>
        <div className='formContainer'>
            <div className='header'>
            </div>
            <div className='body'>{PageDisplay()}</div>
            <div className='footer'>
                <div className='grid justify-items-center'>
                <button className='bg-default-gradient hover:bg-blue-700 text-white disabled:opacity-50 font-bold py-2 px-9 rounded mx-2'
                  
                  onClick={() =>{
                  if (page === 3){
                    registerUser()
                  }
                  else{
                    setPage((currentPage) => currentPage+1)  
                  }
                }}>{page===3? "Submit" : "Next"}</button>
            </div></div>
        </div>
        
    </div>

  )
}

export default Form