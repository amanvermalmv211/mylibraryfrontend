import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './allcomponents/home/HomePage';
import Navbar from './allcomponents/navbar/Navbar';
import ToastAnim from './allcomponents/notificationmessage/ToastAnim';
import Login from './allcomponents/signandlogin/Login';
import Footer from './allcomponents/home/Footer';
import Results from './allcomponents/results/Results';
import Contact from './allcomponents/results/Contact';
import SignupPage from './allcomponents/signandlogin/SignupPage';
import StdSignup from './allcomponents/signandlogin/StdSignup';
import OwnerSignup from './allcomponents/signandlogin/OwnerSignup';
import AuthState from './context/auth/AuthState';
import SearchLibrary from './allcomponents/home/SearchLibrary';
import Ebooks from './allcomponents/results/Ebooks';
import LibOwner from './allcomponents/library/LibOwner';
import LibOwnerProfile from './allcomponents/library/LibOwnerProfile';
import EditorProfile from './allcomponents/results/EditorProfile';
import AdminProfile from './allcomponents/admin/AdminProfile';
import AllLibraries from './allcomponents/admin/AllLibraries';
import Request from './allcomponents/admin/Request';
import InitLibrary from './allcomponents/admin/InitLibrary';

function App() {
  return (
    <>
      <AuthState>
        <Router>
          <Navbar />

          <ToastAnim />

          <Routes>
            <Route exact path="/" element={<HomePage />}></Route>
            <Route exact path="/signup" element={<SignupPage />}></Route>
            <Route exact path="/student/signup" element={<StdSignup />}></Route>
            <Route exact path="/owner/signup" element={<OwnerSignup />}></Route>
            <Route exact path="/login" element={<Login />}></Route>
            <Route exact path="/searchlibrary" element={<SearchLibrary />}></Route>
            <Route exact path="/libowner" element={<LibOwner />}></Route>
            <Route exact path="/admin/profile" element={<AdminProfile />}></Route>
            <Route exact path="/initlib" element={<InitLibrary />}></Route>
            <Route exact path="/alllibraries" element={<AllLibraries />}></Route>
            <Route exact path="/request" element={<Request />}></Route>
            <Route exact path="/libowner/profile" element={<LibOwnerProfile />}></Route>
            <Route exact path="/editor/profile" element={<EditorProfile />}></Route>
            <Route exact path="/results" element={<Results />}></Route>
            <Route exact path="/ebooks" element={<Ebooks />}></Route>
            <Route exact path="/contactus" element={<Contact />}></Route>
          </Routes>

          <Footer />

        </Router>

      </AuthState>
    </>
  );
}

export default App;