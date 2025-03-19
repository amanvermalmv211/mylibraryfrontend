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
import EditLibrary from './allcomponents/library/EditLibrary';
import StudentProfile from './allcomponents/student/StudentProfile';
import LibraryRequest from './allcomponents/home/LibraryRequest';
import EditorSignup from './allcomponents/results/EditorSignup';
import TermsConditions from './allcomponents/notificationmessage/TermsConditions';
import LibraryRequestSubs from './allcomponents/library/LibraryRequestSubs';
import StdLibrary from './allcomponents/student/StdLibrary';
import NotificationByOwner from './allcomponents/library/NotificationByOwner';
import About from './allcomponents/home/About';
import ResetPass from './allcomponents/signandlogin/ResetPass';
import { HelmetProvider } from 'react-helmet-async';

function App() {
  return (
    <HelmetProvider>
      <AuthState>
        <Router>
          <Navbar />

          <ToastAnim />

          <Routes>
            <Route exact path="/" element={<HomePage />}></Route>
            <Route exact path="/signup" element={<SignupPage />}></Route>
            <Route exact path="/signup/student" element={<StdSignup />}></Route>
            <Route exact path="/signup/library-owner" element={<OwnerSignup />}></Route>
            <Route exact path="/login" element={<Login />}></Route>
            <Route exact path="/resetpassword" element={<ResetPass />}></Route>
            <Route exact path="/libraries" element={<SearchLibrary />}></Route>
            <Route exact path="/admin" element={<AdminProfile />}></Route>
            <Route exact path="/admin/request" element={<Request />}></Route>
            <Route exact path="/admin/request/initlib" element={<InitLibrary />}></Route>
            <Route exact path="/admin/alllibraries" element={<AllLibraries />}></Route>

            <Route exact path="/libowner" element={<LibOwnerProfile />}></Route>
            <Route exact path="/libowner/library" element={<LibOwner />}></Route>
            <Route exact path="/libowner/library/edit" element={<EditLibrary />}></Route>
            <Route exact path="/libowner/library/requests" element={<LibraryRequestSubs />}></Route>
            <Route exact path="/libowner/library/students" element={<NotificationByOwner />}></Route>

            <Route exact path="/student" element={<StudentProfile />}></Route>
            <Route exact path="/student/subscription" element={<StdLibrary />}></Route>
            <Route exact path="/reserve-seat" element={<LibraryRequest />}></Route>

            <Route exact path="/signup/editor" element={<EditorSignup />}></Route>
            <Route exact path="/editor" element={<EditorProfile istrue={false} />}></Route>
            <Route exact path="/sarkari-results" element={<Results />}></Route>
            <Route exact path="/ebooks" element={<Ebooks />}></Route>
            <Route exact path="/contact" element={<Contact />}></Route>
            <Route exact path="/about" element={<About />}></Route>
            <Route exact path="/terms-and-conditions" element={<TermsConditions />}></Route>
          </Routes>

          <Footer />

        </Router>

      </AuthState>
    </HelmetProvider>
  );
}

export default App;