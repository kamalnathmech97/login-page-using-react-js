
import React,{useState, useEffect} from 'react'
import './App.css';





function App() {
  const initialValues ={username:"", email:"", password:""};
  const[formValues, setFormValues] = useState(initialValues);
  const[formErrors, setFormErrors] = useState({})
  const[isSubmit, setIsSubmit] = useState(false)
 
  const handleChange =(e) =>{
    const {name, value} =e.target
    setFormValues({...formValues, [name]:value})
  };

  const handleSubmit =(e) =>{
    e.preventDefault();
    setFormErrors(validate(formValues))
    setIsSubmit(true);
  }
 
  useEffect(() =>{
    console.log(formErrors);
  if(Object.keys(formErrors).length===0 && isSubmit){
    console.log(formValues);
  }
  },[formErrors])
  const validate = (values) =>{
  const errors = {}
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  if(!formValues.username){
    errors.username = "Username is required"
  }
  if(!formValues.email){
    errors.email = "Email is required"
  }
  else if(!regex.test(values.email)){
    errors.email="This is not a valid format"
  }
  if(!formValues.password){
    errors.password = "Password is required"
  }
  else if(values.password<6){
    errors.password="This is not a valid password"
  }
  return errors
};


  return (
<div className="container">
{Object.keys(formErrors).length===0 && isSubmit ? (<div className="ui message sucess">Sign in successfully</div>
):(<pre>{JSON.stringify(formValues, undefined, 2)}</pre>
)}
  
   <form onSubmit={handleSubmit}>
    <h1>Login Form</h1>
    <div className='ui divider'></div>
    <div className='ui form'>

    <div className='field'>
    <label>Username: </label>
    <input type = "text" 
    placeholder='Username'
     name="username" 
     value={formValues.username}
     onChange={handleChange} />
    </div>
    <p>{formErrors.username}</p>

    <div className='field'>
    <lable>Email: </lable>
    <input type = "email" placeholder='Email' name ="email"
    value={formValues.email}
    onChange={handleChange}/>
    </div>
    <p>{formErrors.email}</p>

    <div className='field'>
    <lable>Password: </lable>
    <input type ="password" name="password" placeholder='Password' 
    value={formValues.password}
    onChange={handleChange}/>
    </div>
    <p>{formErrors.password}</p>

    <button type ="fluid ui button blue">Submit</button>
    </div>
   </form>
    </div>
  );
}

export default App;
