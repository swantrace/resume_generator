import { Accordion, Form, Button } from "react-bootstrap";
import type { WorkExperienceRecord } from "../data";

const ExperienceFormItems = ({
  experience,
  index,
  handleTextChange,
  handleSubmit,
  handleCancel,
}: {
  experience: WorkExperienceRecord[number];
  index: number;
  handleTextChange: (e: any, index: number, fieldName: string) => void;
  handleSubmit: (e: any) => void;
  handleCancel: (e: any) => void;
}) => {
  return (
    <Accordion.Item eventKey={index.toString()}>
      <Accordion.Header>
        {experience.company} - {experience.position}
      </Accordion.Header>
      <Accordion.Body>
        <Form.Group className="mb-3" controlId={`experience-${index}-company`}>
          <Form.Label>Company</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter company"
            value={experience.company}
            onChange={(e) => handleTextChange(e, index, "company")}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId={`experience-${index}-position`}>
          <Form.Label>Position</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter position"
            value={experience.position}
            onChange={(e) => handleTextChange(e, index, "position")}
          />
        </Form.Group>
        <Form.Group
          className="mb-3"
          controlId={`experience-${index}-startDate`}
        >
          <Form.Label>Start Date</Form.Label>
          <Form.Control
            type="date"
            placeholder="Enter start date"
            value={experience.startDate}
            onChange={(e) => handleTextChange(e, index, "startDate")}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId={`experience-${index}-endDate`}>
          <Form.Label>End Date</Form.Label>
          <Form.Control
            type="date"
            placeholder="Enter end date"
            value={experience.endDate}
            onChange={(e) => handleTextChange(e, index, "endDate")}
          />
        </Form.Group>
        <Form.Group
          className="mb-3"
          controlId={`experience-${index}-description`}
        >
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="textarea"
            placeholder="Enter description"
            value={experience.description}
            onChange={(e) => handleTextChange(e, index, "description")}
          />
        </Form.Group>
        <div className="d-flex justify-content-end align-items-center">
          <Button variant="primary" onClick={handleSubmit} className="me-2">
            Submit
          </Button>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default ExperienceFormItems;
