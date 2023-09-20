import {useEffect, useState} from 'react';
import axios from "axios";
import { BASE_URL } from '../constant';
import { useNavigate , useLocation} from 'react-router-dom';


function Verify() {
    const nav = useNavigate()
    const location = useLocation();
    const { email, secret, valid_date } = location.state || {};
    const [otpData, setOtpData] = useState({
        'otp': '',
    })

    const handleChange = (e) => {
        setOtpData({
            ...otpData,
            [e.target.name]: e.target.value
        })
    }
    const userRegisterForm = (e) => {
        e.preventDefault()
        const userFormData = new FormData(); 
        userFormData.append("email", email)
        userFormData.append("otp", otpData.otp)
        userFormData.append("secret", secret)
        userFormData.append("valid_date", valid_date)
    

        try {
            axios.post(`${BASE_URL}user/verify/`, userFormData).then((response) => {
                
                if(response.status === 200){
                    nav(`/login`)
                }
            })

        } catch (err) {
            console.log(err)
        }
    }
  return (

    
         <div className='container mt-4'>
            <div className='row'>
                <div className='col-6 offset-3'>
                {/* {studentData.status === 'success' && <p className='text-success'> Thanks for Registration</p>} */}
                    {/* {studentData.status === 'error' && <p className='text-success'> Something Went Wrong</p>} */}
                    <div className='card'>
                        <div className='card-header'>
                            <h5 className='text-center'>OTP Verification</h5>
                            <div className='card-body'>
                                <form>
                                   
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">OTP</label>
                                        <input type="text"  name='otp'onChange={handleChange} value={otpData.otp} className="form-control" id="otp"/>
                                    </div>
                                    <div className='text-center'>
                                    <button type="submit" onClick={userRegisterForm} className="btn btn-primary" >Verify</button>
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
export default Verify