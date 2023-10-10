import { Accordion, Form, Button } from "react-bootstrap";
import type { SkillSet } from "../data";

const SkillFormItems = ({
  skill,
  index,
  handleTextChange,
  handleSubmit,
  handleCancel,
}: {
  skill: SkillSet[number];
  index: number;
  handleTextChange: (e: any, index: number, fieldName: string) => void;
  handleSubmit: (e: any) => void;
  handleCancel: (e: any) => void;
}) => {
  return (
    <Accordion.Item eventKey={index.toString()}>
      <Accordion.Header>{skill.name}</Accordion.Header>
      <Accordion.Body>
        <Form.Group className="mb-3" controlId={`skill-${index}-skill`}>
          <Form.Label>Skill</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter skill"
            value={skill.name}
            onChange={(e) => handleTextChange(e, index, "name")}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId={`skill-${index}-level`}>
          <Form.Label>Level</Form.Label>
          <Form.Select
            aria-label="Default select example"
            value={skill.level}
            onChange={(e) => handleTextChange(e, index, "level")}
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
            <option value="Expert">Expert</option>
          </Form.Select>
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

export default SkillFormItems;
