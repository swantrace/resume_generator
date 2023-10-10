import { Accordion, Form, Button } from "react-bootstrap";
import type { ProjectRecord } from "../data";

const ProjectFormItems = ({
  project,
  index,
  handleTextChange,
  handleSubmit,
  handleCancel,
}: {
  project: ProjectRecord[number];
  index: number;
  handleTextChange: (e: any, index: number, fieldName: string) => void;
  handleSubmit: (e: any) => void;
  handleCancel: (e: any) => void;
}) => {
  return (
    <Accordion.Item eventKey={index.toString()}>
      <Accordion.Header>{project.name}</Accordion.Header>
      <Accordion.Body>
        <Form.Group className="mb-3" controlId={`project-${index}-name`}>
          <Form.Label>Project Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter project name"
            value={project.name}
            onChange={(e) => handleTextChange(e, index, "name")}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId={`project-${index}-link`}>
          <Form.Label>Link</Form.Label>
          <Form.Control
            type="url"
            placeholder="Enter link"
            value={project.link}
            onChange={(e) => handleTextChange(e, index, "link")}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId={`project-${index}-description`}>
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="textarea"
            placeholder="Enter description"
            value={project.description}
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

export default ProjectFormItems;
