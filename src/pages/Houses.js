import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Pagination from "../components/Pagination";
import { Container, Row, Col, Card} from "react-bootstrap";
import "./Select.css"

const Houses = () => {
    const [houses, setHouses] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const BASE_URL = "https://www.anapioficeandfire.com/api";

    useEffect(() => {
        async function  fetchHouses () {
                const response = await axios.get(`${BASE_URL}/houses`, {
                    params: {
                        page,
                        pageSize,
                    },
                })
                
                if (response.data.length === 0) {
                    console.log("No more houses.");
                } else {
                    setHouses(response.data);
                } 
        };

        fetchHouses();
    }, [page, pageSize]);

    const handlePageChange = (nextPage) => {
        setPage(nextPage);
    };

    const handlePageSizeChange = (newSize) => {
        setPageSize(newSize);
        setPage(1);
    };

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [page])

    return (
        <Container>
            <h1 className="mt-5 mb-5">Houses of Ice and Fire</h1>
            <select className="Select" value={ pageSize } onChange={ (e) => handlePageSizeChange(parseInt(e.target.value)) }>
                <option value={ 10 }>10 items per page</option>
                <option value={ 25 }>25 items per page</option>
                <option value={ 50 }>50 items per page</option>
            </select>
            <Row>
                { houses.map((house) => (
                    <Col key={ house.url } md={ 6 } lg={ 6 } className="mb-4">
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                        <strong>{ house.name }</strong>
                                </Card.Title>
                                <Card.Text>
                                    <p>
                                        Titles: { house.titles.join(", ") || "No Titles" }
                                        <br />
                                        Words: { house.words || "None" }
                                        <br />
                                        Current Lord:{ " " }
                                        { house.currentLord ? (
                                            <Link to={ `/character/${house.currentLord.split("/").pop()}` }>{ house.currentLord.split("/").pop() }</Link>
                                        ) : (
                                            "N/A"
                                        ) }
                                        <br />
                                        Sworn Members:{ " " }
                                        { house.swornMembers &&
                                            house.swornMembers.map((member, index) => (
                                                <span key={ index }>
                                                    <Link to={ `/character/${member.split("/").pop()}` }>{ member.split("/").pop() }</Link>
                                                    { index < house.swornMembers.length - 1 && ", " }
                                                </span>
                                            )) }
                                    </p>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                )) }
            </Row>
            <Pagination page={page} onPageChange={handlePageChange} />
        </Container>
    );
};

export default Houses;