import React, {useState, useEffect} from "react";
import './storeFinder.css'
import Store from './locations/store'
import { Container, Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import Search from './search/search'
import Maps from './map/Maps'
import  TargetLocation from './targetLocation/targetLocation'
import storeJson from './locations/storeJson'
import {useParams} from 'react-router-dom'


function StoreFinder(props) {
    // Removes a store menu if its there
    const element = document.getElementById('menu-div')
    if (element){
        element.parentNode.removeChild(element);
    }

    // Id state 
    const [id, setId] = useState({
        id:''
    })

    // Store distance state
    const [storeDistance,setStoreDistance] = useState({
        stores: [],
        zoom:null,
        center:null
    })

    // Default Map API information state
    const [mapParams,setMapParams] = useState({
        zoom:'5',
        center:{lat: 39.8283, lng: -98.5795}
    })

    // Checks to see if a store should be pre-selected
    const { store } = useParams()
    useEffect(() => {
        if(store){
            const found = storeJson.find( ({ id }) => id === store)
            if (found) {
                setId({id:store})
            }
            return 
        }
    },[store])


        // Has a specific store been selected state
    const [menuChosen,setMenuChosen] = useState({
        menu:''
    })

    // This triggers whenever the id or storeDistance state changes
    // This will then update the map zoom and centering 
    useEffect(() => {
        if(id.id){
            const filteredStores = storeJson.filter(store => store.id === id.id)
            setMapParams({...mapParams,zoom:'14',center:{lat:filteredStores[0].lat,lng:filteredStores[0].lng}})
        }
        if(!id.id && !storeDistance.zoom){
            setMapParams({...mapParams,zoom:'5',center:{lat: 39.8283, lng: -98.5795}})
        }
        if(storeDistance.zoom && storeDistance.center && !id.id){
            setMapParams({...mapParams,zoom:storeDistance.zoom, center: storeDistance.center})
        }
        
    },[id, storeDistance] )

    // Whenvever a menu is chosen this will update the storeId state
    useEffect(() => {
        if(menuChosen.menu){
            props.callBack({storeId:menuChosen.menu})
        }
    },[menuChosen])
  
    // If there is no id return the search component, the store component in locations, and a map component
    if(!id.id){
        return(
            <Container fluid>
                <Row>
                    <Col xs={{span:12,order:2}} sm={{span:12,order:2}} lg={{span:4,order:1}} className='storeFinderInfo'> 
                        <div className='search'>
                            <Search callBack = {setStoreDistance}></Search>
                        </div>
                        <div className='storeCards'>
                            <Store organizedCards={storeDistance.stores} callBack = {setId}></Store>
                        </div>
                    </Col>
                    <Col xs={{span:12,order:1}} sm={{span:12,order:1}} lg={{span:8,order:2}} className='mapCol'>
                        <div className='mobileSearch'>
                            <Search callBack = {setStoreDistance}></Search>
                        </div>
                        <div className='stickyMap desktopMap'> 
                            <Maps center={mapParams.center} zoom={mapParams.zoom} windowSize={'100vh'}></Maps> 
                        </div>
                         <div className='stickyMap mobileMap'> 
                            <Maps center={mapParams.center} zoom={mapParams.zoom -2} windowSize={'70vh'}></Maps> 
                        </div>
                    </Col>
                    
                </Row>
            </Container>
        )
    }
    // If there is an Id return the Target Location component and a map component
    // Also returns a search component on mobile only
    if(id){
        return(
            <Container fluid>
            <Row>
                <Col xs={{span:12,order:2}} sm={{span:12,order:2}} lg={{span:4,order:1}} className='storeFinderInfo selectedStoreInfo'> 
                    <div className='storeCards'>
                        <TargetLocation  id = {id.id} callBack = {setId} menuChosen={setMenuChosen}></TargetLocation>
                    </div>
                </Col>
                <Col xs={{span:12,order:1}} sm={{span:12,order:1}} lg={{span:8,order:2}} className='stickyMap'>
                    <div className='mobileSearch'>
                            <Search callBack = {setStoreDistance} ></Search>
                        </div>
                    <div className='stickyMap desktopMap'> 
                        <Maps center={mapParams.center} zoom={mapParams.zoom} windowSize={'100vh'}></Maps> 
                    </div>
                    <div className='stickyMap mobileMap'> 
                        <Maps center={mapParams.center} zoom={mapParams.zoom} windowSize={'70vh'}></Maps> 
                    </div>
                </Col>
                
            </Row>
        </Container>
        )
    }
}
export default StoreFinder;