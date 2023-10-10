import { useState } from "react";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";

import { Link, useLoaderData, useParams } from "react-router-dom";
import { type ApplicationRecord, type MyProfile, deleteRecord } from "../data";
import OpenAISetting from "../components/OpenAISettings";
import GeneratorPanel from "../components/GeneratorPanel";

function Generator() {
  const { record, profile } = useLoaderData() as {
    record: ApplicationRecord;
    profile: MyProfile;
  };

  const [loading, setLoading] = useState<boolean>(false);
  const [openAIKey, setOpenAIKey] = useState("");
  const jobPostId = useParams<{ jobPostId: string }>().jobPostId;
  const newPage = jobPostId === "new" ? true : false;

  return (
    <Container className="fluid py-4">
      {loading && (
        <Spinner
          animation="border"
          style={{
            position: "absolute",
            zIndex: 10000,
            top: "50%",
            left: "50%",
          }}
        />
      )}
      <Row className="d-flex justify-content-center justify-content-md-end align-items-center mb-3">
        {!newPage ? (
          <Col xs={4} md={3} style={{ width: "fit-content" }}>
            <Link to="/generator/new" className="btn btn-primary me-2">
              New Job Post
            </Link>
          </Col>
        ) : null}
        <Col xs={4} md={3} style={{ width: "fit-content" }}>
          <Link to="/" className="btn btn-primary me-2">
            View Profile
          </Link>
        </Col>
        <Col xs={4} md={3} style={{ width: "fit-content" }}>
          <Link to="/records" className="btn btn-primary text-left">
            View Records
          </Link>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={4}>
          <OpenAISetting openAIKey={openAIKey} setOpenAIKey={setOpenAIKey} />
        </Col>
        <Col xs={12} md={8}>
          <GeneratorPanel
            newPage={newPage}
            openAIKey={openAIKey}
            record={record}
            profile={profile}
            setLoading={setLoading}
          />
        </Col>
      </Row>
      {!newPage ? (
        <Row>
          <Col className="text-end">
            <Button
              variant="danger"
              onClick={async (e) => {
                e.preventDefault();
                await deleteRecord(record.id);
                window.location.href = "/records";
              }}
            >
              Delete
            </Button>
          </Col>
        </Row>
      ) : null}
    </Container>
  );
}

export default Generator;
