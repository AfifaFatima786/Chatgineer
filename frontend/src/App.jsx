import AppRoutes from "./routes/AppRoutes"
import { UserProvider } from "./context/userContext"
import './index.css'

function App() {
 

  return (

    <UserProvider>
   <AppRoutes/>
   </UserProvider>
  )
}

export default App
