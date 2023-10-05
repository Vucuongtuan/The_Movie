import { memo,useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { ApiAddUser, postDataUser } from '../services/UserService';
import { ToastContainer, toast } from 'react-toastify';

function ModalAdd({show,close,handleNewData,idData}) {
   const [name,setName] = useState('')
   const [email,setEmail] = useState('')
   const [image,setImage] = useState('')
   const [password,setPassword] = useState('')
   const checkInput = useRef()
   const checkSubmit = () => {
return  name.trim() !== '' && email.trim() !== '';
  }
  const handleAddUser = async () =>{
    try{
  
      postDataUser(name,email,password,image).then(()=>{
        close()
        toast.success('Thêm người dùng thành công !!!')
      })
      setName('')
      setEmail('')
      setImage('')
      setPassword('')
     }
     catch {
      toast.warning('Thêm thất bại , Server không có kết nối thử lại sau !!! ')
     }
     
   }
 
    return (
    <>
        <Modal show={show} onHide={close} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        < >
        <Form.Group controlId="formGridEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control
           type="text"
           value={name}
         ref={checkInput}
            placeholder="Enter Name"
            onChange={(e)=>setName(e.target.value)}
            />
        </Form.Group>
        <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Nhập Email</Form.Label>
        <Form.Control
         type="text"
         value={email}
         ref={checkInput}
         onChange={(e)=>setEmail(e.target.value)}
         placeholder="Enter email"/>
      </Form.Group>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Nhập PassWord</Form.Label>
        <Form.Control
         type="text"
         value={password}
         ref={checkInput}
         onChange={(e)=>setPassword(e.target.value)}
         placeholder="Enter email"/>
      </Form.Group>
      <Form.Label> URL Image</Form.Label>

      <Form.Control
         type="text"
         value={image}
         ref={checkInput}
         onChange={(e)=>setImage(e.target.value)}
         placeholder="Enter URL Image"/>
    </>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={close}>
            Close
          </Button>
          <Button variant="primary" disabled={!checkSubmit()}   type="submit" onClick={()=>{
handleAddUser()

          }}>
      Submit
      </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer
position="top-right"
autoClose={3000}
hideProgressBar={false}
newestOnTop
closeOnClick
rtl={false}
pauseOnFocusLoss={false}
draggable
pauseOnHover={false}
theme="light"
/>

   </>
    );
}
export default memo(ModalAdd);