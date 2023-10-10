import { useCallback, useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import BaseCard from "./BaseCard";
import EducationFormItems from "./EducationFormItems";
import { type EducationRecord, saveEducationRecord } from "../data";

export default function EducationCard(props: {
  educations: EducationRecord;
  setLoading: (loading: boolean) => void;
  revalidator: { revalidate: () => void };
}) {
  const [educations, setEducations] = useState<EducationRecord>([]);
  const [newEducation, setNewEducation] = useState<EducationRecord[number]>({
    school: "",
    degree: "",
    major: "",
    startDate: "",
    endDate: "",
    gpa: 0,
    description: "",
  });
  const [dirty, setDirty] = useState<boolean>(false);
  const [addNew, setAddNew] = useState<boolean>(false);

  useEffect(() => {
    if (props.educations && props.educations.length > 0) {
      setEducations(props.educations);
    }
  }, [props.educations]);

  const handleTextChange = useCallback(
    (e: any, index: number, fieldName: string) => {
      console.log("handleTextChange", e.target.value, index, fieldName);
      if (index === -1) {
        setNewEducation((prev) => {
          const newEducation = { ...prev };
          newEducation[fieldName] = e.target.value;
          return newEducation;
        });
      } else {
        setEducations((prev) => {
          const newEducations = [...prev];
          newEducations[index][fieldName] = e.target.value;
          return newEducations;
        });
      }
    },
    [setNewEducation, setEducations]
  );

  const handleDelete = useCallback(
    async (e: any, index: number) => {
      e.preventDefault();
      props.setLoading(true);
      const newEducations = [...educations];
      newEducations.splice(index, 1);
      setEducations(newEducations);
      await saveEducationRecord(newEducations);
      props.revalidator.revalidate();
      props.setLoading(false);
    },
    [educations, props]
  );

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      props.setLoading(true);
      const newEducations = [...educations];
      if (addNew) {
        newEducations.unshift(newEducation);
        await saveEducationRecord(newEducations);
        props.revalidator.revalidate();
        setAddNew(false);
        setDirty(false);
        setNewEducation({
          school: "",
          degree: "",
          major: "",
          startDate: "",
          endDate: "",
          gpa: null,
          description: "",
        });
      } else {
        await saveEducationRecord(newEducations);
        props.revalidator.revalidate();
        setDirty(false);
      }
      props.setLoading(false);
    },
    [addNew, newEducation, educations, props]
  );

  const handleCancel = useCallback(
    (e) => {
      e.preventDefault();
      setDirty(false);
      setAddNew(false);
      setNewEducation({
        school: "",
        degree: "",
        major: "",
        startDate: "",
        endDate: "",
        gpa: null,
        description: "",
      });
    },
    [setDirty, setAddNew]
  );

  const enableEdit = (e) => {
    e.preventDefault();
    setAddNew(false);
    setDirty(true);
  };

  return (
    <BaseCard
      title="Education"
      addNewHandler={() => {
        setAddNew(true);
      }}
      onBlur={(e) => {
        console.log("e", e, "onBlur");
      }}
    >
      {addNew ? (
        <EducationFormItems
          index={-1}
          education={newEducation}
          handleTextChange={handleTextChange}
          handleCancel={handleCancel}
          handleSubmit={handleSubmit}
        />
      ) : !dirty ? (
        educations.map((education, index) => {
          return (
            <Accordion.Item
              eventKey={index.toString()}
              key={btoa(
                JSON.stringify([
                  education.school,
                  education.degree,
                  education.major,
                ])
              )}
            >
              <Accordion.Header className="profile-item-header">
                <i
                  className="bi bi-x-circle text-black me-2"
                  onClick={(e) => handleDelete(e, index)}
                ></i>
                {education.school} - {education.degree}
              </Accordion.Header>
              <Accordion.Body onClick={enableEdit}>
                <p>{education.school}</p>
                <p>{education.degree}</p>
                <p>{education.major}</p>
                <p>
                  {education.startDate} - {education.endDate}
                </p>
                <p>{education.description}</p>
              </Accordion.Body>
            </Accordion.Item>
          );
        })
      ) : (
        educations.map((education, index) =>
          EducationFormItems({
            education,
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
