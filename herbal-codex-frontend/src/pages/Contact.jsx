import { Container, Row, Col, Form, Button } from 'react-bootstrap';

function Contact() {
  return (
    <Container className="py-5">
      {/* Title */}
      <Row className="mb-4 text-center">
        <Col>
          <h1 className="fw-bold">Contact Us 📩</h1>
          <p className="text-muted">We’d love to hear your thoughts or feedback!</p>
        </Col>
      </Row>

      {/* Form + Info */}
      <Row className="g-4">
        {/* Contact Form */}
        <Col md={7}>
          <Form>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formMessage">
              <Form.Label>Your Message</Form.Label>
              <Form.Control as="textarea" rows={5} placeholder="Write your message here..." />
            </Form.Group>

            <Button variant="success" type="submit">
              Send Message
            </Button>
          </Form>
        </Col>

        {/* Contact Info */}
        <Col md={5}>
          <div className="border p-4 rounded bg-light">
            <h5>📬 Contact Details</h5>
            <p><strong>Email:</strong> hello@herbalcodex.com</p>
            <p><strong>Phone:</strong> +91 98765 43210</p>
            <p><strong>Address:</strong> Herbal Garden Road, Gujarat, India</p>
            <p><strong>Social:</strong></p>
            <ul className="list-unstyled">
              <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a></li>
            </ul>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Contact;
