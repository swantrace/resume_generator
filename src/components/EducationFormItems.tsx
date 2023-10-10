import { Accordion, Form, Button } from "react-bootstrap";
import type { EducationRecord } from "../data";

const EducationFormItems = ({
  education,
  index,
  handleTextChange,
  handleSubmit,
  handleCancel,
}: {
  education: EducationRecord[number];
  index: number;
  handleTextChange: (e: any, index: number, fieldName: string) => void;
  handleSubmit: (e: any) => void;
  handleCancel: (e: any) => void;
}) => {
  return (
    <Accordion.Item eventKey={index.toString()}>
      <Accordion.Header>
        {education.school} - {education.degree}
      </Accordion.Header>
      <Accordion.Body>
        <Form.Group className="mb-3" controlId={`education-${index}-school`}>
          <Form.Label>School</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter school"
            value={education.school}
            onChange={(e) => handleTextChange(e, index, "school")}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId={`education-${index}-degree`}>
          <Form.Label>Degree</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter degree"
            value={education.degree}
            onChange={(e) => handleTextChange(e, index, "degree")}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId={`education-${index}-major`}>
          <Form.Label>Major</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter major"
            value={education.major}
            onChange={(e) => handleTextChange(e, index, "major")}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId={`education-${index}-startDate`}>
          <Form.Label>Start Date</Form.Label>
          <Form.Control
            type="date"
            placeholder="Enter start date"
            value={education.startDate}
            onChange={(e) => handleTextChange(e, index, "startDate")}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId={`education-${index}-endDate`}>
          <Form.Label>End Date</Form.Label>
          <Form.Control
            type="date"
            placeholder="Enter end date"
            value={education.endDate}
            onChange={(e) => handleTextChange(e, index, "endDate")}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId={`education-${index}-gpa`}>
          <Form.Label>GPA</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter GPA"
            value={education.gpa}
            onChange={(e) => handleTextChange(e, index, "gpa")}
          />
        </Form.Group>
        <Form.Group
          className="mb-3"
          controlId={`education-${index}-description`}
        >
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Enter description"
            value={education.description}
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

export default EducationFormItems;
