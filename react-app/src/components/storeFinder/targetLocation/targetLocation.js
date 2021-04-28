import React from "react";
import { Container, Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import './targetLocation.css'
import storeJson from '../locations/storeJson.js'
import {BiLeftArrow} from 'react-icons/bi'
import {FaPhoneAlt, FaMapMarkerAlt} from 'react-icons/fa'
import DayCard from './dayCard/dayCard'
import {Link} from 'react-router-dom'

// Component that runs when a store has been selected

// Selects the target store's information from the json file
function TargetLocation(props){
    const filteredStore = storeJson.filter(store => store.id === props.id)

// function to return google map directions to the store
function getDirections(){
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${filteredStore[0].escapedUrlAddress}`, "_blank")
}

// function to determine how many buttons to draw on the top of the page
// Based on store type and always includes directions
function determineButtonNumber(){
    if (filteredStore[0].type.Rec && filteredStore[0].type.Med){
        return(
            <div>
                <Link to={`/menu/${filteredStore[0].type.Rec}`}>
                    <button onClick={()=>{chooseMenu(filteredStore[0].type.Rec)}}className='tri button'>SHOP REC</button>
                </Link>
                <Link to={`/menu/${filteredStore[0].type.Med}`}>
                    <button onClick={()=>{chooseMenu(filteredStore[0].type.Med)}}className='tri button'>SHOP MED</button>
                </Link>
                <button onClick={()=>{getDirections()}}className='tri button'>DIRECTIONS </button>
            </div> 
        )
    } 
    if (filteredStore[0].type.Rec && !filteredStore[0].type.Med){
        return(
            <div>
                <Link to={`/menu/${filteredStore[0].type.Rec}`}>
                <button onClick={()=>{chooseMenu(filteredStore[0].type.Rec)}} className='duo button'>SHOP REC</button>
                </Link>
                <button onClick={()=>{getDirections()}} className='duo button'>DIRECTIONS</button>       
            </div> 
        )
    }
    if (!filteredStore[0].type.Rec && filteredStore[0].type.Med){
        return(
            <div>
                <Link to={`/menu/${filteredStore[0].type.Med}`}>
                    <button onClick={()=>{chooseMenu(filteredStore[0].type.Med)}}className='duo button'>SHOP MED</button>
                </Link>
                <button onClick={()=>{getDirections()}} className='duo button'>DIRECTIONS</button>         
            </div> 
        )
    }
    if (!filteredStore[0].type.Rec && !filteredStore[0].type.Med && filteredStore[0].type.Consumption){
        return(
            <div>
                <button onClick={()=>{consumptionMenu()}}className='tri button'>VISIT US</button>
                <button onClick={()=>{getDirections()}} className='tri button'>DIRECTIONS</button>    
                <button onClick={()=>{shopCBD()}} className='tri button'>SHOP CBD</button>      
            </div> 
        )
    }
    else{
    }
}
// Resets store id in previous state to false
function goBack(){
    props.callBack({id:''})
}
// sends back state information to app.js to open the menu component
function chooseMenu(id){
    props.menuChosen({menu:id})
    window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
}
// Coffee Joint only specific external window opening
const consumptionMenu = ()=>{
    window.open(
        "https://thecoffeejointco.com/",);
}
const shopCBD = ()=>{
    window.open(
        "https://thecoffeejointcbd.com/",);
}

// Returns standardized jsx for the selected store
    return(
        <div>
            <Container className='containerPadding stickyContainer'>
                <Row>
                    <div className='backDiv'><button onClick={()=>goBack()} className='backButton'><BiLeftArrow size={28}/></button></div>
                    <img className='logo' src={`${process.env.PUBLIC_URL}${filteredStore[0].logoPinch}`} alt=''></img>
                </Row>
                <Row>
                   <div className='buttonContainer'>{determineButtonNumber()}</div>
                </Row>
            </Container>
            <Container className='containerPadding'>
                <div className='storeLocation'>
                    <img className='storeImage' src={`${process.env.PUBLIC_URL}${filteredStore[0].exteriorStore}`} alt=''></img>
                </div>
                <div className='phoneAndAddress'>
                    <div className='innerPhoneAndAddress'>
                        <div className='locationIcon'><FaMapMarkerAlt size={56}></FaMapMarkerAlt></div>
                        <h4 className='hoverAddress' onClick={()=>{getDirections()}}>{filteredStore[0].address1}</h4>
                        <h4 className='hoverAddress' onClick={()=>{getDirections()}}>{filteredStore[0].address2}</h4>
                        <div className='phoneIcon'><FaPhoneAlt size={56}></FaPhoneAlt></div>
                        <h4 className='phoneNumber'><a className='phoneLink' href={filteredStore[0].phoneLink}>{filteredStore[0].phone}</a></h4>
                    </div>
                   
                </div>
                <div className='Hours'>
                    <h4>Hours</h4>
                    <DayCard store={filteredStore}></DayCard>
                </div>
                <div>
                    <img className='storeImage' src={`${process.env.PUBLIC_URL}${filteredStore[0].interiorStore}`}  alt=''></img>
                </div>
                <div className='storeDescription'>
                    <h4> About Us</h4>
                    <p>{filteredStore[0].storeDescription}</p>
                </div>
            </Container>
        </div>
    )
}

export default TargetLocation;