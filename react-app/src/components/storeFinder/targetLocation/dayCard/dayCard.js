import React from "react";
import './dayCard.css'
import { Container, Row, Col} from 'react-bootstrap';

export default function DayCard(props) {
 
    const store = props.store[0].hours
    const hours = []

    // Functions used to make the hours component for targeted locations.
    const makeHours = (storeHours) => {
        for (let key in storeHours){
            hours.push(
                <Row className='hourRow'>
                    <Col xs={6} className='day'>{key}</Col>
                    <Col xs={6} className='hours'>{storeHours[key]}</Col>
                </Row>
            )
        }
        return hours
    }
 
    return (
        <Container className='hourContainer'>{makeHours(store)}</Container>
        )
}