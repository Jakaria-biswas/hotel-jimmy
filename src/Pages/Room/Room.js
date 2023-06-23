import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';


const Room = () => {

    const { id } = useParams();

    const [roomData, setRoomData] = useState({})
    


    
         
        
 
    return (
        <Container>
            <h2>this is Room details page and room id : {id}</h2>
               {roomData.length}
        </Container>

    );
};

export default Room;