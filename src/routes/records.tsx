import { Card, Col, Container, Row, Table } from "react-bootstrap";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import type { RecordsPageData } from "../data";

function Records() {
  const { records } = useLoaderData() as RecordsPageData;

  const navigate = useNavigate();
  return (
    <Container className="fluid py-4">
      <Row>
        <Col>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center text-white">
              Records
              <Link to="/generator/new" className="btn btn-primary">
                New Job Post
              </Link>
            </Card.Header>
            <Card.Body>
              <Table hover>
                <thead>
                  <tr>
                    <th>company</th>
                    <th>position</th>
                    <th>date</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((record) => {
                    return (
                      <tr
                        onClick={() => {
                          navigate(`/generator/${record.id}`);
                        }}
                      >
                        <td>{record.company}</td>
                        <td>{record.position}</td>
                        <td>
                          {new Date(Number(record.date)).toLocaleDateString(
                            "en-US",
                            {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Records;
