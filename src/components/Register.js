import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { addContext } from './context/ContextProvider';

const Register = () => {

    const {uData, setUData} = useContext(addContext);

    const navigate = useNavigate();

    const [inpVal, setInp] = useState({
        name: '',
        email: '',
        password: '',
        role: '',
        desc: ""
    })

    const setData = (e) => {
        console.log(e.target.value);
        const {name, value} = e.target
        setInp((preVal) => {
            return {
                ...preVal,
                [name]: value
            }
        })

    }

    const addData = async(e) => {

        e.preventDefault();
        const {name, email, password, role, desc} = inpVal;

        const res = await fetch("http://localhost:4000/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, password, role, desc
            })
        });

        const data = await res.json();
        console.log(data.msg);

        if(!data){
            alert("Something went wrong");
        }
        else{
            alert(`${data.msg}`);
            setUData(data)
            navigate('/')
        }
    }

  return (
    <div className='container'>
        <NavLink to="/">Home
        </NavLink>
          <form className='mt-4'>
            <div className='row'>
              <div class="mb-3 col-lg-6 col-md-6 col-12">
                  <label for="exampleInputEmail1" class="form-label">Name</label>
                  <input type="text"
                  onChange={setData} value={inpVal.name} 
                   name='name' class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
              </div>
              <div class="mb-3 col-lg-6 col-md-6 col-12">
                  <label for="exampleInputPassword1" class="form-label">Email</label>
                  <input type="email"
                  onChange={setData} value={inpVal.email}
                   name='email' class="form-control" id="exampleInputPassword1"/>
              </div>
              <div class="mb-3 col-lg-6 col-md-6 col-12">
                  <label for="exampleInputPassword1" class="form-label">Password</label>
                  <input type="password"
                  onChange={setData} value={inpVal.password}
                   name='password' class="form-control" id="exampleInputPassword1"/>
              </div>
              <div class="mb-3 col-lg-6 col-md-6 col-12">
                  <label for="exampleInputPassword1" class="form-label">Role</label>
                  <input type="text"
                  onChange={setData} value={inpVal.role}
                   name='role' class="form-control" id="exampleInputPassword1"/>
              </div>
              <div class="mb-3 col-lg-12 col-md-12 col-12">
                        <label for="exampleInputPassword1" class="form-label">Description</label>
                        <textarea name="desc" value={inpVal.desc} onChange={setData} className="form-control" id="" cols="30" rows="5"></textarea>
                    </div>
              <button type="submit"
              onClick={addData}
               class="btn btn-primary">Submit</button>
              </div>
          </form>
    </div>
  )
}

export default Register