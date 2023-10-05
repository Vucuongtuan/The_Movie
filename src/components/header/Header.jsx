import React, { useEffect, useState } from 'react'
import {Container,Navbar,Nav, NavDropdown, Button, Form, Offcanvas } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import classNames from 'classnames'
import styles from './style.module.scss'

const cx = classNames.bind(styles)

export default function Header() {
const [navColor,setNavColor] = useState('transparent')
const [isWidth,setIsWidth] = useState(window.innerWidth)
const location = useLocation()

useEffect(()=>{
  const handleScroll = ()=>{
    if(window.scrollY >= 400){
      setNavColor('rgb(32,33,36)')
    }else{
      setNavColor('transparent')
    }
  }
  window.addEventListener('scroll',handleScroll)
  return () =>{
    window.removeEventListener('scroll',handleScroll)
  }
},[])
  return (
    <>
      <Navbar
      key='md'
      expand='md'
      style={{backgroundColor:`${navColor}`,transition:'1s'}}
      className="w-full color-w fixed top-0 right-0 z-50 "
      >
        <Container className={cx('nav-container')}>
          <Navbar.Brand href="#" style={{color:'#fff'}}>The Movie</Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-md`}
            aria-labelledby={`offcanvasNavbarLabel-expand-md`}
            placement="end"
            className="bg-white"
          >
            <Offcanvas.Header closeButton className='bg-[rgb(32,33,36)] text-white ' >
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md`}>
                Offcanvas
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body style={isWidth <= 768 ? {backgroundColor:'rgb(32,33,36)'} : {backgroundColor:'transparent'}}>
              <Nav className="justify-content-end flex-grow-1 pe-3">
              <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto" activeKey={location.pathname}>
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/contact">Quản lý</Nav.Link>
            </Nav>
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2 bg-transparent placeholder-white border-1 border-b-white text-white"
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form>
              <NavDropdown title="System" id="basic-nav-dropdown" className="float-right">
                  <NavDropdown.Item as={Link} to="/Login">Login</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/Signup">
                    Signup
                  </NavDropdown.Item>
                 
                </NavDropdown>
          </Navbar.Collapse>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
         </>
  )
}

