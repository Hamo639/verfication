import Header from "../comp/header";
import Footer from "../comp/Footer";
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import Moment from "react-moment";
import ReactLoading from 'react-loading';
import {  deleteUser } from "firebase/auth";

const Profile = () => {
  const [user, loading, error] = useAuthState(auth);

  const navigate = useNavigate();
  useEffect(() => {
    if (!user && !loading) {
      navigate("/");
    }
  });

  if (loading) {
    return(
      <>
      <Header/>
      <main>
      <ReactLoading className="loading"  type="spin" color="red" height={667} width={100} />
      </main>
      <Footer/>
      </>
    )
  }

  if (error) {
    return (
      <div>
        <p>Error</p>
      </div>
    );
  }

  if (user) {
    return (
      <>
        <Helmet>
          <title>Profile</title>

          <style type="text/css">{` 
        main{
          flex-direction: column;
          align-items: flex-start;
  
    width: fit-content;
    margin: auto;
        }
    


        
        `}</style>
        </Helmet>
        <Header />

        <main>
          <h6>Email: {user.email}</h6>
          <h6 style={{marginTop:"8px"}}>UserName: {user.displayName}</h6>

          <h6 style={{marginTop:"10px"}}>
            Last Sign-in :{" "}
            <Moment style={{color:"teal"}} fromNow date={user.metadata.lastSignInTime} />{" "}
          </h6>

          <h6 style={{marginTop:"10px"}}>
            Account Created :{" "}
            <Moment style={{color:"teal"}} fromNow date={user.metadata.creationTime} />
          </h6>
          <button onClick={() => {
            deleteUser(user).then(() => {
              console.log("doneeeeeeeee")
              // User deleted.
            }).catch((error) => {
              console.log("errrrrror")
              // An error ocurred
              // ...
            });
          }
          } className="delet">Delete account</button>
        </main>
        <Footer />
      </>
    );
  }
};

export default Profile;
