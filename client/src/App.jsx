import { Route, Routes, Navigate } from "react-router-dom"
import Chat from "./pages/chat"
import LogIn from "./pages/login"
import SignUp from "./pages/signup"
import "bootstrap/dist/css/bootstrap.min.css" 
import { Container } from "react-bootstrap"
import NavBar from "./components/navbar"

function App() {
  return (
    <>
    <NavBar />
    <Container>
    <Routes>
      <Route path="/" element = {<Chat />} />
      <Route path="/login" element = {< LogIn />}/>
      <Route path="/signup" element = {< SignUp />}/>
      <Route path="*" element={<Navigate to= "/"/>} />
    </Routes>
    </Container>
    </>
  )
}

export default App
