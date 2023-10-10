import { useRouteError } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

export default function ErrorPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const error: any = useRouteError();
  return (
    <Container className="min-vw-100 min-vh-100 d-flex align-items-center justify-content-center">
      <Row>
        <Col>
          <h1>Oops!</h1>
          <p>Sorry, an unexpected error has occurred.</p>
          <p>
            <i>{error.statusText || error.message}</i>
          </p>
        </Col>
      </Row>
    </Container>
  );
}
