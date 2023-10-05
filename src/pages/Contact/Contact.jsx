import { Button, Container } from "react-bootstrap";
import TableUser from "../../components/tableUser/TableUser";
import {   useState } from "react";
import ModalAdd from "../../components/Modal/ModalAdd";
import { DataProvider } from "../../components/Context/Context";

function Contact() {
  const [showModal,setShowModal] = useState(false);
  const [idUser,setIdUser] = useState(0);
  const [newUser,setNewUser] = useState({})

const handelShowModal = ()=>{
  setShowModal(true);
}
const handelCloseModal = ()=>{
  setShowModal(false);
}
const handelOnId = (id)=>{
  setIdUser(id)

}

const handelAddUser=(data)=>{
 
  setNewUser(data)
  console.log(newUser);
}


  return ( 
    <>
    <Container>
      <div>
      <h3 style={{fontSize:'1.2em'}}>List User :</h3>
      <Button 
      variant="success"
      style={{float:"right",marginBottom:10}}
      onClick={handelShowModal}
       >
        Add
        </Button>
      </div>
  
    <TableUser
    showModal={showModal}
    onId={handelOnId}
    handelCloseModal={handelCloseModal}
    handelAddUser={handelAddUser}  />
    </Container>
    </>
   );
}

export default Contact;
// import React from 'react'
// import { getDatabase, ref, child, get } from "firebase/database";
// import {database} from '../../firebase'
// import { useEffect, useState } from 'react';


// function Contact() {
//     const [state,setState] = useState([])
//     const data = database
//     useEffect(() =>{
//       const dbRef = ref(database);
//       get(child(dbRef, `users`)).then((snapshot) => {
        
//         setState(snapshot.val())
//         console.log(snapshot.val());
        
//       }).catch((error) => {
//         console.error(error);
//       });
//     },[data])
//     return ( 
//         <>
//           {/* {state.map((item) => (
//             <li key={item.id}>{item.id} . {item.name}</li>
//         ) )} */}
//         </>
//      );
// }

// export default Contact;