import { Form, Card } from "react-bootstrap";

export default function OpenAISetting({
  openAIKey,
  setOpenAIKey,
}: {
  openAIKey: string;
  setOpenAIKey: (key: string) => void;
}) {
  return (
    <Form>
      <Card>
        <Card.Header className="text-white">Configure AI</Card.Header>
        <Card.Body>
          <Form.Group controlId="openAIKey">
            <Form.Label>OpenAI Key</Form.Label>
            <Form.Control
              type="text"
              value={openAIKey}
              onChange={(e) => setOpenAIKey(e.target.value)}
              placeholder="Enter OpenAI Key"
            />
          </Form.Group>
        </Card.Body>
      </Card>
    </Form>
  );
}
