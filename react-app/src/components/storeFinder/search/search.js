import React, {useState,useEffect}  from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import { FaSearch } from 'react-icons/fa';
import {BiCurrentLocation} from 'react-icons/bi'
import './search.css'
import triangulate from './triangulate.js'


// This function creates the automated search bar that allows for users to find their address 
export default function Search(props) {
  // Creation of state variables
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null
  });

  // sets lat and lng by calculating them from the google api info
  const handleSelect = async value => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(latLng);
  };

  // Asks the computer to access its geolocation information
  const getGeoLocation = () => {
    navigator.geolocation.getCurrentPosition(successfulLookup,unsuccessfulLookup)
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
}

// gets coordinates
  const successfulLookup = (position) => {
      const {latitude, longitude} = position.coords
      setCoordinates({lat:latitude, lng:longitude})
  }
  const unsuccessfulLookup = () => {
      
  }

// runs when coordinates change and calls the triangulation function imported from triangulate.js
  useEffect(() =>  {
      if (coordinates.lat && coordinates.lng){
        const closest = triangulate(coordinates.lat,coordinates.lng)
        props.callBack({stores:closest,zoom:'12',
        center:{lat: coordinates.lat, lng: coordinates.lng}})
      }
   
  },[coordinates])

  // JSX for search bar. Extensively uses the react-places-autocomplete library 
  return (
    <div className='search-bar-container'>
      {/* PlacesAutoComplete library  */}
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className='search-input-container'>

            <div className='icon'><FaSearch/></div>
            <button className='geoLocationButton' onClick={() => getGeoLocation()}><BiCurrentLocation/></button>
            <input id='menuSearch' className='search-input' {...getInputProps({ placeholder: "Enter your address" })} />

            <div>
              {loading ? <div></div> : null}
              {/* Displays background of search bar results and changes color when hovered */}
              {suggestions.map(suggestion => {
                const style = {
                  backgroundColor: suggestion.active ? "rgb(88, 89, 91)" : "rgb(60, 60, 60, 1)",
                  color:'white',
                  'text-align':'left',
                  'padding-left':"36px"
                };

                return (
                  <div {...getSuggestionItemProps(suggestion, { style })}>
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
}