import { Container } from 'react-bootstrap';

function Footer() {
  return (
    <footer className="bg-light text-center py-3 mt-5 shadow-sm">
      <Container>
        <p className="mb-0">© {new Date().getFullYear()} Herbal Codex. All rights reserved.</p>
      </Container>
    </footer>
  );
}

export default Footer;
