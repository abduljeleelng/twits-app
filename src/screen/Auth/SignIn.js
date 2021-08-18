import React from 'react'
import { Link, Redirect} from 'react-router-dom'
import Swal from 'sweetalert2'
import {authenticate, signin} from '../api';

import './styles.css'



export default function SignIn() {
    const [values, setValues] = React.useState({
        loading:false,
        password:"",
        email:"",
        redirectToPage:false
    })
    const {loading, password, email, redirectToPage} = values;

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
        handleSigin(); 
    }
    const handleSigin = async () =>{
        let user = {email, password}
        const data  = await signin(user);
        //console.log({data, user})
        if(!data){
            Swal.fire('Oops...', 'internet server error, Please, check your network connection', 'error')
            return setValues({...values, loading:false})
        }
        if(data.error){
            Swal.fire('Oops...', data.error, 'error')
            return setValues({...values, loading:false})
        }
        authenticate(data, ()=>{
            setValues({...values, loading:false, redirectToPage:true})
        })

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
            title: 'Signed in successfully'
        })
    }

    const redirectUser = () => {
        if (redirectToPage){
            return <Redirect to="/" />
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

                    <button type="submit" disabled={loading} onClick={!loading ? submit : null}>
                        {loading ? 'loading..':'Login'}
                    </button>
                    
                    <label>
                    <input type="checkbox" defaultChecked="checked" name="remember" /> Remember me
                    </label>
                </div>
                <div className="container" style={{backgroundColor: '#f1f1f1'}}>
                    <button type="button" className="cancelbtn"><Link to="/auth/signup" >Sign Up</Link></button>
                    <span className="psw"> <Link to="/auth/forget" >Forget Password</Link></span>
                </div>
            </form>
        </div>
        </>
    )
}
