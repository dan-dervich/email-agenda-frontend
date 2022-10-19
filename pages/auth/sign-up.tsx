import { Button, Card, Grid, Input, Link, Loading, Spacer, Text } from '@nextui-org/react'
import { Component } from 'react'
import Cookies from 'js-cookie'
import jwt from 'jsonwebtoken'
import { SignUpForm } from '../../components/auth/authForms'


class SignUp extends Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = { signUpButtonStatus: false, emailInUse: false, tryAgainInAWhile: false }
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
            const username: string = e.target[0].value
            const email: string = e.target[2].value
            const password: string = e.target[4].value
            let res = await fetch("http://localhost:8080/auth/sign-up", {
                body: JSON.stringify({
                    "username": username,
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
            if (req.status == "userCreatedSuccessfully") {
                Cookies.set("token", req.jwtToken, { expires: 1 })
                window.location.replace('/dashboard/' + req.ID)
                this.setState({ signUpButtonStatus: false })
            } else if (req.status !== "userCreatedSuccessfully") {
                if (req.status == "emailAlreadyInUse") {
                    this.setState({ emailInUse: true, signUpButtonStatus: false })
                    return;
                } else if (req.status == "errorHashingPassword") {
                    this.setState({ tryAgainInAWhile: true, signUpButtonStatus: false })
                    return;
                } else if (req.status == "errorCreatingJWTtoken") {
                    this.setState({ tryAgainInAWhile: true, signUpButtonStatus: false })
                    return;
                }
                this.setState({ tryAgainInAWhile: true, signUpButtonStatus: false })
            }
        }
        return (
            <>
                <form>
                    {/* TODO: */}
                    {/* remake signup form with new desgin : ) */}
                    <SignUpForm />
                </form>
            </>
        )
    }
}


export default SignUp