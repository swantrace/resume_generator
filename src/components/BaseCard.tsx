import { Card, Form, Accordion, Button } from "react-bootstrap";

export default function BaseCard({
  children,
  title,
  addNewHandler,
}: {
  children: React.ReactNode;
  title: string;
  addNewHandler: () => void;
}) {
  return (
    <Form>
      <Card className="border-0">
        <Card.Header className="d-flex justify-content-between align-items-center text-white">
          {title}
          <Button
            className="bg-white p-0 px-1"
            variant="light"
            onClick={addNewHandler}
          >
            <i className="bi bi-plus text-black"></i>
          </Button>
        </Card.Header>
        <Accordion flush>{children}</Accordion>
      </Card>
    </Form>
  );
}
