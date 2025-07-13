import Loading from "comp/Loading";
import { db } from "../../firebase/config";
import { doc } from "firebase/firestore";
import React, { useState } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { arrayRemove, updateDoc } from "firebase/firestore";
import { arrayUnion } from "firebase/firestore";
import Moment from "react-moment";
import { Form } from "react-router-dom";

const Subtask = ({ user, id }) => {
  const [showadd, setshowadd] = useState(false);
  
  const [value, loading, error] = useDocument(doc(db, user.uid, id));
  const [detailsarray, setdetailsarray] = useState("");
  if (value) {
    return (
      <section className="sub-task mtt">
        <div className="parent-time">
          <p className="time">
            <Moment fromNow>{value.data().id}</Moment>
          </p>
          <div>
            <input
              checked={value.data().completed}
              onChange={async (eo) => {
                if (eo.target.checked) {
                  await updateDoc(doc(db, user.uid, id), {
                    completed: true,
                  });
                } else {
                  await updateDoc(doc(db, user.uid, id), {
                    completed: false,
                  });
                }
              }}
              id="checkbox"
              type="checkbox"
            />
            <label htmlFor="checkbox">Completed </label>
          </div>
        </div>

        <ul>
          {value.data().details.map((item) => {
            return (
              <li className="card-task flex">
                <p> {item} </p>
                <i
                  onClick={async () => {
                    await updateDoc(doc(db, user.uid, id), {
                      details: arrayRemove(item),
                    });
                  }}
                  className="fa-solid fa-trash"
                ></i>
              </li>
            );
          })}
          {showadd && (
            <Form>
            <li
              style={{
                padding: "5px",
                alignItems: "baseline",
                transition: "all 3s",
              }}
              className="card-task flex add-new"
            >
              <input
                value={detailsarray}
                onChange={(eo) => {
                  setdetailsarray(eo.target.value);
                }}
                style={{ marginTop: "5px", marginLeft: "8px" }}
                type="text"
              />
              <div style={{ marginTop: "5px", marginLeft: "8px",display:"flex" }}>
                <button
                  onClick={async () => {
                    setdetailsarray("");

                    await updateDoc(doc(db, user.uid, id), {
                      details: arrayUnion(detailsarray),
                    });
                  }}
                  style={{ marginRight: "7px" }}
                  className="add-more-btn"
                >
                  Add
                </button>
                <button
                  onClick={() => {
                    setshowadd(false);
                  }}
                  className="add-more-btn"
                >
                  Cancel
                </button>
              </div>
            </li>
            </Form>
          )}
        </ul>

        <section className="center mtt">
          <button
            onClick={() => {
              setshowadd(true);
            }}
            className="add-more-btn"
          >
            Add more <i className="fa-solid fa-plus"></i>
          </button>
        </section>
      </section>
    );
  }
};

export default Subtask;
