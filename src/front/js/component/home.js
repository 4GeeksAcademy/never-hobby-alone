import React from "react";
import Card from "./card";
import Navbar from "./navbar";

//include images into your bundle
// import rigoImage from "../../img/rigo-baby.jpg";
import Jumbotron from "./jumbotron";
import Footer from "./footer";


//create your first component
const Home = () => {
	return (
		<div className="container">
			<Navbar />
			<Jumbotron/>
			<p class="fs-1">Don't forget to see the events!</p>
			<div className="row m-1">
				<div className="col-sm-12 col-md-6 col-lg-4  ">
					<Card/>
				</div>
				<div className="col-sm-12 col-md-6 col-lg-4  ">
					<Card/>
				</div>
				<div className="col-sm-12 col-md-6 col-lg-4  ">
					<Card/>
				</div>									
			</div>
			<Footer/>
			
		</div>
	);
};

export default Home;