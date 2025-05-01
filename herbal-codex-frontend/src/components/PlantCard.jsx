// import Card from 'react-bootstrap/Card';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function PlantCard({ plant }) {
  return (
    <Link to={`/plant/${plant._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <Card className="m-2 shadow-sm" style={{ width: '18rem' }}>
        <Card.Img variant="top" src={plant.imageUrl} />
        <Card.Body>
          <Card.Title>{plant.name}</Card.Title>
          <Card.Subtitle className="text-muted">{plant.scientificName}</Card.Subtitle>
        </Card.Body>
      </Card>
    </Link>
  );
}

export default PlantCard;
