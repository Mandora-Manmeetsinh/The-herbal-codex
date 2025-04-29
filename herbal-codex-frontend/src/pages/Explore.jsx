import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Suspense } from 'react';

function PlantPlaceholder() {
  return (
    <mesh position={[0, 0.5, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="green" />
    </mesh>
  );
}

function Explore() {
  const plants = [
    {
      id: 1,
      name: 'Tulsi',
      image: 'https://images.unsplash.com/photo-1615554951186-6ed65d692f7f?auto=format&fit=crop&w=400&q=80',
      description: 'Holy Basil known for immunity-boosting powers.',
    },
    {
      id: 2,
      name: 'Neem',
      image: 'https://images.unsplash.com/photo-1578894381037-3b16b72081b6?auto=format&fit=crop&w=400&q=80',
      description: 'Neem is antibacterial and purifies blood.',
    },
    {
      id: 3,
      name: 'Aloe Vera',
      image: 'https://images.unsplash.com/photo-1598266660370-4d048bdb38e0?auto=format&fit=crop&w=400&q=80',
      description: 'Used for skin treatment and cooling relief.',
    },
  ];

  return (
    <div>
      {/* Intro Banner */}
      <section className="bg-success text-white text-center py-5">
        <Container>
          <h1 className="display-5">🌿 Explore the Herbal Garden</h1>
          <p className="lead">Dive into nature and learn about powerful healing plants!</p>
        </Container>
      </section>

      {/* Featured Plants */}
      <section className="py-5">
        <Container>
          <h2 className="text-center mb-4">Featured Medicinal Plants</h2>
          <Row>
            {plants.map((plant) => (
              <Col md={4} key={plant.id} className="mb-4">
                <Card className="h-100 shadow-sm">
                  <Card.Img variant="top" src={plant.image} />
                  <Card.Body>
                    <Card.Title>{plant.name}</Card.Title>
                    <Card.Text>{plant.description}</Card.Text>
                    <Button as={Link} to={`/plant/${plant.id}`} variant="outline-success">
                      Learn More
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Explore Button */}
      <section className="bg-light text-center py-5">
        <Container>
          <h3>Ready to enter the full Herbal World?</h3>
          <Button variant="success" size="lg" as={Link} to="/3d">
            Launch 3D Garden 🚀
          </Button>
        </Container>
      </section>

      <Container fluid className="p-0" style={{ height: '90vh' }}>
      <Canvas camera={{ position: [2, 2, 5], fov: 60 }}>
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} intensity={1} />

        {/* Controls */}
        <OrbitControls enablePan enableZoom enableRotate />

        {/* Scene Content */}
        <Suspense fallback={null}>
          <PlantPlaceholder />
        </Suspense>
      </Canvas>
    </Container>
    </div>

    
  );
}

export default Explore;
