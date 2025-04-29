import { Container, Row, Col, Card, Button } from 'react-bootstrap';

function About() {
  return (
    <Container className="py-5">
      {/* Hero */}
      <Row className="mb-5 text-center">
        <Col>
          <h1 className="display-4 fw-bold">About The Herbal Codex 🌿</h1>
          <p className="lead">Bridging Nature, Healing, and Technology</p>
        </Col>
      </Row>

      {/* Mission */}
      <Row className="mb-5">
        <Col md={6}>
          <img
            src="https://images.unsplash.com/photo-1611078489935-d2ef257b7e37?auto=format&fit=crop&w=800&q=80"
            alt="Herbal Garden"
            className="img-fluid rounded"
          />
        </Col>
        <Col md={6}>
          <h3>🌱 Our Mission</h3>
          <p>
            The Herbal Codex is an interactive platform designed to make herbal knowledge
            accessible, immersive, and fun for everyone. We combine ancient healing wisdom
            with modern web technology to educate, engage, and inspire.
          </p>
        </Col>
      </Row>

      {/* Features */}
      <Row className="mb-5 text-center">
        <Col>
          <h3>✨ Why It Matters</h3>
        </Col>
      </Row>
      <Row className="g-4 text-center">
        <Col md={4}>
          <Card>
            <Card.Body>
              <h5>📚 Educational</h5>
              <p>Learn about herbs, their benefits, and traditional knowledge.</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <h5>🌍 Eco Awareness</h5>
              <p>Discover the importance of plants for health and the planet.</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <h5>🕹️ Engaging</h5>
              <p>Explore in 3D, listen to narrations, and enjoy gamified learning.</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Team */}
      <Row className="mt-5 text-center">
        <Col>
          <h3>👩‍💻 Meet the Team</h3>
        </Col>
      </Row>
      <Row className="g-4 mt-3">
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src="https://i.pravatar.cc/300?img=3" />
            <Card.Body>
              <Card.Title>Project Lead</Card.Title>
              <Card.Text>[Your Name]</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src="https://i.pravatar.cc/300?img=5" />
            <Card.Body>
              <Card.Title>UI/UX Designer</Card.Title>
              <Card.Text>[Team Member]</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src="https://i.pravatar.cc/300?img=8" />
            <Card.Body>
              <Card.Title>3D Developer</Card.Title>
              <Card.Text>[Team Member]</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* CTA */}
      <Row className="text-center mt-5">
        <Col>
          <h4>Ready to Explore Nature Virtually?</h4>
          <Button href="/explore" variant="success" className="mt-3">🌿 Explore Now</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default About;
