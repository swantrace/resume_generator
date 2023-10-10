import { useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { Link, useLoaderData, useRevalidator } from "react-router-dom";
import ProfileContactInfoCard from "../components/ProfileContactInfoCard";
import EducationCard from "../components/EducationCard";
import WorkExperienceCard from "../components/WorkExperienceCard";
import ProjectCard from "../components/ProjectCard";
import SkillCard from "../components/SKillCard";
import type { MyProfile } from "../data";

function Profile() {
  const [loading, setLoading] = useState<boolean>(false);
  const { profile } = useLoaderData() as { profile: MyProfile };
  const revalidator = useRevalidator();

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
        <Col xs={6} md={3} style={{ width: "fit-content" }}>
          <Link to="/generator/new" className="btn btn-primary me-2">
            New Job Post
          </Link>
        </Col>
        <Col xs={6} md={3} style={{ width: "fit-content" }}>
          <Link to="/records" className="btn btn-primary text-left">
            View Records
          </Link>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={4}>
          <ProfileContactInfoCard
            avatarUrl={profile?.avatar}
            contactInfo={profile?.contactInfo}
            setLoading={setLoading}
            revalidator={revalidator}
          />
        </Col>
        <Col xs={12} md={8}>
          <Container>
            <Row>
              <Col md={12} lg={6} className="mb-3">
                <EducationCard
                  educations={profile?.educationRecord ?? []}
                  setLoading={setLoading}
                  revalidator={revalidator}
                />
              </Col>
              <Col md={12} lg={6} className="mb-3">
                <WorkExperienceCard
                  experiences={profile?.workExperienceRecord ?? []}
                  setLoading={setLoading}
                  revalidator={revalidator}
                />
              </Col>

              <Col md={12} lg={6} className="mb-3">
                <ProjectCard
                  projects={profile?.projectRecord ?? []}
                  setLoading={setLoading}
                  revalidator={revalidator}
                />
              </Col>
              <Col md={12} lg={6} className="mb-3">
                <SkillCard
                  skills={profile?.skillSet ?? []}
                  setLoading={setLoading}
                  revalidator={revalidator}
                />
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;
