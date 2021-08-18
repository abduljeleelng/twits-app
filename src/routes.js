import React from 'react';

const SignIn = React.lazy(()=>import('./screen/Auth/SignIn'))
const SignUp = React.lazy(()=>import('./screen/Auth/SignUp'))
const Activate = React.lazy(()=>import('./screen/Auth/Activate'))
const Forget = React.lazy(()=>import('./screen/Auth/ForgetPassword'))
const Reset = React.lazy(()=>import('./screen/Auth/ResetPassword'))

const Home = React.lazy(()=>import('./screen/App/Home'));



export const AuthRoute = [
    { path: '/auth/signin', exact: true, name: 'Auth-signin', component: SignIn },
    { path: '/auth/signup', exact: true, name: 'Auth-signup', component: SignUp },
    { path: '/auth/forget', exact: true, name: 'Auth-forget', component: Forget},
    { path: '/auth/reset/:resetToken', exact: true, name: 'Auth-reset', component: Reset },
    { path: '/auth/activate/:activationCode', exact: true, name: 'Auth-activate', component: Activate },
];

export const Routes = [
    { path: '/', exact: true, name: 'Twit', component: Home},
    { path: '/profile', exact: true, name: 'profile', component: Home},
    { path: '/twits/:id', exact: true, name: 'Twit-single', component: Home},
];
