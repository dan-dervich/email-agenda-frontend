import { Button, Card, Grid, Input, Link, Loading, Spacer, Text } from '@nextui-org/react'
import { Component } from 'react'
import Cookies from 'js-cookie'
import jwt from 'jsonwebtoken'


class Login extends Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {signUpButtonStatus: false, userNotFound: false, passwordsDontMatch: false, errorCreatingJWTtoken: false}
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
    render() :any {
        const submitHandler = async (e: any) =>{
            e.preventDefault()
            this.setState({signUpButtonStatus: true})
            console.log(e.target)
            const email: string = e.target[0].value
            const password: string = e.target[2].value
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
                Cookies.set("token", req.token, {expires: 1})
                window.location.replace('/dashboard/' + req.id)
            } else {
                if(req.status == "userNotFound") {
                    this.setState({userNotFound: true})
                } else if (req.status == "passwordsDontMatch") {
                    this.setState({passwordsDontMatch: true})
                } else if (req.status == "errorCreatingJWTtoken") {
                    this.setState({errorCreatingJWTtoken: true})
                }
            }
            this.setState({signUpButtonStatus: false})
        }
        return (
            <>
            <Grid.Container style={{minHeight: '100vh', backgroundColor: "#e8e8e8"}} justify="center" alignItems='center'>
                <Grid xs={11} sm={5} md={4} lg={3} xl={2}>
                <Card shadow>
                    <Card.Header style={{display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'transparent', borderBottom: '1px solid lightgrey'}}>
                            <Text h1>Login</Text>
                    </Card.Header>
                    <Card.Body style={{padding: 40}}>
                        <Spacer y={2} />
                    <form style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: 'column', minHeight: '30vh', width: '100%'}} onSubmit={submitHandler}>
                        <Input fullWidth bordered clearable type="Email" labelPlaceholder='Email' size='md' required name="email" />
                        <Spacer y={2} />
                        <Input.Password bordered type="password" labelPlaceholder='Password' size='md' required name="password"/>
                        <Spacer y={2} />
                        {this.state.signUpButtonStatus ? <><Button auto disabled color="primary" css={{ px: '$13' }}><Loading color="white" size="sm" /> </Button></> :  <Button type='submit'>Login</Button> }
                        <Spacer y={.5} />
                    </form>
                    </Card.Body>
                    <Card.Footer style={{borderTop: "1px solid #d3d3d3", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: 'column'}} >
                    <p style={{color: "#5e5e5e", fontSize: '1.2em'}}>Don&apos;t have an account yet?</p>
                    <Link href='/auth/sign-up' underline>Create Account</Link>
                    </Card.Footer>
                </Card>
                </Grid>
            </Grid.Container>
            </>
        )
    }
}


export default Login