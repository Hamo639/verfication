import { db } from '../../firebase/config';
import { deleteDoc, doc } from 'firebase/firestore';
import React from 'react';
import { useDocument } from 'react-firebase-hooks/firestore';
import { useNavigate } from 'react-router-dom';

const Btnsection = ({user,id,setshowaddtask}) => {
  const navigate =useNavigate()
    const [value, loading, error] = useDocument(doc(db, user.uid, id));
  
  return (
    <div>
        <section className="center mtt">
            
    
              <div>
                <button
                onClick={async(eo) => {
                  setshowaddtask("true")
                  await deleteDoc(doc(db, user.uid, id));
                  navigate("/",{replace:true})

                }
                } className="delete">Delete task</button>
              </div>
            </section>
    </div>
  );
}

export default Btnsection;
