import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut  } from "firebase/auth";
import {  useState, useEffect } from "react";


import "./styles/App.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import TaskField from "./components/tasks/TaskField";
import Headings from "./components/tasks/Headings";
import TableForUsers from "./components/users/TableForUsers";
import TableForOrders from "./components/orders/TableForOrders";
import SignIn from "./components/signIn/SignIn";
import UserPage from "./components/users/UserPage";
import { FirebaseProvider } from "./context/FirebaseContext";






function App() {

  const [loggedIn, checkUser] = useState(false);

  const firebaseConfig = {
    apiKey: "AIzaSyCm5WtyZbK83dOUfst-wID9qgg1h9srGT4",
    authDomain: "proshusud.firebaseapp.com",
    projectId: "proshusud",
    storageBucket: "proshusud.appspot.com",
    messagingSenderId: "268915249466",
    appId: "1:268915249466:web:0aff73def1e1e1195d0003",
    measurementId: "G-JS0ER1FQ30",
  };
  
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if ((user.uid === 'wbl8ODIK96bJdgTCRUA59gYccC12') || (user.uid === 'vzcAow1ZKCXltpBd7sFH17O2zx32')) {
          checkUser(true)
      } else {
          signOut(auth)
          console.log('wrong user')
          checkUser(false)
      }
    })
  }, [])
  console.log(loggedIn)

  return (
    <div>
      <FirebaseProvider>
        <Router>
            <Routes>
            <Route exact path="/" element={loggedIn?<Navigate to="/task" />:<SignIn/>} />
              <Route
                path="/task"
                element={loggedIn?<>
                  <Layout>
                    <Headings />
                    <TaskField />
                    </Layout>
                  </>:<SignIn/>
                }
              ></Route>
              <Route path="/about" element={loggedIn?<>3333333</>:<SignIn/>} />

              <Route path="/clients" element={loggedIn?<Layout><TableForUsers /></Layout>:<SignIn/>} />

              <Route path="/orders" element={loggedIn?<Layout><TableForOrders /></Layout>:<SignIn/>} />
              <Route path="/settings" element={loggedIn?<Layout><>4567</></Layout>:<SignIn/>} />
              <Route path="/user" element={loggedIn?<Layout><UserPage/></Layout>:<SignIn/>} />

            </Routes>
        </Router>
      </FirebaseProvider>
    </div>
  );
}

export default App;
