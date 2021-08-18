//let  BASE_URL = "",

const BASE_URL = "https://tweetis-api.herokuapp.com/api" 

export const signinc = user => {
    return fetch(`${BASE_URL}/auth/signin`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>{
        console.log(err)
    })
};

export const signup = async (user)=>{
    try{
        const response = await fetch(`${BASE_URL}/auth/signup`,{
            method:'POST',
            body:JSON.stringify(user),
            headers:{
                'Content-Type':'application/json',
                accept:'application/json'
            },
        }).catch(err => {
            console.log(err)
        });
        const data = response.json();
        return data;
    }catch(e){
        console.log(e)
    }
}

export const activate = async (user)=>{
    try{
        const response = await fetch(`${BASE_URL}/auth/activate`,{
            method:'POST',
            body:JSON.stringify(user),
            headers:{
                'Content-Type':'application/json',
                accept:'application/json'
            },
        }).catch(err => {
            console.log(err)
        });
        const data = response.json();
        return data;
    }catch(e){
        console.log(e)
    }
}

export const signin = async (user)=>{
    try{
        const response = await fetch(`${BASE_URL}/auth/signin`,{
            method:'POST',
            body:JSON.stringify(user),
            headers:{
                'Content-Type':'application/json',
                accept:'application/json'
            },
        }).catch(err => {
            console.log(err)
        });
        const data = response.json();
        return data;
    }catch(e){
        console.log(e)
    }
}

export const authenticate = (data, next) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('Auth', JSON.stringify(data));
        next();
    }
};

export const signout = next => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('Auth');
        next();
    }
};

export const isAuthenticated = () => {
    if (typeof window == 'undefined') {
        return false;
    }
    if (localStorage.getItem('Auth')) {
        return JSON.parse(localStorage.getItem('Auth'));
    } else {
        return false;
    }
};


export const forget = async (user) =>{
    try{
        const response = await fetch(`${BASE_URL}/auth/forgetPassword`,{
            method:'POST',
            body:JSON.stringify(user),
            headers:{
                'Content-Type':'application/json; charset=UTF-8',
                accept:'application/json'
            },
        }).catch(err => console.log(err));
        const data = response.json();
        return data;
    }catch(e){console.log(e)}
}

export const reset = async (user) =>{
    try{
        const response = await fetch(`${BASE_URL}/auth/resetPassword`,{
            method:'POST',
            body:JSON.stringify(user),
            headers:{
                'Content-Type':'application/json; charset=UTF-8',
                accept:'application/json'
            },
        }).catch(err => console.log(err));
        const data = response.json();
        return data;
    }catch(e){console.log(e)}
}

export const signoutA = async (user) =>{
    try{
        const response = await fetch(`${BASE_URL}/auth/signout`,{
            method:'POST',
            body:JSON.stringify(user),
            headers:{
                'Content-Type':'application/json; charset=UTF-8',
                accept:'application/json'
            },
        }).catch(err => console.log(err));
        const data = response.json();
        return data;
    }catch(e){console.log(e)}
}