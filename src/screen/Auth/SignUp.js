import React from 'react'
import { Link, Redirect} from 'react-router-dom'
import Swal from 'sweetalert2'
import {signup} from '../api';

import './styles.css'



export default function SignUp() {
    const [values, setValues] = React.useState({
        loading:false,
        password:"",
        password_confirmation:"",
        email:"",
        redirectToPage:false
    })
    const {loading, password,password_confirmation, email, redirectToPage} = values;

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const submit = event =>{
        event.preventDefault();
        setValues({...values, loading:true})
        if(email===""){
            Swal.fire('Oops...', 'A valid email address required!', 'error')
            return setValues({...values, loading:false})
        }
        if(password===""){
            Swal.fire('Oops...', 'password is required!', 'error')
            return setValues({...values, loading:false})
        }
        if(password !== password_confirmation){
            Swal.fire('Oops...', 'password must match each other!', 'error')
            return setValues({...values, loading:false})
        }
        handleSigUp(); 
    }
    const handleSigUp = async () =>{
        let user = {email, password, password_confirmation}
        const data  = await signup(user);
        if(!data){
            Swal.fire('Oops...', 'internet server error, Please, check your network connection', 'error')
            return setValues({...values, loading:false})
        }
        if(data.error){
            Swal.fire('Oops...', data.error, 'error')
            return setValues({...values, loading:false})
        }
        if(data.message){
            setValues({...values, loading:false, redirectToPage:true})
            let Toast = Swal.mixin({
                toast: true,
                timerProgressBar: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
            });
            Toast.fire({
                animation: true,
                type: 'success',
                title: data.message
            })
        }
    }
    const redirectUser = () => {
        if (redirectToPage){
            return <Redirect to="/auth/signin" />
        }
    };
    return (
        <>
        {
            redirectUser()
        }
        <div className="middle">
            <form >
                <div className="imgcontainer">
                    <img src="img_avatar2.png" alt="Avatar" className="avatar" />
                </div>
                <div className="container">
                    <label htmlFor="uname"><b>email</b></label>
                    <input type="text" onChange={handleChange("email")} value={email}  placeholder="Enter Username" name="uname" required />
                    <label htmlFor="psw"><b>Password</b></label>
                    <input type="password" onChange={handleChange("password")} value={password}  placeholder="Enter Password" name="psw" required />
                    <input type="password" onChange={handleChange("password_confirmation")} value={password_confirmation}  placeholder="Enter Password again" name="psw" required />
                    <button type="submit" disabled={loading} onClick={!loading ? submit : null}>
                        {loading ? 'loading..':'Create Account'}
                    </button>
                </div>
                <div className="container" style={{backgroundColor: '#f1f1f1'}}>
                   <p>I have an account ! <button type="button" className="cancelbtn"><Link to="/auth/signin" >Sign In</Link></button> </p> 
                </div>
            </form>
        </div>
        </>
    )
}
