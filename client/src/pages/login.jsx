import { useContext } from "react";
import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContect";


const LogIn = () => {

    const { logInUser,
        logInError,
        logInInfo,
        updateLogInInfo,
        isLogInLoading } = useContext(AuthContext)

    return ( <>
    <Form onSubmit={logInUser}>
        <Row style={{
            height: '100vh',
            justifyContent: "center",
            paddingTop: "10%"
        }}>
            <Col xs={6}>
            <Stack gap={3}>
                <h2>Log In</h2>
                <Form.Control type="text" placeholder="Username" onChange={(e) => 
                    updateLogInInfo({ ...logInInfo, username: e.target.value })}/>
                <Form.Control type="password" placeholder="Password" />
                <Button variant="primary" type="submit">
                    {isLogInLoading? "Getting you In..." : "Login"}
                </Button>
                

                {logInError?.error && (
                     <Alert variant="danger">
                     <p>{logInError?.message}</p>
                 </Alert>
                )}
               
            </Stack>
            </Col>
        </Row>
    </Form>
    </> );
}
 
export default LogIn;