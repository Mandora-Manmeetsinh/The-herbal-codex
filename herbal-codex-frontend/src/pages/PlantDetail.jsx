import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Button, Spinner } from 'react-bootstrap';

function PlantDetail() {
  const { id } = useParams();
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/plants/${id}`)
      .then(res => res.json())
      .then(data => {
        setPlant(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch plant:', err);
        setLoading(false);
      });
  }, [id]);

  const speakInfo = () => {
    if (!plant) return;
    const speech = new SpeechSynthesisUtterance();
    speech.text = `
      ${plant.name}, scientifically known as ${plant.scientificName}.
      ${plant.description}.
      Benefits include: ${plant.benefits.join(', ')}.
      Grows in: ${plant.region}. Method: ${plant.growthMethod}.
    `;
    speechSynthesis.speak(speech);
  };

  if (loading) {
    return (
      <Container className="text-center p-5">
        <Spinner animation="border" />
        <p>Loading plant details...</p>
      </Container>
    );
  }

  if (!plant) {
    return <Container><p>Plant not found.</p></Container>;
  }

  return (
    <Container className="mt-4">
      <h2>{plant.name} <small className="text-muted">({plant.scientificName})</small></h2>
      <img src={plant.imageUrl} alt={plant.name} className="img-fluid my-3" />
      <p><strong>Description:</strong> {plant.description}</p>
      <p><strong>Benefits:</strong> {plant.benefits.join(', ')}</p>
      <p><strong>Region:</strong> {plant.region}</p>
      <p><strong>Growth Method:</strong> {plant.growthMethod}</p>
      <Button variant="success" onClick={speakInfo}>🔊 Listen</Button>
    </Container>
  );
}

export default PlantDetail;
