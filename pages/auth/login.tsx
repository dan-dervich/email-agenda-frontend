import { Button, Card, Grid, Input, Link, Loading, Spacer, Text } from '@nextui-org/react'
import { Component } from 'react'
import Cookies from 'js-cookie'
import jwt from 'jsonwebtoken'
import { LoginForm } from '../../components/auth/authForms'


class Login extends Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = { signUpButtonStatus: false, userNotFound: false, passwordsDontMatch: false, errorCreatingJWTtoken: false, status: '' }
    }
    componentDidMount() {
        let cookieValue = Cookies.get('token')
        jwt.verify(cookieValue as string,
            process.env.JWT_SECRET as string,
            async (err: any, verifiedJwt: any) => {
                console.log(err)
                if (!err) {
                    console.log(verifiedJwt)
                    return window.location.replace('/dashboard/' + verifiedJwt.payload.id)
                }
            })
    }
    render(): any {
        const submitHandler = async (e: any) => {
            e.preventDefault()
            this.setState({ signUpButtonStatus: true })
            console.log(e.target)
            const email: string = e.target[0].value
            const password: string = e.target[1].value
            let res = await fetch("http://localhost:8080/auth/login", {
                body: JSON.stringify({
                    "email": email,
                    "password": password,
                }),
                "headers": {
                    "Content-Type": 'application/json',
                },
                "method": "POST"
            })
            let req = await res.json()
            console.log(req)
            if (req.status == "everythingIsFine") {
                Cookies.set("token", req.token, { expires: 1 })
                window.location.replace('/dashboard/' + req.id)
            } else {
                this.setState({ status: req.status })
                if (req.status == "userNotFound") {
                    this.setState({ userNotFound: true })
                } else if (req.status == "passwordsDontMatch") {
                    this.setState({ passwordsDontMatch: true })
                } else if (req.status == "errorCreatingJWTtoken") {
                    this.setState({ errorCreatingJWTtoken: true })
                }
            }
            this.setState({ signUpButtonStatus: false })
        }
        return (
            <div className="flex flex-row h-screen max-h-screen max-w-screen">
                <div className="flex flex-col h-screen max-h-screen w-screen sm:w-1/3 justify-center items-center bg-indigo-500 dark:bg-black">
                    <form autoComplete='new-password' onSubmit={submitHandler}>
                        <LoginForm signUpButtonStatus={this.state.signUpButtonStatus} formStatus={this.state.status} />
                    </form>
                </div>
                <div style={{backgroundImage: "url(/loginSideImage.jpg)"}} className="hidden sm:block h-screen w-screen bg-center bg-cover bg-no-repeat"></div>
            </div>
        )
    }
}


export default Login