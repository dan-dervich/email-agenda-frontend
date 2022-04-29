import { Button, Card, Grid, Input, Link, Loading, Spacer, Text } from '@nextui-org/react'
import { Component } from 'react'


class Login extends Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {signUpButtonStatus: false}
    }
    render() :any {
        const submitHandler = async (e: any) =>{
            e.preventDefault()
            this.setState({signUpButtonStatus: true})
            console.log(e.target)
            const username: string = e.target[0].value
            const email: string = e.target[2].value
            const password: string = e.target[4].value
            console.log(username);
            console.log(email);
            console.log(password);
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
            this.setState({signUpButtonStatus: false})
        }
        return (
            <>
            <Grid.Container style={{minHeight: '100vh', backgroundColor: "#e8e8e8"}} justify="center" alignItems='center'>
                <Grid xs={11} sm={5} md={4} lg={3} xl={2}>
                <Card shadow>
                    <Card.Header style={{display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'transparent', borderBottom: '1px solid lightgrey'}}>
                            <Text h1>Crear Cuenta</Text>
                    </Card.Header>
                    <Card.Body style={{padding: 40}}>
                        <Spacer y={2} />
                    <form style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: 'column', minHeight: '30vh', width: '100%'}} onSubmit={submitHandler}>
                        <Input fullWidth bordered clearable type="text" labelPlaceholder='Username' size='md' required name="username" />
                        <Spacer y={2} />
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


export default Login