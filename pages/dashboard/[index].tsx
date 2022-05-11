import Cookies from "js-cookie";
import { Component } from "react";
import jwt from 'jsonwebtoken'
import { Card, Grid, Input, Spacer, Text } from "@nextui-org/react";
import Nav from "../../components/dashboard/nav";
import { BsSearch } from 'react-icons/bs'

class Dashboard extends Component <any, any> {
    constructor (props: any) {
        super(props) 
        this.state = {username: "", _id: ""}
    }
    componentDidMount() {
        let cookieValue = Cookies.get('token')
        jwt.verify(cookieValue as string,
            process.env.JWT_SECRET as string,
            async (err: any, verifiedJwt: any) => {
                if (err) {
                        return window.location.replace('/')
                }
                this.setState({username: verifiedJwt.username, _id: verifiedJwt.ID})
            })
    }
    render () :any {
        return (
            <Grid.Container gap={1} style={{backgroundColor: "#FBFEFE", maxWidth: '100vw', minHeight: '100vh'}} >
            <Grid justify="center" alignItems="center" style={{height: '100vh'}}>
                <Nav ID={this.state._id}/>
            </Grid>
            <Grid justify="center" alignItems="center" style={{width: '80vw', paddingLeft: "5vw"}}>
                {/* search */}
                <Grid>
                    <Spacer y={2} />
                    <form>
                        <Input underlined labelPlaceholder="Search Clients" size="xl" fullWidth contentLeft={<BsSearch />} />
                    </form>
                </Grid>
            <Text size="6rem" h1><span style={{color: "#bababa"}}>Welcome,</span> {this.state.username}</Text>
            {/* statistics gallery */}
                <Grid.Container gap={2} justify="center" alignItems="center" direction="row">
            <Grid xl={2} >
                    <Text h2>Closed sales: </Text>
                    </Grid>
            <Grid xl={3} >
                {/* sales this week */}
                <Card css={{backgroundColor: '#fef5e8', maxWidth: '100%'}} shadow>
                    <Text color="warning" style={{textAlign: 'center'}} h2>This Week</Text>
                    <Text color="warning" style={{textAlign: 'center'}} h1>4%</Text>
                </Card>
            </Grid>
                {/* sales this month */}
                <Grid xl={3} >
                {/* sales this week */}
                <Card css={{backgroundColor: '#f5ecff', maxWidth: '100%'}} shadow>
                <Text style={{textAlign: 'center', color: '#9b57dc'}} h2>This Month</Text>
                    <Text css={{color: '#9b57dc'}} style={{textAlign: 'center'}} h1>4%</Text>
                </Card>
            </Grid>
                {/* sales this year */}
                <Grid xl={3} >
                <Card css={{backgroundColor: '#a9d8ff', maxWidth: '100%'}} shadow>
                    <Text style={{textAlign: 'center', color: '#167dd0'}} h2>This Year</Text>
                    <Text style={{textAlign: 'center', color: '#167dd0'}} h1>4%</Text>
                </Card>
            </Grid>
                </Grid.Container>
                {/* Sales Graph */}
                <Grid>
                    <Text h1>Sales:</Text>
                    {/* ... */}
                </Grid>
            </Grid>
            </Grid.Container>
        )
    }
}


export default Dashboard