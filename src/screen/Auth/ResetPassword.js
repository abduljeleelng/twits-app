import React from 'react'
import { Link, Redirect, useParams} from 'react-router-dom'
import Swal from 'sweetalert2'
import {reset} from '../api';

import './styles.css'



export default function ResetPassword() {
    let { resetToken } = useParams();
        const [values, setValues] = React.useState({
            loading:false,
            password:"",
            passwordConfirmation:"",
            redirectToPage:false
        })
        const {loading, password, password_confirmation, redirectToPage} = values;

        const handleChange = name => event => {
            setValues({ ...values, error: false, [name]: event.target.value });
        };

        const submit = event =>{
            event.preventDefault();
            setValues({...values, loading:true})
            if(resetToken===""){
                Swal.fire('Oops...', 'Invalid or link expired!', 'error')
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
            handleReset(); 
        }
        const handleReset = async () =>{
            let user = {resetToken, password, password_confirmation}
            const data  = await reset(user);
          
            if(!data){
                Swal.fire('Oops...', 'Internal server error, Please, check your internet connection', 'error')
                return setValues({...values, loading:false})
            }
            
            if(data.error){
                Swal.fire('Oops...', data.error, 'error')
                return setValues({...values, loading:false})
            }

            let Toast = Swal.mixin({
                toast: true,
                timerProgressBar: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
            });

            Swal.fire(' :)', data.message, 'success')

            await Toast.fire({
                animation: true,
                type: 'success',
                title: 'password successfully reset'
            })
            setValues({...values, loading:false, redirectToPage:true})
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
                    <label htmlFor="psw"><b>Password</b></label>
                    <input type="password" onChange={handleChange("password")} value={password}  placeholder="Enter Password" name="psw" required />
                    <input type="password" onChange={handleChange("password_confirmation")} value={password_confirmation}  placeholder="Enter Password again" name="psw" required />

                    <button type="submit" disabled={loading} onClick={!loading ? submit : null}>
                        {loading ? 'loading..':'Reset Password'}
                    </button>
                </div>
                <div className="container" style={{backgroundColor: '#f1f1f1'}}>
                    <button type="button" className="cancelbtn"><Link to="/auth/signin" >Sign In</Link></button>
                </div>
            </form>
        </div>
        </>
    )
}
