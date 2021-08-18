import React from 'react'
import {  Redirect, useParams} from 'react-router-dom'
import Swal from 'sweetalert2'
import {activate} from '../api';

import './styles.css'



export default function Activate() {
    let { activationCode} = useParams();
    const [values, setValues] = React.useState({
        loading:true,
        error:false,
        reload:false,
        redirectToPage:false
    })
    const {loading,  error,reload, redirectToPage} = values;
    React.useEffect(() => {
        const boots  = async () =>{
            const user = {activationCode};
            const data = await activate(user);
            if(!data){
                Swal.fire('Oops...', 'internet server error, Please, check your network connection', 'error')
                return setValues({...values, loading:false, error:true})
            }
            if(data.error){
                Swal.fire('Oops...', data.error, 'error')
                return setValues({...values, loading:false, error:true})
            }
            if(data.message){
                setValues({...values, loading:false, error:false, redirectToPage:true})
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
        boots()
    }, [activationCode, reload])

    const isLoading = ()=>{
        if(loading) return (
            <>
            <h1>Waiting .. </h1>
            <h5>System in process</h5>
            </>
        )
    }

    const isError = ()=>{
        if(error) return (
            <>
            <h1>Waiting .. </h1>
            <h5>Error In activation your account </h5>
            <button  onClick={handleReload}> Try again </button>{" "}
            </>
        )
    }

    const handleReload = (event) => {
        event.preventDefault();
        setValues({...values, error:false, loading:true, reload:!reload})
      };

    const redirectUser = () => {
        if (redirectToPage){
            return <Redirect to="/auth/signin" />
        }
    };
    return (
        <>
        {redirectUser()}
        {isLoading()}
        {isError()}
        </>
    )
}
