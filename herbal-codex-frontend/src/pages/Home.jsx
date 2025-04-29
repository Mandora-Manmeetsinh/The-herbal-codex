import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-light py-5 text-center">
        <Container>
          <h1 className="display-4 fw-bold">🌿 Welcome to Herbal Codex 🌿</h1>
          <p className="lead">Explore the magical world of healing herbs through an interactive 3D experience.</p>
          <Button as={Link} to="/explore" variant="success" size="lg" className="mt-3">
            Start Exploring
          </Button>
        </Container>
      </section>

      {/* About Short Section */}
      <section className="py-5">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <img
                src="../assets/images/herbal-garden.png"
                alt="Herbal Garden"
                className="img-fluid rounded shadow-sm"
              />
            </Col>
            <Col md={6} className="mt-4 mt-md-0">
              <h2>About Herbal Codex</h2>
              <p>Herbal Codex is your gateway to learning about medicinal plants through a dynamic, fun, and immersive 3D environment. Discover traditional uses, scientific details, and much more!</p>
              <Button as={Link} to="/about" variant="outline-success">
                Learn More
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="bg-light py-5">
        <Container>
          <h2 className="text-center mb-5">Key Features</h2>
          <Row>
            <Col md={4} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Body className="text-center">
                  <Card.Title>🌱 3D Garden</Card.Title>
                  <Card.Text>Walk through a beautiful herbal garden rendered in 3D!</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Body className="text-center">
                  <Card.Title>📚 Learn & Discover</Card.Title>
                  <Card.Text>Find scientific information, traditional uses, and health benefits easily.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Body className="text-center">
                  <Card.Title>🎮 Fun Quizzes</Card.Title>
                  <Card.Text>Challenge yourself with fun quizzes and test your herbal knowledge.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}

export default Home;
