import { db } from '../../firebase/config';
import { doc, updateDoc } from 'firebase/firestore';
import { useRef, useState } from 'react';
import { useDocument } from 'react-firebase-hooks/firestore';
import ReactLoading from 'react-loading';

const Title = ({user,id}) => {

  const [value, loading, error] = useDocument(doc(db, user.uid, id));
  const [title, settitle] = useState("");
  const focustitle=useRef(null);
if (loading) {
  return <main><ReactLoading
                    className="loading"
                      type={"spin"}
                      color={"red"}
                      height={20}
                      width={20}
                    /></main>
}
if (error) {
  return <main>error:{error.message}</main>
}


  if (value) {
    
    return (
      
      
          <section className="title center">
                <h1>
                  <input
                  style={{textDecoration:value.data().completed?"line-through":"none"}}
                  ref={focustitle}
                  onChange={async(eo) => {
                    settitle(eo.target.value)
                    await updateDoc(doc(db, user.uid, id), {
                      title: eo.target.value,
                    });
                  }
                  }
                    value={value.data().title}
                    className="title-input center"
                    type="text"
                  />
                  <i onClick={() => {
                    focustitle.current.focus()
                  }
                  } className="fa-regular fa-pen-to-square"></i>
                </h1>
              </section>
      
    );
  }

}

export default Title;
