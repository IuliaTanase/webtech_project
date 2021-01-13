import { BrowserRouter, Route } from "react-router-dom"
import AlimentsContainer from "./components/aliments/AlimentsContainer";
import Home from "./components/home/Home";
import Login from "./components/home/Login";
import NewAccount from "./components/home/NewAccount";
import AddAliment from "./components/user-profile/AddAliment";
import Profile from "./components/user-profile/Profile"
import UserAlimentsContainer from "./components/user-profile/UserAlimentsContainer"
import UserReservedAlimentsContainer from "./components/user-profile/UserReservedAlimentsContainer"
import NotificationsContainer from './components/notifications/Notifications'
import AddFriend from './components/friends/AddFriend'
import FriendsContainer from './components/friends/FriendsContainer'

function App() {
  return (
    <BrowserRouter >
      <Route exact path="/" component={Home} />
      <Route exact path="/create-account" component={NewAccount} />
      <Route exact path="/sign-in" component={Login} />
      <Route exact path="/aliments" component={AlimentsContainer} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/add-new-aliment" component={AddAliment} />
      <Route exact path="/my-aliments" component={UserAlimentsContainer} />
      <Route exact path="/reserved-aliments" component={UserReservedAlimentsContainer} />
      <Route exact path="/notifications" component={NotificationsContainer} />
      <Route exact path="/add-friend" component={AddFriend} />
      <Route exact path="/friends" component={FriendsContainer} />

    </BrowserRouter>
  );
}

export default App;
