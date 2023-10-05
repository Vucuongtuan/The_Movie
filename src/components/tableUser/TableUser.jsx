import { Button, Table } from "react-bootstrap";
import { useCallback,useEffect, useState } from "react";
import {getDataUser } from "../services/UserService";
import ModalAdd from "../Modal/ModalAdd";
import ModalDelete from "../Modal/ModalDelete";
import ModalUpdate from "../Modal/ModalUpdata";
import SwapVertIcon from '@mui/icons-material/SwapVert';
import { debounce } from "lodash";

function TableUser({showModal,handelCloseModal}) {  
const [listUser,setListUser] = useState([])
const [showAddModal,setShowAddModal] = useState(false)
const [idData,setIdData] = useState(0)
const [showDelete,setShowDelete] = useState(false)
const [getData,setGetData] = useState({})
const [showUpdate,setShowUpdate] = useState(false)
const dk = showDelete === false
const dkup = showUpdate === false
    useEffect(() => {
        ///call api
       DataApi()
    },[handelCloseModal,dk,dkup])
const DataApi = useCallback(() => {
  getDataUser().then((users)=>{
    setListUser(users);
  
  })
},[])
const handleSearch = debounce((e) => {
  console.log('asdasasda');
let value = e.target.value
if(value){
  const search = listUser.filter((item)=> item.email.includes(value));
  setListUser(search)
} else{
  DataApi()
}
},[1000])
console.log(listUser);
const data = [
  {
    id:1,
    name:'a',
  }, {
    id:2,
    name:'d',
  }, {
    id:3,
    name:'fd',
  }, {
    id:4,
    name:'g',
  }
]
// const da = data.length - 1
// console.log(data[da]);
const handleShowDelete = ()=> setShowDelete(true)
const handleCloseDelete = ()=> setShowDelete(false)
const handleShowUpdate =()=> setShowUpdate(!showUpdate)
    return ( 
< >
<input type="text" className="h-[30px] w-1/4" placeholder="Search ....."
onChange={(e)=>handleSearch(e)} />
    <Table striped bordered hover variant="dark">

      <thead>
        <tr>
          <th>
            id
            <SwapVertIcon className='cursor-pointer mr-1 float-right'/>
            </th>
          <th>Name</th>
          <th>Email</th>
          <th>Password</th>
          <th>Avatar</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
  
        {listUser === null ? (
          <tr>
          <td colSpan="5">Không có dữ liệu</td>
          </tr>
        ) : (
          listUser.map((user, index)=> (
        <tr key={index}>
        <td>{user.id}</td>
          <td>{ user.name}</td>
        <td>{user.email}</td>
        <td>{user.password}</td>
          <td><img src={user.image} className='w-[150px] h-[150px]' alt="" /></td>
          <td> <Button variant="danger"
          onClick={()=>{
            setGetData({
            id:user.id,
            name:user.name,
            email:user.email,
            password:user.password,
            image:user.image
          })
          handleShowDelete()
        }}
          >
            Delete
            </Button>
          {'  '}
          <Button variant="primary"
           onClick={()=>{
            setGetData({
            id:user.id,
            name:user.name,
            email:user.email,
            password:user.password,
            image:user.image
          })
          handleShowUpdate()
        }
        }


          >
             Update
             </Button>
          </td>
        </tr>
        ))
        )}
      
      </tbody>
    </Table>
    <ModalAdd
    show={showModal}
    close={handelCloseModal}
    idData={idData}
    />
    <ModalDelete
     showDelete={showDelete}
     close={handleCloseDelete}
    //  handleCloseDelete={handleCloseDelete}
     getData={getData}
    />
      <ModalUpdate
     showUpdate={showUpdate}
     modal={handleShowUpdate}
     getData={getData}
    />
    </>
     );
}

export default TableUser;