import { Navigate } from "react-router-dom";

function Protect(props){
    let user=localStorage.getItem("myflix_user")

    return user!==null?props.children:<Navigate to="/login"/>
}

export default Protect;