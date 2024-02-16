import React from "react";

// 2. Crear el componente JSX
function Jumbotron (){
    return(
        <div className="jumbotron m-3 px-3 bg-secondary bg-opacity-25 text-start rounded py-5">
            <h1 className="display-4">We are looking for you!</h1>
            <p className="lead">You have the talent, we have the hub!</p>
            <a className="btn btn-purple btn-lg" href="#" role="button">Join events</a>
        </div>
    );
}

export default Jumbotron 


// style={{paddingTop: "50px", paddingBottom: "50px"}}