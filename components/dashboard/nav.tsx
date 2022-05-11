import { Card, Grid, Link, Spacer, Text } from "@nextui-org/react"
import { BsHouse } from "react-icons/bs"
import { BsCalendar2Week } from 'react-icons/bs'
import { ImStatsBars } from "react-icons/im"
import { AiOutlineSetting } from "react-icons/ai"
// AiOutlineHome
function Nav({ID}:any) {
    return (
        <>
        <Card style={{height: '98vh', backgroundColor: "#f9f9f9", minWidth: '20vh'}} shadow>
            <Card.Header style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Text h1>LOGO</Text>
            </Card.Header>
            <Card.Body style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Spacer y={6} />
                <Grid.Container justify="flex-start" alignItems="center" gap={1} direction="column" style={{height: '100%'}}>
                    <Grid justify="center" alignItems="center" style={{width: '100%'}}>
                    <Link href={"/dashboard/" + ID} style={{width: '100%'}} css={{"&:hover": {backgroundColor: "#EAEAEA", color: "#7c92f0"}, color: "#222", padding: 20}} block><BsHouse /> &nbsp; Home</Link>
                    </Grid>
                    <Grid justify="center" alignItems="center" style={{width: '100%'}}>
                    <Link href={"/dashboard/calendar/" + ID} css={{"&:hover": {backgroundColor: "#EAEAEA", color: "#7c92f0"}, color: "#222", padding: 20}} block><BsCalendar2Week /> &nbsp; Calendar</Link>
                    </Grid>
                    <Grid justify="center" alignItems="center" style={{width: '100%'}}>
                    <Link href={"/dashboard/statistics/" + ID} css={{"&:hover": {backgroundColor: "#EAEAEA", color: "#7c92f0"}, color: "#222", padding: 20}} block><ImStatsBars /> &nbsp; Statistics</Link>
                    </Grid>
                </Grid.Container>
            </Card.Body>
            <Card.Footer>
            <Grid.Container justify="flex-start" alignItems="center" gap={1} direction="row">
                    <Grid justify="center" alignItems="center" style={{width: '100%'}}>
                    <Link href={"/dashboard/settings/" + ID} css={{"&:hover": {backgroundColor: "#EAEAEA", color: "#7c92f0"}, color: "#222", padding: 20}} block><AiOutlineSetting /> &nbsp; Settings</Link>
                    </Grid>
                </Grid.Container>
            </Card.Footer>
        </Card>
        </>
    )
}

export default Nav