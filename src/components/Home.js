import React, {useEffect, useState, useContext} from 'react'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CreateIcon from '@mui/icons-material/Create';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { NavLink, useNavigate } from 'react-router-dom';
import { addContext} from './context/ContextProvider';
// import { updateContext } from './context/ContextProvider'
// import { delContext } from './context/ContextProvider'

const Home = () => {

    const {uData, setUData} = useContext(addContext);
    // const [upData, setUPData] = useContext(updateContext);
    // const [dltData, setDltData] = useContext(delContext);

    const [getUserData, setUserData] = useState([]);
    console.log('getusedata',getUserData);

    const getData = async(e) => {

        const res = await fetch("http://localhost:4000/api/getAll", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const val = await res.json();
        const data = val['users']
        console.log('users',data);

        if(!data){
            console.log("Something went wrong");
        }
        else{
            setUserData(data);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    const deleteUser = async (id) => {
        const res = await fetch(`http://localhost:4000/api/delete/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const deletedData = await res.json();
        console.log(deletedData);

        if(!deletedData){
            console.log("Something went wrong");
        }else{
            alert(`${deletedData.msg}`);
            // setDltData(deletedData);
            getData();
        }
    }

    return (

        <>
            {
                uData ?
                    <>
                        <div class="alert alert-success alert-dismissible fade show" role="alert">
                            <strong>success</strong>  added succesfully!
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </> : ""
            }

            {/* {
                upData ?
                    <>
                        <div class="alert alert-success alert-dismissible fade show" role="alert">
                            <strong>success</strong>  updated succesfully!
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </> : ""
            }

            {
                dltData ?
                    <>
                        <div class="alert alert-danger alert-dismissible fade show" role="alert">
                            <strong>success</strong>  deleted succesfully!
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </> : ""
            } */}

            <div className="mt-5">
                <div className="container">
                    <div className="add_btn mt-2 mb-2">
                        <NavLink to='/register' className="btn btn-primary">Add data</NavLink>
                    </div>

                    <table class="table">
                        <thead>
                            <tr className='table-dark'>
                                <th scope="col">id</th>
                                <th scope="col">Username</th>
                                <th scope="col">email</th>
                                <th scope="col">role</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                getUserData.map((element, id) => (
                                    <tr key={id}>
                                        <th scope="row">{id + 1}</th>
                                        <td>{element.name}</td>
                                        <td>{element.email}</td>
                                        <td>{element.role}</td>
                                        <td className='d-flex justify-content-between'>
                                            <NavLink to={`view/${element._id}`}>
                                                <button className='btn btn-success'>
                                                    <RemoveRedEyeIcon />
                                                </button>
                                            </NavLink>

                                            <NavLink to={`edit/${element._id}`}>
                                                <button className='btn btn-primary'>
                                                    <CreateIcon />
                                                </button>
                                            </NavLink>

                                            <button
                                                className='btn btn-danger'
                                                onClick={() => deleteUser(element._id)}
                                            >
                                                <DeleteOutlineIcon />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>


                </div>
            </div>
        </>
    )
}

export default Home