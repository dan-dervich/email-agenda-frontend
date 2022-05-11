import { Button, Card, Grid, Input, Link, Loading, Spacer, Text } from '@nextui-org/react'
import { Component } from 'react'
import Cookies from 'js-cookie'
import jwt from 'jsonwebtoken'


class SignUp extends Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {signUpButtonStatus: false, emailInUse: false, tryAgainInAWhile: false}
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
            Cookies.set("token", req.jwtToken, {expires: 1})
            window.location.replace('/dashboard/' + req.ID)
            this.setState({signUpButtonStatus: false})
        } else if (req.status !== "userCreatedSuccessfully") {
                if (req.status == "emailAlreadyInUse") {
                this.setState({emailInUse: true, signUpButtonStatus: false})
                return;
                } else if (req.status == "errorHashingPassword") {
                this.setState({tryAgainInAWhile: true, signUpButtonStatus: false})
                return;
                } else if (req.status == "errorCreatingJWTtoken") {
                this.setState({tryAgainInAWhile: true, signUpButtonStatus: false})
                return;
                }
                this.setState({tryAgainInAWhile: true, signUpButtonStatus: false})
            }
        }
        return (
            <>
            <Grid.Container style={{minHeight: '100vh', backgroundColor: "#e8e8e8"}} justify="center" alignItems='center'>
                <Grid xs={11} sm={5} md={4} lg={3} xl={2}>
                <Card shadow>
                    <Card.Header style={{display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'transparent', borderBottom: '1px solid lightgrey'}}>
                            <Text h1>Create Account</Text>
                    </Card.Header>
                    <Card.Body style={{padding: 40}}>
                        <Spacer y={2} />
                    <form style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: 'column', minHeight: '30vh', width: '100%'}} onSubmit={submitHandler}>
                    {this.state.tryAgainInAWhile ? <><Text h5>Our servers seem to be having issues please try again later</Text></> : <></>}
                        <Input fullWidth bordered clearable type="text" labelPlaceholder='Username' size='md' required name="username" />
                        {this.state.emailInUse ? <><Spacer y={1} /><Text h5>This email is already in use try</Text> <Link href="/auth/login" underline>logging in</Link><Spacer y={1} /></> : <><Spacer y={2} /></>}
                        <Input fullWidth bordered clearable type="Email" labelPlaceholder='Email' size='md' required name="email" />
                        <Spacer y={2} />
                        <Input.Password bordered type="password" labelPlaceholder='Password' size='md' required name="password"/>
                        <Spacer y={2} />
                        {this.state.signUpButtonStatus ? <><Button auto disabled color="primary" css={{ px: '$13' }}><Loading color="white" size="sm" /> </Button></> :  <Button type='submit'>Create Account</Button> }
                        <Spacer y={.5} />
                    </form>
                    </Card.Body>
                    <Card.Footer style={{borderTop: "1px solid #d3d3d3", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: 'column'}} >
                    <p style={{color: "#5e5e5e", fontSize: '1.2em'}}>Ya tienes una cuenta?</p>
                    <Link href='/auth/login' underline>Ingresar</Link>
                    </Card.Footer>
                </Card>
                </Grid>
            </Grid.Container>
            </>
        )
    }
}


export default SignUp