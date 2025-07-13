import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";
import Error404 from "../../pages/erroe404";  
import ReactLoading from "react-loading";
import Moment from "react-moment";

const Addtask = ({ user }) => {
  const [task, settask] = useState("All Tasks");
  const [showSortButtons, setShowSortButtons] = useState(true); // التحكم في إظهار الأزرار

  const handleTaskFilterChange = (taskType) => {
    settask(taskType);
    if (taskType === "All Tasks") {
      setShowSortButtons(true); // إظهار الأزرار عند اختيار "All Tasks"
      setinitialdata(query(collection(db, user.uid)));
    } else if (taskType === "Completed") {
      setShowSortButtons(false);  
      setinitialdata(query(collection(db, user.uid), where("completed", "==", true)));
    } else if (taskType === "Not Completed") {
      setShowSortButtons(false);  
      setinitialdata(query(collection(db, user.uid), where("completed", "==", false)));
    }
  };

  const [fullopacite, setfullopacite] = useState(false);
  const [initialdata, setinitialdata] = useState(
    query(collection(db, user.uid), where("completed", "==", true))
  );
  
  const [value, loading, error] = useCollection(initialdata);

  if (error) {
    return <Error404 />;
  }
  if (loading) {
    return <ReactLoading type={"spin"} color={"red"} height={20} width={20} />;
  }

  if (value) {
    return (
      <>
        <section className="parent-of-btns flex mtt">
          {/* إخفاء الأزرار بناءً على حالة showSortButtons */}
            <>
              <button
                style={{ opacity: fullopacite ? "1" : "0.3" }}
                onClick={() => {
                  setfullopacite(true);
                  setinitialdata(query(collection(db, user.uid), orderBy("id", "desc")));
                }}
              >
                Newest first
              </button>

              <button
                style={{ opacity: fullopacite ? "0.3" : "1" }}
                onClick={() => {
                  setfullopacite(false);
                  setinitialdata(query(collection(db, user.uid), orderBy("id", "asc")));
                }}
              >
                Oldest first
              </button>
            </>
          

          <select
            id="browsers"
            value={task}
            onChange={(eo) => handleTaskFilterChange(eo.target.value)}
          >
            <option value="All Tasks">All Tasks</option>
            <option value="Completed">Completed</option>
            <option value="Not Completed">Not Completed</option>
          </select>
        </section>

        <section className="flex all-tasks mt">
          {value.docs.length === 0 && <h1>خلصت التاسكات</h1>}

          {value.docs.map((item) => {
            return (
              <Link key={item.id} to={`/edit-task/${item.data().id}`}>
                <article dir="auto" className="one-task">
                  <h2>{item.data().title}</h2>
                  <ul>
                    {item.data().details.slice(0, 2).map((detail, index) => (
                      <li key={index}>{detail}</li>
                    ))}
                  </ul>
                  <p className="time">
                    <Moment date={item.data().id} fromNow />
                  </p>
                </article>
              </Link>
            );
          })}
        </section>
      </>
    );
  }
};

export default Addtask;
