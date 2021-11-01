
import Login from "./pages/login/Login";
import Register from "./pages/register/register";
import{ BrowserRouter as Router, Switch,Route} from "react-router-dom"
import {ContextProvider} from "./contextAPI/Context"
import{ useState } from 'react'
import axios from "axios";





function App() {
  /*stupidUser={
    id:"617ee36ff392ddd6dffd8da3",
    username:"jhonDoe",
    firstName:"jhon",
    lastName:"Doe",
    email:"jhon.doe@gmail.com",
    profilePicture:"",
    contacts:[],
    rooms: [],
    status:0,
  }*/
  //const [user, setUser] = useState(stupidUser);
  const fetchData = async () =>{
    const res = await axios.get('/auth')
    console.log(res)
  }
  fetchData()
  return (
    <ContextProvider>
    <Router >
      <Switch>
      <Route exact path="/">
          <Login />
        </Route>
        <Route path="/login">
          <Login/>
        </Route>

        <Route path="/register">
          <Register/>
        </Route>

      </Switch>
      <Register />
    </Router>
    </ContextProvider>
  );
}

export default App;
