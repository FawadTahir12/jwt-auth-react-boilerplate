import axios from 'axios';
import { useState } from 'react';
import { BASE_URL } from '../constant';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [errMsg, setErrMsg] = useState('')
  const [errFlag, setErrFlag] = useState(false)
  const nav = useNavigate()
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BASE_URL}user/token/`, credentials);
      const { refresh, access } = response.data;
      // Store the tokens in localStorage or secure cookie for later use
      localStorage.setItem('accesstoken', access);
      localStorage.setItem('refreshToken', refresh);
      nav('/test')

      // Redirect or perform other actions upon successful login
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrFlag(true)
        setErrMsg("User Not Found")
    }else if (error.response && error.response.status === 403){
        setErrFlag(true)
        setErrMsg("Email or Password Required")

    }else{
      setErrFlag(true)
      setErrMsg("Something went wrong")
    }
    }
  };

  return (
    // <form onSubmit={handleSubmit}>
    //   <input
    //     type="email"
    //     name="email"
    //     value={credentials.email}
    //     onChange={handleChange}
    //   />
    //   <input
    //     type="password"
    //     name="password"
    //     value={credentials.password}
    //     onChange={handleChange}
    //   />
    //   <button type="submit">Login</button>
    // </form>
    <div className='container mt-4'>
    <div className='row'>
        <div className='col-6 offset-3'>
            <div className='card'>
                <div className='card-header'>
                    <h5 className='text-center'>User Login</h5>
                    <div className='card-body'>
                    {errFlag === true && <p className='text-success'>{errMsg}</p>}
                        <form>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" name="email" value={credentials.email} onChange={handleChange} className="form-control" id="email"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={handleChange}/>
                            </div>
                            
                            <button type="submit" onClick={handleSubmit} className="btn btn-primary">Login</button>
                        </form>

                    </div>

                </div>

            </div>

        </div>

    </div>

</div>
  );
};

export default Login;