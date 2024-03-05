import React, { useContext, useState } from 'react';
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Link } from 'react-router-dom';

const Login = ({ setAuthAttempt }) => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate(); // Initialize useNavigate

    const loginRedirection =  () => {

      if (store.bool){
        console.log('success')
        navigate('/profile'); // Navigate to the 'profile' page on successful login
      }else{
        console.log('denied')
      }
      
    }

  // const onLoginClick = async () => {
  //   console.log(email, password);
  //   const response = await fetch(`${process.env.BACKEND_URL}/api/login`, {
  //     method: 'POST',
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ email: email, password: password })
  //   });

  //   if (response.ok) {
  //     const data = await response.json();
  //     sessionStorage.setItem("token", data.access_token);
  //     store.token = data.access_token;
  //     setAuthAttempt("made");
  //     setAuthStatus("approved");
  //     console.log(store.token);

  //     navigate('/profile'); // Navigate to the 'favorite' page on successful login
  //   } else {
  //     // Handle unsuccessful login attempts here, maybe set a message to display to the user
  //     setMessage(<span className="text-danger">Invalid login, please try again.</span>);
  //   }
  // };

  return (
    <div className='mx-5 px-5'>
      <h4 className="m-1 p-2 border-bottom">Login</h4>
      {/* Email Starts */}
      <div className="form-group form-row">
        <label className="col-lg-4">Email:</label>
        <input
          type="text"
          className="form-control"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      {/* Email Ends */}
      {/* Password Starts */}
      <div className="form-group form-row">
        <label className="col-lg-4">Password:</label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      {/* Password Ends */}



      <div className='container-fluid'>
          <div className="row mb-5">
              <div className='col-8 mt-3'>
                {/* <Link> */}
                <Link to ="/signup">
              SIGN UP
            </Link>
                {/* </Link */}
              </div>
          <div className="col m-3 text-end mb-4">
          {message}
            <button  className="btn btn-outline-primary text-end" onClick={async ()=>{
              await actions.onLoginClick(email, password)
              await loginRedirection(actions.redirecting());
              }}>
                Login 
            </button>
            
          </div>
          </div>
      </div>
      



    </div>
  );
};

export default Login;






















