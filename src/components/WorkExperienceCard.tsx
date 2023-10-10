import { useState, useEffect } from "react";
import { Accordion, Button } from "react-bootstrap";
import BaseCard from "./BaseCard";
import ExperienceFormItems from "./ExperienceFormItems";
import { type WorkExperienceRecord, saveWorkExperienceRecord } from "../data";

export default function WorkExperienceCard(props: {
  experiences: WorkExperienceRecord;
  setLoading: (loading: boolean) => void;
  revalidator: { revalidate: () => void };
}) {
  const [experiences, setExperiences] = useState<WorkExperienceRecord>([]);
  useEffect(() => {
    if (props.experiences && props.experiences.length > 0) {
      setExperiences(props.experiences);
    }
  }, [props.experiences]);
  const [newExperience, setNewExperience] = useState<
    WorkExperienceRecord[number]
  >({
    company: "",
    position: "",
    startDate: "",
    endDate: "",
    description: "",
  });
  const [dirty, setDirty] = useState<boolean>(false);
  const [addNew, setAddNew] = useState<boolean>(false);

  const handleTextChange = (e: any, index: number, fieldName: string) => {
    console.log("handleTextChange", e.target.value, index, fieldName);
    if (index === -1) {
      setNewExperience((prev) => {
        const newExperience = { ...prev };
        newExperience[fieldName] = e.target.value;
        return newExperience;
      });
    } else {
      setExperiences((prev) => {
        const newExperience = [...prev];
        newExperience[index][fieldName] = e.target.value;
        return newExperience;
      });
    }
  };

  const handleDelete = async (e: any, index: number) => {
    e.preventDefault();
    props.setLoading(true);
    const newExperiences = [...experiences];
    newExperiences.splice(index, 1);
    setExperiences(newExperiences);
    await saveWorkExperienceRecord(newExperiences);
    props.revalidator.revalidate();
    props.setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    props.setLoading(true);
    const newExperiences = [...experiences];
    if (addNew) {
      newExperiences.unshift(newExperience);
      await saveWorkExperienceRecord(newExperiences);
      props.revalidator.revalidate();
      setAddNew(false);
      setDirty(false);
      setNewExperience({
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        description: "",
      });
    } else {
      await saveWorkExperienceRecord(newExperiences);
      props.revalidator.revalidate();
      setDirty(false);
    }
    props.setLoading(false);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setDirty(false);
    setAddNew(false);
    setNewExperience({
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      description: "",
    });
  };

  const enableEdit = (e) => {
    e.preventDefault();
    setAddNew(false);
    setDirty(true);
  };

  return (
    <BaseCard
      title="Work Experience"
      addNewHandler={() => {
        setAddNew(true);
      }}
      onBlur={(e) => {
        console.log("e", e, "onBlur");
      }}
    >
      {addNew ? (
        <ExperienceFormItems
          index={-1}
          experience={newExperience}
          handleTextChange={handleTextChange}
          handleCancel={handleCancel}
          handleSubmit={handleSubmit}
        />
      ) : !dirty ? (
        experiences.map((experience, index) => {
          return (
            <Accordion.Item
              eventKey={index.toString()}
              key={btoa(
                JSON.stringify([
                  experience.company,
                  experience.position,
                  experience.startDate,
                ])
              )}
              onClick={enableEdit}
            >
              <Accordion.Header>
                <Button
                  className="bg-white p-0 px-1 me-2"
                  variant="light"
                  onClick={(e) => handleDelete(e, index)}
                >
                  <i className="bi bi-x-circle text-black"></i>
                </Button>
                {experience.company} - {experience.position}
              </Accordion.Header>
              <Accordion.Body>
                <p>{experience.company}</p>
                <p>{experience.position}</p>
                <p>
                  {experience.startDate} - {experience.endDate}
                </p>
                <p>{experience.description}</p>
              </Accordion.Body>
            </Accordion.Item>
          );
        })
      ) : (
        experiences.map((experience, index) =>
          ExperienceFormItems({
            experience,
            index,
            handleTextChange,
            handleCancel,
            handleSubmit,
          })
        )
      )}
    </BaseCard>
  );
}
