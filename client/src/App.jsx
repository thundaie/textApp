import { Route, Routes, Navigate } from "react-router-dom"
import Chat from "./pages/chat"
import LogIn from "./pages/login"
import SignUp from "./pages/signup"
import "bootstrap/dist/css/bootstrap.min.css" 
import { Container } from "react-bootstrap"
import NavBar from "./components/navbar"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContect"
import { chatContextProvider } from "../context/chatContext"

function App() {
  const { user } = useContext(AuthContext)
  return (
    <>
    <chatContextProvider user={user}>
    <NavBar />
    <Container>
    <Routes>
      <Route path="/" element = {user ? <Chat /> : <LogIn/>}  />
      <Route path="/login" element = {user ? <Chat /> :< LogIn />}/>
      <Route path="/signup" element = {user ? <Chat /> :< SignUp />}/>
      <Route path="*" element={<Navigate to= "/"/>} />
    </Routes>
    </Container>
    </chatContextProvider>
    </>
  )
}

export default App
