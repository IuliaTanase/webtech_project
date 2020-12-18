import { BrowserRouter, Route } from "react-router-dom"
import AlimentsContainer from "./components/aliments/AlimentsContainer";
import Home from "./components/home/Home";
import Login from "./components/home/Login";
import NewAccount from "./components/home/NewAccount";
import AddAliment from "./components/profile/AddAliment";
import Profile from "./components/profile/Profile"

function App() {
  return (
    <BrowserRouter >
      <Route exact path="/" component={Home} />
      <Route exact path="/create-account" component={NewAccount} />
      <Route exact path="/sign-in" component={Login} />
      <Route exact path="/aliments" component={AlimentsContainer} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/add-new-aliment" component={AddAliment} />

    </BrowserRouter>
  );
}

export default App;
