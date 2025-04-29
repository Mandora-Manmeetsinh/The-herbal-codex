import { Container, Row, Col, Card, Button } from 'react-bootstrap';

function Learn() {
  return (
    <Container className="py-5">
      {/* Page Header */}
      <Row className="mb-4 text-center">
        <Col>
          <h1 className="fw-bold">🧠 Herbal Learning Challenges</h1>
          <p className="text-muted">Test your knowledge with fun and engaging herbal quizzes!</p>
        </Col>
      </Row>

      {/* Quiz Topics */}
      <Row className="g-4">
        <Col md={4}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>🌿 Identify the Herb</Card.Title>
              <Card.Text>
                Match plant images to their names and medicinal uses.
              </Card.Text>
              <Button variant="success" disabled>Coming Soon</Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>📚 Medicinal Benefits Quiz</Card.Title>
              <Card.Text>
                Guess the herb based on its healing properties and use cases.
              </Card.Text>
              <Button variant="success" disabled>Coming Soon</Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>🧪 Grow Your Own Challenge</Card.Title>
              <Card.Text>
                Learn the steps to grow your own herbal garden virtually.
              </Card.Text>
              <Button variant="success" disabled>Coming Soon</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* CTA */}
      <Row className="text-center mt-5">
        <Col>
          <h5>More quizzes and gamified learning coming soon! 🚀</h5>
          <Button href="/explore" variant="outline-success" className="mt-3">Explore Herbs</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Learn;
