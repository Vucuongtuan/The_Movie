import { memo, useState } from "react";
import { Button, Col, Container, Form, Modal, Row, Table } from "react-bootstrap";
import { ApiDeleteUser, deleteDataUser } from "../services/UserService";
import { ToastContainer, toast } from 'react-toastify';


function ModalDelete({showDelete,close,getData}) {
const [getId,setGetId] = useState()


    const deleteUser = async (id) => {
       deleteDataUser(id).then(()=>{
        close()
        toast.success('Xóa người dùng thành công !!!')
       })

       .catch(err =>{
        toast.warning('Xóa người dùng thất bại !!!',err)

       })
    }
    return ( 
        <Modal show={showDelete} size="lg" onHide={close}>
     <Modal.Header closeButton>
          <Modal.Title>Xác thực xóa</Modal.Title>
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

            value={getData.name}
            />
            <label className="fs-6 fw-bold">Email</label>
            <Form.Control
            value={getData.email}
            />
              <label className="fs-6 fw-bold">Password</label>
            <Form.Control
            value={getData.password}
            />
          </div>
        </Col>
        <Col xs={12} md={6}>
          <div className="right-column">
          <label className="fs-6 fw-bold">Image</label>
         <p>
            <span>Url:</span> 
            <Form.Control
            value={getData.image}
            />
          
            </p>
         <img src={getData.image} alt="" />
          </div>
        </Col>
      </Row>
    </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={close}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>deleteUser(getData.id)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
     );
}

export default memo(ModalDelete);