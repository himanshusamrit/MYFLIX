import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import {  useState } from "react";


function Login() {
    let [messageVisible, setMesssageVisible] = useState(false);
    let [message, setMesssage] = useState({ text: "I am Aman", typeClass: "success" });

    let userCred = {};
    const navigate = useNavigate();

    function readValue(property, value) {
        userCred[property] = value;
        // console.log(userCred);
    }

    function login() {
        fetch("https://movieflixapi01.herokuapp.com/users/login", {
            method: "POST", headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userCred)
        })
            .then((response) => response.json())
            .then((data) => {
                setMesssageVisible(true);
                if (data.success === true) {

                    // console.log(data);
                    setMesssage({ text: data.message, typeClass: "success" })
                    localStorage.setItem("myflix-user", JSON.stringify(data))
                    navigate("/homepage");

                }
                else {
                    setMesssage({ text: data.message, typeClass: "error" })
                    console.log(data);
                    console.log(userCred);

                }
            })
            .catch((err) => {
                console.log(err)
            })
            setTimeout(() => {
                setMesssageVisible(false);
            }, 3000)
    }
    return (
        <>
            {/* toastMessage */}

            {
                messageVisible === true ? (
                    <div className={"custom-toast " + message.typeClass}>
                        {message.text}
                    </div>
                )
                    : null
            }

            <div className="cred-container" >
                <div className="form-container " >

                    <h2>Login Here :) </h2>


                    <input type="text" placeholder="Enter Username" className="form-control" id='username' onChange={(event) => {
                        readValue("username", event.target.value)
                    }} />


                    <input type="password" placeholder="Enter Password" className="form-control" id='password' onChange={(event) => {
                        readValue("password", event.target.value)
                    }} />



                    <button className="btn btn-primary" onClick={login} >Login</button>
                    <Link to="/register" >
                        <button className="btn btn-primary"> New Registration </button>
                    </Link>

                </div>
            </div>

        </>
    )
}
export default Login;