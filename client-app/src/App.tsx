import { Route, Routes } from "react-router-dom";
import Details from "./pages/details/Details";
import Favorites from "./pages/user/Favorites";
import Error from "./components/UI/Error";
import NavBar from "./components/UI/NavBar";
import CreationOptions from "./pages/creationForms/CreationOptions";
import HomeList from "./pages/movieLists/HomeList";
import TagList from "./pages/movieLists/TagList";
import PersonInfo from "./pages/details/PersonInfo";
import LoginForm from "./pages/user/LoginForm";
import { UserContextProvider } from "./contexts/UserContext";
import RegisterForm from "./pages/user/RegisterForm";
import Profile from "./pages/user/Profile";
import SearchList from "./pages/movieLists/SearchList";
import EditDetails from "./pages/details/EditDetails";
import { ModalContextProvider } from "./contexts/ModalContext";
import { NotificationContextProvider } from "./contexts/NotificationContext";
import DataBaseSeeding from "./development/DatabaseSeedingO";
import Settings from "./pages/user/Settings";
import FriendsList from "./pages/user/FriendsList";

export const uri = "http://localhost:5000";

function App() {
  return (
    <UserContextProvider>
      <ModalContextProvider>
        <NotificationContextProvider>
          <>
            <NavBar />
            <Routes>
              <Route path="/" element={<HomeList />} />
              <Route path="/details/:movieId" element={<Details />} />
              <Route path="/details/:movieId/edit" element={<EditDetails />} />
              <Route path="/tag/:id" element={<TagList />} />
              <Route path="/search/:search" element={<SearchList />} />
              <Route path="/person/:id" element={<PersonInfo />} />
              <Route path="/account/login" element={<LoginForm />} />
              <Route path="/account/register" element={<RegisterForm />} />
              <Route path="/account/settings" element={<Settings />} />

              <Route path="/account/profile/:id" element={<Profile />} />
              <Route path="/account/friends/" element={<FriendsList />} />
              <Route path="/favorites/" element={<Favorites />} />
              <Route path="/favorites/:userId" element={<Favorites />} />
              <Route path="/add/*" element={<CreationOptions />} />

              <Route path="/error" element={<Error />} />
              <Route path="/*" element={<Error />} />
            </Routes>
          </>
        </NotificationContextProvider>
      </ModalContextProvider>
    </UserContextProvider>
  );
}

export default App;
