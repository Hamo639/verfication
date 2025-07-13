import Header from "../../comp/header";
import Footer from "../../comp/Footer";
import Loading from "../../comp/Loading";
import Erroe404 from "../erroe404";
import { Helmet } from "react-helmet-async";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase/config";
import { Link } from "react-router-dom";
import { sendEmailVerification } from "firebase/auth";
import { useState } from "react";
// Level 3
import "./Home.css";
import Modal from "pages/Modal/Modal";
import { doc, setDoc } from "firebase/firestore";
import ReactLoading from "react-loading";

import Addtask from "./Addtask";

const Home = () => {

  // modalll  كل الاكواد دي خاصه ب ال
  const [array, setarray] = useState([]);
  const [title, settitle] = useState("");
  const [details, setdetails] = useState("");
  const [showloadin, setshowloadin] = useState(false);
  const [showmessage, setshowmessage] = useState(false);
  const addbtn = () => {
    if (!array.includes(details)) {
      array.push(details);
    }
  };

  const [showmodal, setshowmodal] = useState(false);
  // modalllll  نهايه
  const [user, loading, error] = useAuthState(auth);

  console.log(user);

  const sendAgain = () => {
    sendEmailVerification(auth.currentUser).then(() => {
      console.log("Email verification sent!");
      // ...
    });
  };

  if (error) {
    return <Erroe404 />;
  }

  if (loading) {
    return <Loading />;
  }
  // دي اكواد لو مفيش يوزر
  if (!user) {
    return (
      <>
        <Helmet>
          <title>HOME Page</title>
          <style type="text/css">{`.Light main h1 span{color: #222}   `}</style>
        </Helmet>

        <Header />

        <main>
          <h1 style={{ fontSize: "28px" }}>
            {" "}
            <span>Welcome🔥🔥🔥</span>{" "}
          </h1>
          <p className="pls">
            Please{" "}
            <Link style={{ fontSize: "30px" }} to="/signin">
              sign in
            </Link>{" "}
            to continue...{" "}
            <span>
              <i className="fa-solid fa-heart"></i>
            </span>
          </p>
        </main>

        <Footer />
      </>
    );
  }
  // دي نهايتهاااااااا

  // دي اكواد لو في يوزر بس مش عامل تأكيد للأيميل
  if (user) {
    if (!user.emailVerified) {
      return (
        <>
          <Helmet>
            <title>HOME Page</title>
            <meta name="description" content="HOMEEEEEEEEEEEE" />
          </Helmet>

          <Header />

          <main>
            <p>
              {" "}
              Welcome: {user.displayName}{" "}
              <span>
                <i className="fa-solid fa-heart"></i>{" "}
              </span>
            </p>

            <p>Please verify your email to continue ✋ </p>
            <button
              onClick={() => {
                sendAgain();
              }}
              className="delete"
            >
              Send email
            </button>
          </main>

          <Footer />
        </>
      );
    }
  }
  // دي نهايتهااااااااااااا

  // دي اكواد لو اليوزر مأكد الايميل
  if (user) {
    if (user.emailVerified) {
      return (
        <>
          <Helmet>
            <title>HOME Page</title>
          </Helmet>

          <Header />

          <main className="home">
            {/* OPIONS (filtered data) */}
          
            {/* SHOW all tasks */}
            
            {<Addtask user={user}/>}

            {/* Add new task BTN */}
            <section className="mt">
              <button
                onClick={() => {
                  setshowmodal(true);
                }}
                className="add-task-btn"
              >
                Add new task <i className="fa-solid fa-plus"></i>
              </button>
            </section>
          </main>
          {/* modallll دي اكواد ال  */}
          {showmodal && (
            <Modal setshowmodal={setshowmodal}>
              <input
                value={title}
                onChange={(eo) => {
                  settitle(eo.target.value);
                }}
                placeholder="add title:"
                type="text"
              />
              <div style={{ alignItems: "baseline" }} className="flex ">
                <input
                  value={details}
                  onChange={(eo) => {
                    setdetails(eo.target.value);
                  }}
                  placeholder="details"
                  type="text"
                />
                <button
                style={{marginLeft:"10px"}}
                  onClick={(eo) => {
                    eo.preventDefault();
                    addbtn();
                    setdetails("");
                  }}
                  className="btn-add"
                >
                  add
                </button>
              </div>
              <ul className="ul-modal">
                {array.map((item) => {
                  return (
                    <li key={item} className="li-modal">
                      {item}
                    </li>
                  );
                })}
              </ul>

              <button
                onClick={async (eo) => {
                  eo.preventDefault();
                  setdetails("");
                  settitle("");

                  setarray([]);
                  setshowloadin(true);
                  const id = new Date().getTime();
                  await setDoc(doc(db, user.uid, `${id}`), {
                    title: title,
                    details: array,
                    id: id,
                    completed:false,
                  });
                  setshowloadin(false);
                  setshowmodal(false);
                  setshowmessage(true);
                  setTimeout(() => {
                    setshowmessage(false);
                  }, 3000);
                }}
                className="btn-submit"
              >
                {showloadin ? (
                  <ReactLoading
                  className="loading"
                    type={"spin"}
                    color={"red"}
                    height={20}
                    width={20}
                  />
                ) : (
                  "Submit"
                )}
              </button>
            </Modal>
          )}

          {/* // دي نهايتها */}

          {/* بتظهر لما برسل بيانات لل فاير بيز message دي   */}
          <h2
            className="message"
            style={{
              position: "absolute",
              top: "80px",
              right: showmessage ? "5vw" : "100vw",
            }}
          >
            Send task successfully{" "}
            <i className="fa-regular fa-circle-check"></i>
          </h2>
          {/* دي نهايتها */}
          <Footer />
        </>
      );
    }
  }
};
export default Home;
