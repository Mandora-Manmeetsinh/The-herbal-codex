import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

const dummyData = {
  1: {
    name: 'Tulsi',
    image: 'https://images.unsplash.com/photo-1615554951186-6ed65d692f7f?auto=format&fit=crop&w=800&q=80',
    scientificName: 'Ocimum tenuiflorum',
    uses: 'Used in Ayurveda for immunity and respiratory disorders.',
    benefits: 'Boosts immunity, fights infections, relieves stress.',
  },
  2: {
    name: 'Neem',
    image: 'https://images.unsplash.com/photo-1578894381037-3b16b72081b6?auto=format&fit=crop&w=800&q=80',
    scientificName: 'Azadirachta indica',
    uses: 'Traditionally used in skin and dental care.',
    benefits: 'Antibacterial, antifungal, blood purifier.',
  },
  3: {
    name: 'Aloe Vera',
    image: 'https://images.unsplash.com/photo-1598266660370-4d048bdb38e0?auto=format&fit=crop&w=800&q=80',
    scientificName: 'Aloe barbadensis miller',
    uses: 'Commonly used for burns, wounds, and skin health.',
    benefits: 'Soothes skin, heals wounds, aids digestion.',
  },
};

function PlantDetail() {
  const { id } = useParams();
  const plant = dummyData[id];

  if (!plant) {
    return (
      <Container className="py-5 text-center">
        <h2>Plant Not Found</h2>
        <Button as={Link} to="/explore" variant="outline-secondary">
          Back to Explore
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col md={6}>
          <img src={plant.image} alt={plant.name} className="img-fluid rounded shadow-sm" />
        </Col>
        <Col md={6}>
          <h1>{plant.name}</h1>
          <h5 className="text-muted fst-italic">{plant.scientificName}</h5>
          <hr />
          <h4>🌿 Traditional Uses</h4>
          <p>{plant.uses}</p>
          <h4>🩺 Medicinal Benefits</h4>
          <p>{plant.benefits}</p>
          <Button as={Link} to="/explore" variant="success" className="mt-3">
            ← Back to Explore
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default PlantDetail;
