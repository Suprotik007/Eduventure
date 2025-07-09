
import React, {  useState, useContext } from 'react';
import { Link,  useNavigate } from 'react-router';
import { AuthContext } from '../Providers/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
import Lottie from "lottie-react";
import regLottie from '../assets/lottieLogin.json.json'

const RegBox = () => {
  
  const [showPass, setShowPass] = useState(false);
  const { createUser, setUser, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const photo = e.target.photo.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    
    

    const passVerify = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;


    if (!passVerify.test(password)) {
      toast.error("Password must be at least 6 characters long and include at least one uppercase and one lowercase letter.");
      return; 
    }

    createUser(email, password)
      .then(result => {
        const user = result.user;
        updateUser({ displayName: name, photoURL: photo })
          .then(() => {
            setUser({ ...user });
            navigate('/');
          })
          .catch(error => {      
            setUser(user);
          });
        toast.success('Registration successful');
      })
      .catch(error => {
        
        toast.error(error.message);
      });
  };

  return (
    <div>
   
      <div className="hero min-h-screen">

         <div className="hero-content  flex-col lg:flex-row ">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl   mb-10 font-bold text-center">Register!</h1>
             <Lottie className='' animationData={regLottie} loop={true}> </Lottie>
               
            </div>
        <div className="card border-2  my-10 rounded-2xl w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            
            <form onSubmit={handleRegister} className="fieldset">
              <label className="label font-semibold">Name</label>
              <input type="text" required name='name' className="input text-black border-2 border-black   font-semibold" placeholder="Enter your name" />
              <label className="label  font-semibold">Photo URL</label> 
              <input type="text" required name='photo' className="input text-black border-2 border-black  font-semibold" placeholder="Photo URL" />
              <label className="label font-semibold">Email</label>
              <input type="email" required name='email' className="input text-black border-2 border-black  font-semibold" placeholder="Email" />
              <label className="label font-semibold">Password</label>
              <div className='relative'>
                <input type={showPass ? 'text' : 'password'} required name='password' className="input text-black border-2 border-black font-semibold" placeholder="Password" />
                
              </div>
              
                <button type='submit' className="btn btn-dash mt-5 text-gray-500  btn-outline border-3 border-black hover:border-teal-500 rounded-4xl hover:text-teal-300 hover:bg-black ">
 
  Register
</button> 
              <ToastContainer />
             
              <p className='font-bold text-center mt-3'>
                Already Have An Account? <Link to='/login'><span className='text-amber-700 font-bold'>Login</span></Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default RegBox;
