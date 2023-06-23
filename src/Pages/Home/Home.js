import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './Home.css';
import { Link } from 'react-router-dom';
const Home = () => {


    const [data, setData] = useState([]);
    const [dataLoading, setDataLoading] = useState(false)

    useEffect(() => {

        fetch("data.json")
            .then(res => res.json())
            .then(data => {
                setData(data)
                setDataLoading(true)
            })
    }, [])








    return (
        <Container>
            {/*               
              <CardGroup className='g-4'>
                {
                      data.map(r => <Room key={r.id} r={r}></Room>)
                }
             </CardGroup> */}
            {
                  dataLoading ? <Row xs={1} md={3} className="g-4 mt-2">
                  {Array.from(data).map((room, idx) => (
                      <Col key={idx}>
                          <Card>
                              <Card.Img variant="top" src={room.image} />
                              <Card.Body>
                                  <Card.Title>{room.title}</Card.Title>
                                  <Card.Text>
                                      BT-{room.price} taka per night
                                  </Card.Text>
                                  {/* <div  className='text-center'>
                                      <Button  variant="outline-primary">More detail</Button>
                                  </div> */}
                                  <div className='text-center'>
                                      <Link to={`/viewRoom/${room.id}`} className="more-details-btn">view details</Link>
                                  </div>
                              </Card.Body>
                          </Card>
                      </Col>
                  ))}
              </Row>: <p>Loading...</p>
            }

        </Container>
    );
};



























export default Home;