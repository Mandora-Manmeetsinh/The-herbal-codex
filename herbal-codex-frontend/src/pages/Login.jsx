import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      login({ user: data.user, token: data.token });
      navigate('/');
    } catch (err) {
      setErr(err.message);
    }
  };

  return (
    <Container className="mt-4">
      <h3>Login</h3>
      {err && <Alert variant="danger">{err}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" required value={email} onChange={e => setEmail(e.target.value)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" required value={password} onChange={e => setPassword(e.target.value)} />
        </Form.Group>
        <Button type="submit" className="mt-3">Login</Button>
      </Form>
    </Container>
  );
}

export default Login;
