import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Suspense } from 'react';
import PlantCard from '../components/PlantCard';

function PlantPlaceholder() {
  return (
    <mesh position={[0, 0.5, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="green" />
    </mesh>
  );
}

function Explore() {
  const [plants, setPlants] = useState([]);
  const [filteredPlants, setFilteredPlants] = useState([]);
  const [search, setSearch] = useState('');
  const [regionFilter, setRegionFilter] = useState('All');
  const [benefitFilter, setBenefitFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/plants')
      .then((res) => res.json())
      .then((data) => {
        setPlants(data);
        setFilteredPlants(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching plants:', err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let results = plants;

    if (search) {
      results = results.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (regionFilter !== 'All') {
      results = results.filter((p) => p.region === regionFilter);
    }

    if (benefitFilter !== 'All') {
      results = results.filter((p) =>
        p.benefits.some((b) => b.toLowerCase().includes(benefitFilter.toLowerCase()))
      );
    }

    setFilteredPlants(results);
  }, [search, regionFilter, benefitFilter, plants]);

  const uniqueRegions = [...new Set(plants.map((p) => p.region))];
  const uniqueBenefits = [...new Set(plants.flatMap((p) => p.benefits))];

  return (
    <div>
      {/* Intro Banner */}
      <section className="bg-success text-white text-center py-5">
        <Container>
          <h1 className="display-5">🌿 Explore the Herbal Garden</h1>
          <p className="lead">Dive into nature and learn about powerful healing plants!</p>
        </Container>
      </section>

      {/* Filters Section */}
      <Container className="mt-4">
        <h2>🌿 Explore Medicinal Plants</h2>
        <Form className="mb-4">
          <Row>
            <Col md={4}>
              <Form.Control
                type="text"
                placeholder="🔍 Search by name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Col>
            <Col md={4}>
              <Form.Select value={regionFilter} onChange={(e) => setRegionFilter(e.target.value)}>
                <option>All</option>
                {uniqueRegions.map((r, i) => (
                  <option key={i}>{r}</option>
                ))}
              </Form.Select>
            </Col>
            <Col md={4}>
              <Form.Select value={benefitFilter} onChange={(e) => setBenefitFilter(e.target.value)}>
                <option>All</option>
                {uniqueBenefits.map((b, i) => (
                  <option key={i}>{b}</option>
                ))}
              </Form.Select>
            </Col>
          </Row>
        </Form>
      </Container>

      {/* Featured Plants */}
      <section className="py-5">
        <Container>
          <h2 className="text-center mb-4">Featured Medicinal Plants</h2>
          <Row>
            {plants.slice(0, 3).map((plant) => (
              <Col md={4} key={plant._id} className="mb-4">
                <Card className="h-100 shadow-sm">
                  <Card.Img variant="top" src={plant.image} />
                  <Card.Body>
                    <Card.Title>{plant.name}</Card.Title>
                    <Card.Text>{plant.description}</Card.Text>
                    <Button as={Link} to={`/plant/${plant._id}`} variant="outline-success">
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

      {/* 3D Canvas */}
      <Container fluid className="p-0" style={{ height: '80vh' }}>
        <Canvas camera={{ position: [3, 4, 5], fov: 80 }}>
          {/* Lighting */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[3, 1, 4]} intensity={1} />

          {/* Controls */}
          <OrbitControls enablePan enableZoom enableRotate />

          {/* Scene Content */}
          <Suspense fallback={<div style={{ color: 'white', textAlign: 'center' }}>Loading 3D Scene...</div>}>
            <PlantPlaceholder />
          </Suspense>
        </Canvas>
      </Container>

      {/* Medicinal Plants Section */}
      <Container className="mt-4">
        {loading ? (
          <div className="text-center p-5">
            <Spinner animation="border" variant="success" />
            <p>Loading plants...</p>
          </div>
        ) : (
          <Row>
            {filteredPlants.length > 0 ? (
              filteredPlants.map((plant) => (
                <Col key={plant._id} sm={12} md={6} lg={4} xl={3}>
                  <PlantCard plant={plant} />
                </Col>
              ))
            ) : (
              <p>No plants match your filters.</p>
            )}
          </Row>
        )}
      </Container>
    </div>
  );
}

export default Explore;