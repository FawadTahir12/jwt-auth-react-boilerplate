import {useEffect, useState} from 'react';
import axios from "axios";
import { BASE_URL } from '../constant';
import { useNavigate } from 'react-router-dom';


function Register() {
    const nav = useNavigate()
    const [errors, setErros] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")
    const [userData, setUserData] = useState({
        'email': '',
        'password': '',
        'status':''
    })

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
    }
    const userRegisterForm = async(e) => {
        e.preventDefault()
        const userFormData = new FormData(); 
        userFormData.append("email", userData.email)
        userFormData.append("password", userData.password)     

        try {
            await axios.post(`${BASE_URL}user/register/`, userFormData).then((response) => {
                setUserData(
                    {
                        
                        'email': '',
                        'password': '',
                        'status': 'success'
    
                    }
                )
                if(response.status === 201 || response.status === 200){
                    const email = response.data.email
                    const secret = response.data.secret
                    const valid_date = response.data.valid_date

                    nav(`/verify-otp`, { state: { email, secret, valid_date } })
                }
                
              
            })

        } catch (error) {
            if (error.response && error.response.status === 422) {
                setErros(true)
                setErrorMsg(error.response.data.error)
                console.log("error 422");
            } else if(error.response && error.response.status === 403) {
                setErros(true)
                console.log("errr");               
                setErrorMsg(error.response.data.error)              
            }
            else{
                setUserData({'status':'error'})
            }
        }
    }
  return (

    
         <div className='container mt-4'>
            <div className='row'>
                <div className='col-6 offset-3'>
                {errors === true && <p className='text-danger'>{errorMsg}</p>}
                    {/* {userData.status === 'error' && <p className='text-success'> Something Went Wrong</p>}
                     */}
                    <div className='card'>
                        <div className='card-header'>
                            <h5 className='text-center'>User Register</h5>
                            <div className='card-body'>
                                <form>
                                   
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input type="email"  name='email'onChange={handleChange} value={userData.email} className="form-control" id="email"/>
                                    </div>
                                   
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input type="password" name='password' onChange={handleChange} value={userData.password} className="form-control" id="password"/>
                                    </div>
                                      
                                   
                                    <div className='text-center'>
                                    <button type="submit" onClick={userRegisterForm} className="btn btn-primary" >Register</button>
                                         </div>
                                </form>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
  );
}
export default Register