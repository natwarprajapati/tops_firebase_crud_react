import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from './firebase-config'
import { toast } from 'react-toastify'

function ListView() {
    const [users, setUsers] = useState([])
    const usersCollectionRef = collection(db,"usersdetails")

    useEffect(()=>{
        getUsers();
    },[])

    const getUsers = async ()=>{
        const data = await  getDocs(usersCollectionRef);
        console.log(data);
        setUsers( data.docs.map((doc)=>({...doc.data(),id:doc.id}))  )
    }

        //  for add user
       const [addBtn,setAddBtn]= useState(false)

        const [newUser, setNewUser] = useState({
            name:'',
            contact:"",
            email:"",
            country:""
        })

        const handelOnChange = (e)=>{
            setNewUser({
                ...newUser, 
                [e.target.name]: e.target.value
            },
        )}

        const createUser = async (e)=>{
            e.preventDefault()
            const {name, contact , email , country} = newUser
            
            if (!name.trim()) {
                toast.error('Please Enter Name')
                return false
            } 
            
            else if(!email.trim()){
                toast.error('Please Enter Email')
                return false
            }
            else if(!contact.trim()){
                toast.error('Please Enter Contact Number')
                return false
            }
                else if(!country.trim()){
                    toast.error('Please Enter Country')
                    return false
                }

                await addDoc(usersCollectionRef, newUser);
            getUsers()
            setAddBtn(false)
            toast.success("User Add SuccessFully")
      }


   //   for update user 
 
    const [updatedUser, setUpdatedUser] = useState(null)

    const clickOnEdit=(data)=>{
        setUpdatedUser(data);
        console.log(data);
    };

    const handleEdit =(e)=>{
        setUpdatedUser({
            ...updatedUser,
            [e.target.name]:e.target.value
        })
    }

    const handleUpdate = async (e) =>{
        e.preventDefault()
        const {name, contact , email ,country} = updatedUser
            
        if (!name.trim()) {
            toast.error('Please Enter Name')
            return false
        } 
        
        else if(!email.trim()){
            toast.error('Please Enter Email')
            return false
        }
        else if(!contact.trim()){
            toast.error('Please Enter Contact Number')
            return false
        }
            else if(!country.trim()){
                toast.error('Please Enter Country')
                return false
            }

        const userDoc = doc(db, "usersdetails", updatedUser.id)
        await updateDoc(userDoc, updatedUser);
        setUpdatedUser(undefined)
        getUsers()

        toast.success("Updated SuccessFully")

        // setUpdatedUser({
        //     name:'',
        //     contact:"",
        //     email:"",
        //     country:""
        // })
      }

    //  for delete user

    const handleDelete = async (id)=>{
        const userDoc =doc(db, "usersdetails", id)
        await deleteDoc(userDoc)
        getUsers();
    }
    
    //  for view User

    const [viewData , setViewData] = useState(null)

    const handleView = (user)=>{
        setViewData(user);
    }

  
  return (
    <div className='container'>
        
      <div className="container">
        <button
          className="btn btn-info"
          onClick={() => setAddBtn(true)}
          style={{ display: "block", margin: " 5px auto" }}
        >
          Add User
        </button>
        <table className="table table-primary">
          <thead>
            <tr>
              <th scope="col">User Name</th>
              <th scope="col">User Email</th>
              <th scope="col">User contact</th>
              <th scope="col">User Country</th>
              {/* <th scope="col">User image</th> */}
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((data) => (
              <tr key={data.id}>
                <td> {data.name}</td>
                <td> {data.email}</td>
                <td> {data.contact}</td>
                <td> {data.country}</td>
                <td>
                  <button
                    onClick={() => clickOnEdit(data)}
                    className="btn btn-primary mx-1"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(data.id)}
                    className="btn btn-danger mx-1"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleView(data)}
                    className="btn btn-success mx-1"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {
        // for Add User

        addBtn && (
          <form  onSubmit={(e) => createUser(e)}>
            <h2 className='text-info'>Add New User Details</h2>
            <div className="form-group">
              <label htmlFor="name">First Name</label>
              <input
                type="text"
                name="name"
                id="name"
                onChange={(e) => handelOnChange(e)}
                className="form-control"
                placeholder="Enter Name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={(e) => handelOnChange(e)}
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="contact">Contact</label>
              <input
                type="number"
                name="contact"
                id="contact"
                onChange={(e) => handelOnChange(e)}
                className="form-control"
                placeholder="Enter Contact Number"
              />
            </div>
            <div className="form-group">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                name="country"
                id="country"
                onChange={(e) => handelOnChange(e)}
                className="form-control"
                placeholder="Country"
              />
            </div>

            <button type="submit" className="btn btn-primary mt-2">
              Add User Data
            </button>
            <button
              onClick={() => setAddBtn(false)}
              className="btn btn-secondary mt-2 ms-3 "
            >
              cancel
            </button>
          </form>
        )
      }

      {updatedUser && (
        <form className="container" onSubmit={handleUpdate}>
          <div className="form-group">
            <label htmlFor="uname">First Name</label>
            <input
              type="text"
              name="name"
              id="uname"
              value={updatedUser.name}
              onChange={(e) => handleEdit(e)}
              className="form-control"
              placeholder="Enter Name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="uemail">Email address</label>
            <input
              type="email"
              name="email"
              id="email"
              value={updatedUser.email}
              onChange={(e) => handleEdit(e)}
              className="form-control"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="ucontact">Contact</label>
            <input
              type="tel"
              name="contact"
              id="ucontact"
              value={updatedUser.contact}
              onChange={(e) => handleEdit(e)}
              className="form-control"
              placeholder="Enter Contact Number"
            />
          </div>
          <div className="form-group">
            <label htmlFor="ucountry">Country</label>
            <input
              type="text"
              name="country"
              id="ucountry"
              value={updatedUser.country}
              onChange={(e) => handleEdit(e)}
              className="form-control"
              placeholder="Country"
            />
          </div>
          <button type="submit" className="btn btn-primary mt-2">
            Update
          </button>
          <button onClick={()=>setUpdatedUser(undefined)} className="btn btn-secondary mt-2 ms-4">
            Cancel
          </button>
        </form>
      )}

      {/* for view data */}
      <table className="table container">

        {

       viewData &&  (

    <>
    <thead >
    <tr>
      <th scope="row">Id</th>
      <th scope="col">{viewData.id}</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">First Name</th>
      <th scope="col">{viewData.name}</th>
    </tr>
    <tr>
      <th scope="row">Email</th>
      <th scope="col">{viewData.email}</th>
    </tr>
    <tr>
      <th scope="row">Contact Number</th>
      <th scope="col">{viewData.contact}</th>
    </tr>
    <tr>
      <th scope="row">Country</th>
      <th scope="col">{viewData.country}</th>
    </tr>
  </tbody>
  <button className='btn btn-secondary' onClick={()=>setViewData(null)}>cancel</button>
  </>
  )
}
 
</table>
    </div>
  );
}

export default ListView