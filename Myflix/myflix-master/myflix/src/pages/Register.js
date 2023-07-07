import { Link, useNavigate } from 'react-router-dom'
import { useState } from "react";

function Register() {

    let [messageVisible, setMesssageVisible] = useState(false);
    let [message, setMesssage] = useState({ text: "I am Aman", typeClass: "success" });


    let user = {};
    const navigate = useNavigate();
    function readValue(property, value) {
        user[property] = value;
        // console.log(user);
    }

    function register() {
        fetch("https://movieflixapi01.herokuapp.com/users", {
            method: "POST", headers: {
                "Content-Type": "application/json",

            },
            body: JSON.stringify(user)
        })
            .then((response) => response.json())
            .then((data) => {
                setMesssageVisible(true);
                if (data.success === true) {
                    // console.log(data);
                    setMesssage({ text: data.message, typeClass: "success" })
                    navigate("/login")
                }
                else {
                    setMesssage({ text: data.message, typeClass: "error" })
                    console.log(data);
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
    return (
        <>{
            messageVisible === true ? (
                <div className={"custom-toast " + message.typeClass}>
                    {message.text}
                </div>
            )
                : null
        }
            <div className="cred-container" >
                <div className="form-container " >
                    <h2>Sign Up Here :) </h2>
                    <input type="text" placeholder="Enter Name" className="form-control" onChange={(event) => {
                        readValue("name", event.target.value)
                    }} />

                    <input type="text" placeholder="Enter Username" className="form-control" onChange={(event) => {
                        readValue("username", event.target.value)
                    }} />

                    <input type="password" placeholder="Enter Password" className="form-control" onChange={(event) => {
                        readValue("password", event.target.value)
                    }} />

                    <input type="email" placeholder="Enter Email" className="form-control" onChange={(event) => {
                        readValue("email", event.target.value)
                    }} />

                    <input type="number" placeholder="Enter Contact No" className="form-control" onChange={(event) => {
                        readValue("contact", event.target.value)
                    }} />

                    <input type="text" placeholder="Enter City" className="form-control" onChange={(event) => {
                        readValue("city", event.target.value)
                    }} />

                    <button className="btn btn-primary" onClick={register} >Sign Up</button>
                    <Link to="/login" >

                        <button className="btn btn-primary" >Already a customer</button>
                    </Link>

                </div>
            </div>
        </>
    )
}

export default Register;