import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Pagination from "../components/Pagination";
import { Container, Row, Col, Card} from "react-bootstrap";
import axios from "axios";
import "./Select.css"

const Characters = () => {
    const [characters, setCharacters] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const BASE_URL = "https://www.anapioficeandfire.com/api";

   

    useEffect(() => {
       async function fetchCharacters () {
                const response = await axios.get(`${BASE_URL}/characters`, {
                    params: {
                        page,
                        pageSize,
                    },
                });
                setCharacters(response.data);
        };

        fetchCharacters();
    }, [page, pageSize]);

    function handlePageChange (nextPage) {
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
            <h1 className="mt-5 mb-5">Characters of Ice and Fire</h1>
            <select className="Select" value={ pageSize } onChange={ (e) => handlePageSizeChange(parseInt(e.target.value)) }>
                <option value={ 10 }>10 items per page</option>
                <option value={ 25 }>25 items per page</option>
                <option value={ 50 }>50 items per page</option>
            </select> 
            <Row>
                {characters.map((character) => (
                    <Col key={character.url} md={6} className="mb-4">
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                    <Link to={`/character/${character.url.split("/").pop()}`}>
                                        {character.name ? character.name : character.aliases}
                                    </Link>
                                </Card.Title>
                                <Card.Text>
                                    Culture: {character.culture ? character.culture : "Unknown"}
                                    <br />
                                    Gender: {character.gender === "Male" ? "♂️" : character.gender === "Female" ? "♀️" : "Unknown"}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <Pagination page={page} onPageChange={handlePageChange} />
        </Container>
    );
};

export default Characters;
