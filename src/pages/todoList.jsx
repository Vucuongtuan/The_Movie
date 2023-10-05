import { useState } from "react";

const data =[
    {
        id:1,
        email:'Cuong',
        pass:'123'
    }
]
function TodoList() {
const [todo,setTodo]=useState(data)
const [email,setEmail] = useState('')
const [pass,setPass] = useState('')

const handelSubmit = () => {
    const index = todo.length
    setTodo([
        ...todo,
{
    id:index + 1,
    email:email,
    pass:pass
}
    ])
    setEmail('')
    setPass('')

}
console.log(todo);
    return ( 
        <>
        <input
         type="text"
         value={email}
         onChange={e=>setEmail(e.target.value)}
         />
        <input
         type="text"
         value={pass}
         onChange={e=>setPass(e.target.value)}
          />
<button onClick={handelSubmit}>add</button>
        </>
     );
}

export default TodoList;