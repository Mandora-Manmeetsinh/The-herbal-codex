import { useState } from 'react';
import { Container, Card, Button, ProgressBar } from 'react-bootstrap';

const sampleQuestions = [
  {
    question: 'Which plant is commonly used to treat cough and cold?',
    options: ['Neem', 'Tulsi', 'Aloe Vera', 'Ashwagandha'],
    answer: 'Tulsi',
  },
  {
    question: 'Which plant has antiseptic properties?',
    options: ['Basil', 'Turmeric', 'Mint', 'Pepper'],
    answer: 'Turmeric',
  },
  {
    question: 'Aloe Vera is mostly used for?',
    options: ['Skin care', 'Fever', 'Hair loss', 'Toothache'],
    answer: 'Skin care',
  },
  // Add more questions here or fetch from backend
];

function Quiz() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [finished, setFinished] = useState(false);

  const currentQuestion = sampleQuestions[current];

  const handleOptionClick = (option) => {
    setSelected(option);
    setShowAnswer(true);
    if (option === currentQuestion.answer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (current + 1 < sampleQuestions.length) {
      setCurrent(current + 1);
      setSelected('');
      setShowAnswer(false);
    } else {
      setFinished(true);
    }
  };

  return (
    <Container className="mt-4">
      <h2>🧪 Herbal Quiz</h2>
      <ProgressBar now={(current / sampleQuestions.length) * 100} className="mb-3" />

      {finished ? (
        <Card className="text-center p-4">
          <h3>Your Score: {score} / {sampleQuestions.length}</h3>
          <Button variant="success" onClick={() => window.location.reload()}>Try Again</Button>
        </Card>
      ) : (
        <Card className="p-4 shadow">
          <h4>Q{current + 1}: {currentQuestion.question}</h4>
          <div className="mt-3">
            {currentQuestion.options.map((opt, i) => (
              <Button
                key={i}
                variant={
                  showAnswer
                    ? opt === currentQuestion.answer
                      ? 'success'
                      : opt === selected
                      ? 'danger'
                      : 'outline-secondary'
                    : 'outline-primary'
                }
                className="m-2"
                disabled={showAnswer}
                onClick={() => handleOptionClick(opt)}
              >
                {opt}
              </Button>
            ))}
          </div>
          {showAnswer && (
            <Button variant="primary" className="mt-3" onClick={nextQuestion}>
              Next
            </Button>
          )}
        </Card>
      )}
    </Container>
  );
}

export default Quiz;
