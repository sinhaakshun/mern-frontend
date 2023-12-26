import React, { useEffect, useState } from 'react'
import CreateIcon from '@mui/icons-material/Create';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import WorkIcon from '@mui/icons-material/Work';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useParams, NavLink, useNavigate } from 'react-router-dom';


const Detail = () => {

    const {id} = useParams("");
    const [getUserData, setUserData] = useState([]);
    console.log('getusedata',getUserData);

    const navigate = useNavigate();

    const getData = async() => {

        const res = await fetch(`http://localhost:4000/api/getById/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
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
    })

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
            navigate('/')
        }
    }

  return (
    <div className="container mt-3">
            <h1 style={{ fontWeight: 400 }}>Welcome Harsh Pathak</h1>

            <Card sx={{ maxWidth: 600 }}>
                <CardContent>
                    <div className="add_btn">
                      <NavLink to={`/edit/${getUserData._id}`}>
                          <button className="btn btn-primary mx-2"><CreateIcon />
                          </button>
                      </NavLink>
                        <button className="btn btn-danger" onClick={() => deleteUser(getUserData._id)}><DeleteOutlineIcon /></button>
                    </div>
                    <div className="row">
                        <div className="left_view col-lg-6 col-md-6 col-12">
                            <img src='/profile.jpg' style={{ width: 50 }} alt="profile" />
                            <h3 className="mt-3">Name: <span >{getUserData.name}</span></h3>
                            <p className="mt-3"><MailOutlineIcon />Email: <span>{getUserData.email}</span></p>
                            <p className="mt-3"><WorkIcon />Role: <span>{getUserData.role}</span></p>
                        </div>
                        <div className="right_view  col-lg-6 col-md-6 col-12">

                            <p className="mt-3">Description: <span>{getUserData.desc}</span></p>
                        </div>
                    </div>

                </CardContent>
            </Card>
        </div>
  )
}

export default Detail