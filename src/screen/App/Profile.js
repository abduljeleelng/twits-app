import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import Swal from 'sweetalert2'

import './styles.css'
import {createTwits, deleteTwits, profile, signout, signoutA} from '../api'

export default function Home() {
    const [values, setValues] = React.useState({
        redirect :false,
        Auth:{},
        twit:[],
        text:"",
        loading:false,
        redirectToPage:false,
    
    })
    const {redirect,Auth, twit, text,loading, redirectToPage} = values

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };
  
    React.useEffect(() => {
        const boots = async () =>{
            const Auth = await JSON.parse(localStorage.getItem('Auth'));
            const twitData = await profile(Auth.token)
            //if(!twitData) return console.log("failed to fetch remote data")
            console.log(twitData)
            console.log("use effect")
            setValues(v=>({...v, Auth, twit:twitData.data}))
        }
        boots();
    }, [])

    const handleTwits =async () =>{
        setValues({...values, loading:true})
        if (text ===""){
            Swal.fire('Oops...', 'Twits content is empty', 'error')
            return setValues({...values, loading:false})
        }
        const tw = {text}
        const data = await createTwits(Auth.token, tw)
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

    const handleDelete= async (id) =>{
        const data = await deleteTwits(Auth.token, id)
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
            return  <Redirect to="/profile" />
        }

    }

    const handleComment = async () =>{

    }


    const HandleSignOut = async ()=>{
        const data = await signoutA(Auth.token);
            if(data.message){
                signout(()=>{
                    setValues({...values, redirect:true});
                    let Toast = Swal.mixin({
                        toast: true,
                        timerProgressBar: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000
                    });
                    return Toast.fire({
                        animation: true,
                        type: 'success',
                        title: data.message
                    })
                })
            }
    }


    const RedirectUser = () =>{
        if(redirect) return  <Redirect to="/auth/signin" />
    }
    const isEmpty = (empty) =>{
        return Object.keys(empty).length === 0 && empty.constructor === Object
    }

    if(redirectToPage) return <Redirect to="/" />

    return (
        <>
        {RedirectUser()}
            <div>
            <nav className="navbar navbar-toggleable-md fixed-top">
                <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse container">
                {/* Navbar navigation links */}
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                    <Link className="nav-link" to="/"><i className="octicon octicon-home" aria-hidden="true" /> Home <span className="sr-only">(current)</span></Link>
                    </li>
                    {/* <li className="nav-item">
                    <a className="nav-link" href="#"><i className="octicon octicon-zap" /> Moments</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="#"><i className="octicon octicon-bell" /> Notifications</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="#"><i className="octicon octicon-inbox" /> Messages</a>
                    </li> */}
                </ul>
                {/* END: Navbar navigation links */}
                {/* Navbar Search form */}
                {/* <form className="navbar-form" role="search">
                    <div className="input-group">
                    <input type="text" className="form-control input-search" placeholder="Search Twitter" name="srch-term" id="srch-term" />
                    <div className="input-group-btn">
                        <button className="btn btn-default btn-search" type="submit"><i className="octicon octicon-search navbar-search-icon" /></button>
                    </div>
                    </div>
                </form> */}
                {/* END: Navbar Search form */}
                {/* Navbar User menu */}
                <div className="dropdown navbar-user-dropdown">
                    <button className="btn btn-secondary dropdown-toggle btn-circle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a className="dropdown-item" onClick={HandleSignOut}>Sign out </a>
                    </div>
                </div>
                {/* END: Navbar User menu */}
                {/* Navbar Tweet button */}
                {/* <button className="btn btn-search-bar">Tweet</button> */}
                </div>
            </nav>
            {/* END: Fixed top navbar */}
            <div className="main-container">
                <div className="row profile-background">
                    <div className="container">
                        <div className="avatar-container">
                        <div className="avatar">
                        </div>
                        </div>
                    </div>
                </div>
                <nav className="navbar profile-stats">
                <div className="container">
                    <div className="row">
                    <div className="col">
                    </div>
                    <div className="col-6">
                        <ul>
                        <li className="profile-stats-item-active">
                            <a>
                            <span className="profile-stats-item profile-stats-item-label">Tweets</span>
                            <span className="profile-stats-item profile-stats-item-number">51</span>
                            </a>
                        </li>
                        <li>
                            <a>
                            <span className="profile-stats-item profile-stats-item-label">Following</span>
                            <span className="profile-stats-item profile-stats-item-number">420</span>
                            </a>
                        </li>
                        <li>
                            <a>
                            <span className="profile-stats-item profile-stats-item-label">Followers</span>
                            <span className="profile-stats-item profile-stats-item-number">583</span>
                            </a>
                        </li>
                        <li>
                            <a>
                            <span className="profile-stats-item profile-stats-item-label">Likes</span>
                            <span className="profile-stats-item profile-stats-item-number">241</span>
                            </a>
                        </li>
                        </ul>
                    </div>
                    <div className="col">
                    </div>
                    </div>
                </div>
                </nav>

                <div className="container main-content">
                <div className="row">
                    <div className="col profile-col">
                    {/* Left column */}
                    <div className="profile-header">
                        {/* Header information */}
                        <Link to="/profile" >
                            <h3 className="profile-fullname">{isEmpty(Auth) ? "" : Auth.user.name}</h3>
                        </Link>
                        <h3 className="profile-element profile-website"><i className="octicon octicon-link" />&nbsp;{isEmpty(Auth) ? "" : Auth.user.email}</h3>
                        <a className="profile-element profile-website" hrerf="#"><i className="octicon octicon-location" />&nbsp;Lagos, Nigeria</a>
                        <h2 className="profile-element"><i className="octicon octicon-calendar" />Joined on {isEmpty(Auth) ? "" : Auth.user.created_at}</h2>
                    </div>
                    </div>
                    {/* End; Left column */}
                    {/* Center content column */}
                    <div className="col-6">
                    <ol className="tweet-list">
                        <li className="tweet-card" >
                            <div className="tweet-content">
                                <div className="tweet-header">
                                    <span className="fullname">
                                        <strong>{isEmpty(Auth) ? "" : Auth.user.name}</strong>
                                    </span>      
                                </div>
                                <Link to="/">
                                    <img className="tweet-card-avatar" src="https://pbs.twimg.com/profile_images/679974972278849537/bzzb-6H4_bigger.jpg" alt />
                                </Link>
                                <div className="tweet-text">
                                    <p className lang="es" data-aria-label-part={0}>
                                        <textarea class="textarea resize-ta" onChange={handleChange("text")} value={text} placeholder="Twits your contents here"></textarea>
                                    </p>
                                    {
                                        loading ? "Creating twite" : <button onClick={handleTwits} > Create Twit  </button> 
                                    }
                                    
                                </div>
                            </div>
                        </li>
                        {
                            twit && twit.length > 0 && twit.map((data, i)=>{
                                //console.log(data)
                                const date = new Date(data.created_at)
                                return(
                                    <li className="tweet-card" key={i}>
                                        <div className="tweet-content">
                                            <div className="tweet-header">
                                                <span className="fullname">
                                                    <strong>{data.user.name} &nbsp; &nbsp; </strong>
                                                </span>
                                                <span className="username">@{data.user.name}</span>
                                                <span className="tweet-time">  - {date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate()+ '-'+date.getUTCHours()+ '-'+date.getMinutes()+ '-'+date.getUTCSeconds()}</span>
                                            </div>
                                            <a>
                                                <img className="tweet-card-avatar" src="https://pbs.twimg.com/profile_images/679974972278849537/bzzb-6H4_bigger.jpg" alt />
                                            </a>
                                            <div className="tweet-text">
                                                <p className lang="es" data-aria-label-part={0}>
                                                    {
                                                        data.text
                                                    } 
                                                    <a href className="twitter-hashtag" dir="ltr" />
                                                </p>
                                            </div>
                                            <div className="tweet-footer">
                                                <a className="tweet-footer-btn">
                                                    <Link to={`twits/${data.id}`}>
                                                        <i className="octicon octicon-comment" aria-hidden="true" /><span> {data.comment.length}</span>
                                                    </Link>
                                                    
                                                </a>
                                                <a className="tweet-footer-btn">
                                                    <i className="octicon octicon-heart" aria-hidden="true" /><span> {data.likes.length}</span>
                                                </a>
                                                <a className="tweet-footer-btn">
            
                                                    <i className="octicon octicon-delete" aria-hidden="true" /><span onClick={handleDelete(data.id)}>  delete </span>
                                                </a>
                                            </div>
                                        </div>
                                    </li>
                                )
                            })
                        }  
                    </ol>
                    {/* End: tweet list */}
                    </div>
                    {/* End: Center content column */}
                    <div className="col right-col">
                    <div className="content-panel">
                        <div className="panel-header">
                        <h4>Who to follow</h4><small><a href>Refresh</a></small><small><a href>View all</a></small>
                        </div>
                        {/* Who to Follow panel */}
                        <div className="panel-content">
                        {/*Follow list */}
                        <ol className="tweet-list">
                            <li className="tweet-card">
                                <div className="tweet-content">
                                <img className="tweet-card-avatar" src="https://pbs.twimg.com/profile_images/679974972278849537/bzzb-6H4_bigger.jpg" alt />
                                <div className="tweet-header">
                                <span className="fullname">
                                    <strong>Jon Vadillo</strong>
                                </span>
                                <span className="username">@JonVadillo</span>
                                </div>
                                <button className="btn btn-follow">Follow</button>
                            </div>
                            </li>
                        </ol>
                        {/*END: Follow list */}
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </>
    )
}
