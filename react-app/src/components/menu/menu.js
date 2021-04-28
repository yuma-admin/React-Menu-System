import React, { useEffect } from 'react'
import {useParams} from 'react-router-dom'


function Menu(props){

  // This function will return an embedded i heart jane menu with the matching store ID
  const { id } = useParams()
  useEffect(() => {

    const script = document.createElement("script");

    script.src = `https://api.iheartjane.com/v1/stores/${id}/embed.js`;
    script.async = true;

    document.body.appendChild(script);

  });

  return(
    <div id="jane-frame-script"></div>
  )

}
export default Menu