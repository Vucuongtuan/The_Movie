import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Modal, Row, Table } from "react-bootstrap";
import { updateDataUser } from "../services/UserService";
import { toast } from "react-toastify";


function ModalUpdate({showUpdate,modal,getData}) {
  const [image,setImage] = useState('')
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassWord] = useState('')
    const updateUser = async (id) => {
        updateDataUser(id,name,email,password,image).then(()=>{
            modal()
         toast.success('Sửa người dùng thành công !!!')
        })
 
        .catch(err =>{
         toast.warning('Sửa người dùng thất bại !!!',err)
 
        })
     }
     useEffect(()=>{
      setEmail(getData.email || '')
      setImage(getData.image || 'https://st3.depositphotos.com/23594922/31822/v/450/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg')
      setName(getData.name || '' )
setPassWord(getData.password || '')
     },[getData])
    return ( 
        <Modal show={showUpdate} size="lg" onHide={modal}>
        <Modal.Header closeButton>
          <Modal.Title>Xác thực sửa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Container>
      <Row>
        <Col xs={12} md={6}>
          <div className="left-column">
            <label className="fs-6 fw-bold">ID</label>
            <Form.Control
            disabled={true}
            value={getData.id}
            />
            <label className="fs-6 fw-bold">Name</label>
            <Form.Control
            onChange={(e)=>setName(e.target.value)}

            value={name}
            />
            <label className="fs-6 fw-bold">Email</label>
            <Form.Control
            onChange={(e)=>setEmail(e.target.value)}
            value={email}
            />
              <label className="fs-6 fw-bold">Password</label>
            <Form.Control
            onChange={(e)=>setPassWord(e.target.value)}
            value={password}
            />
          </div>
        </Col>
        <Col xs={12} md={6}>
          <div className="right-column">
          <label className="fs-6 fw-bold">Image</label>
         <p>
            <span>Url:</span> 
            <Form.Control
            value={image}
            onChange={(e)=>setImage(e.target.value)}
            />
          
            </p>
         <img src={image} alt="" />
          </div>
        </Col>
      </Row>
    </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={modal}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>updateUser(getData.id)}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
     );
}

export default ModalUpdate;