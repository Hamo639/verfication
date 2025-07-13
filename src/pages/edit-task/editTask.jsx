import "./editTask.css";

import { Helmet } from "react-helmet-async";
import Header from "comp/header";
import Footer from "comp/Footer";


import { auth, db} from "../../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "../../comp/Loading";
import Erroe404 from "../erroe404";
import {  useParams } from "react-router-dom";
import Title from "./Title";
import Subtask from "./subtask";
import Btnsection from "./btnsection";
import { useDocument } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import { useState } from "react";

const EditTask = () => {
  
  const [user, loading, error] = useAuthState(auth);
  let {id}=useParams();
  const [showaddtask, setshowaddtask] = useState(false);

  

  // @ts-ignore

  if (error) {
    return <Erroe404/>
  }
  if (loading) {
    return <Loading/>
  }
  



    if (user) {
  
      return (
        <div>
  
          <Helmet>
            <title>edit task Page</title>
          </Helmet>
    
          <Header />
          {showaddtask?(<main>Loaddding</main>):(  <div className="edit-task">
          <Title user={user} id={id}/>
    
          <Subtask user={user} id={id}/>
    
            {/* Add-more BTN && Delete BTN */}
    
          <Btnsection user={user} id={id} setshowaddtask={setshowaddtask}/>
          </div>)}

        
    
          <Footer />
        </div>
      );
    }
  }
  
  


  
;

export default EditTask;
