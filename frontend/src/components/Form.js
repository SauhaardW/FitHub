import React, {useEffect, useState} from 'react'
import RegistrationAccount from './RegistrationAccount';
import RegistrationStats from './RegistrationStats';
import RegistrationExperience from './RegistrationExperience';
import RegistrationName from './RegistrationName';
import "./Form.css";
import { GrLinkPrevious } from 'react-icons/gr'
import { useNavigate} from 'react-router-dom';
import axios from 'axios';

const Form = () => {

  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const numPages = 3;

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    height: "",
    weight: "",
    experience: "Beginner",
    username: "",
    email: "",
    password: ""
  })
  const [disableNext, setDisableNext] = useState(true)
    const [isUsernameUnique, setIsUsernameUnique] = useState(true)

  useEffect( () => {
    //hide topbar on mount
    document.getElementById('top-bar').style.display = "none"
    return () => {
      //show topbar on unmount
      document.getElementById('top-bar').style.display = "initial"
    }
  }, []);

  const registerUser = () => {
    axios.post("/api/user", formData).then(res => {
      if (res.status === 200){
        if (res.data.success){
          navigate('/login');
        }
        else if(res.data.userExists){
            setIsUsernameUnique(false)
        }
      }
    })
  }

  const PageDisplay = () => {

    if(page === -1){
      navigate('/');
    }
    else if (page === 0){
      return <RegistrationName formData={formData} setFormData={setFormData} disableNext={disableNext} setDisableNext={setDisableNext}/>
    }
    else if(page === 1){
      return <RegistrationStats formData={formData} setFormData={setFormData} disableNext={disableNext} setDisableNext={setDisableNext}/>
    }

    else if(page === 2){
      return <RegistrationExperience formData={formData} setFormData={setFormData} disableNext={disableNext} setDisableNext={setDisableNext}/>
    }
    else{
      return <RegistrationAccount formData={formData} setFormData={setFormData} disableNext={disableNext} setDisableNext={setDisableNext} isUsernameUnique={isUsernameUnique}/>
    }
  }

  return (
    <div className="form vertical-center">
      <div className='cont'>
        <GrLinkPrevious className='top-12 left-7 absolute scale-150' onClick={() =>{
            setDisableNext(false)
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
                        disabled={disableNext}
                        onClick={() => {
                        if (page === numPages){
                          registerUser()
                        }
                        else{
                            page === 1 ? setDisableNext(false) : setDisableNext(true) //experience page should have next button always enabled
                            setPage((currentPage) => currentPage+1)
                        }
                        }}
                >
                  {page === numPages ? "Submit" : "Next"}
                </button>
            </div></div>
        </div>
        
    </div>

  )
}

export default Form