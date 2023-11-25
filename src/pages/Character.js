import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Card, Spinner } from "react-bootstrap";
import axios from "axios";

const Character = () => {
    const { characterId } = useParams();
    const [character, setCharacter] = useState(null);
    const [allegiances, setAllegiances] = useState([]);

    const BASE_URL = "https://www.anapioficeandfire.com/api";

    useEffect(() => {
      async function fetchCharacter () {
            const response = await axios.get(`${BASE_URL}/characters/${characterId}`);
            setCharacter(response.data);
            await fetchAllegiances(response.data.allegiances);
        };

        async function fetchAllegiances (allegianceUrls) {
            const allegiancePromises = allegianceUrls.map(async (url) => {
                
                    const response = await axios.get(url);
                    return response.data.name || "Unknown Allegiance";
            });
            const allegianceNames = await Promise.all(allegiancePromises);
            setAllegiances(allegianceNames);
        };

        fetchCharacter();
    }, [characterId]);

    if (!character) {
        return <Spinner color="light"></Spinner>;
    }

    return (
        <Container>
            <h1 className="mt-5 mb-5">Character Information</h1>
            <Card>
                <Card.Body>
                    <Card.Title>
                        { character.name || (character.aliases.length > 0 ? character.aliases[0] : "Unnamed") }
                    </Card.Title>
                    <Card.Text>
                        <p>Culture: { character.culture || "Unknown" }</p>
                        <p>Gender: { character.gender === "Male" ? "♂️" : character.gender === "Female" ? "♀️" : "Unknown" }</p>
                        <p>Born: { character.born || "Unknown" }</p>
                        <p>Died: { character.died || "Unknown" }</p>
                        <p>Titles: { character.titles.join(", ") || "None" }</p>
                        <p>Aliases: { character.aliases.join(", ") || "None" }</p>
                        <p>Father: { character.father || "Unknown" }</p>
                        <p>Mother: { character.mother || "Unknown" }</p>
                        <p>
                            Spouse:{ " " }
                            { character.spouse ? (
                                <Link to={ `/character/${character.spouse.split("/").pop()}` }>{ character.spouse.split("/").pop() }</Link>
                            ) : (
                                "Unknown"
                            ) }
                        </p>
                        <p>
                            Allegiances:{ " " }
                            { allegiances.length > 0 ? (
                                allegiances.map((allegiance, index) => (
                                    <p
                                        key={ index }
                                    >
                                        { allegiance }
                                    </p>
                                ))
                            ) : (
                                "Unknown"
                            ) }
                        </p>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Character;