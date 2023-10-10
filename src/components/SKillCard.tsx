// import { useState, useEffect } from "react";
// import { Accordion, Button } from "react-bootstrap";
// import BaseCard from "./BaseCard";
// import ProjectFormItems from "./ProjectFormItems";
// import { type ProjectRecord, saveProjectRecord } from "../data";

// export default function ProjectCard(props: {
//   projects: ProjectRecord;
//   setLoading: (loading: boolean) => void;
//   revalidator: { revalidate: () => void };
// }) {
//   const [projects, setProjects] = useState<ProjectRecord>([]);
//   useEffect(() => {
//     if (props.projects && props.projects.length > 0) {
//       setProjects(props.projects);
//     }
//   }, [props.projects]);
//

//   const [newProject, setNewProject] = useState<ProjectRecord[number]>({
//     name: "",
//     description: "",
//     link: "",
//   });
//   const [dirty, setDirty] = useState<boolean>(false);
//   const [addNew, setAddNew] = useState<boolean>(false);

//   const handleTextChange = (e: any, index: number, fieldName: string) => {
//
//     if (index === -1) {
//       setNewProject((prev) => {
//         const newProject = { ...prev };
//         newProject[fieldName] = e.target.value;
//         return newProject;
//       });
//     } else {
//       setProjects((prev) => {
//         const newProjects = [...prev];
//         newProjects[index][fieldName] = e.target.value;
//         return newProjects;
//       });
//     }
//   };

//   const handleDelete = async (e: any, index: number) => {
//     e.preventDefault();
//     props.setLoading(true);
//     const newProjects = [...projects];
//     newProjects.splice(index, 1);
//     setProjects(newProjects);
//     await saveProjectRecord(newProjects);
//     props.revalidator.revalidate();
//     props.setLoading(false);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     props.setLoading(true);
//     const newProjects = [...projects];
//     if (addNew) {
//       newProjects.push(newProject);
//     }
//     await saveProjectRecord(newProjects);
//     props.revalidator.revalidate();
//     props.setLoading(false);
//     setAddNew(false);
//   };

//   const handleCancel = (e) => {
//     e.preventDefault();
//     setDirty(false);
//     setAddNew(false);
//     setNewProject({
//       name: "",
//       description: "",
//       link: "",
//     });
//   };

//   const enableEdit = (e) => {
//     e.preventDefault();
//     setAddNew(false);
//     setDirty(true);
//   };

//   return (
//     <BaseCard
//       title="Projects"
//       addNewHandler={() => {
//         setAddNew(true);
//       }}
//     >
//       {addNew ? (
//         <ProjectFormItems
//           index={-1}
//           project={newProject}
//           handleTextChange={handleTextChange}
//           handleCancel={handleCancel}
//           handleSubmit={handleSubmit}
//         />
//       ) : !dirty ? (
//         projects.map((project, index) => {
//           return (
//             <Accordion.Item
//               eventKey={index.toString()}
//               key={btoa(JSON.stringify([project.name, project.description]))}
//               onClick={enableEdit}
//             >
//               <Accordion.Header>
//                 <Button
//                   className="bg-white p-0 px-1 me-2"
//                   variant="light"
//                   onClick={(e) => handleDelete(e, index)}
//                 >
//                   <i className="bi bi-x-circle text-black"></i>
//                 </Button>
//                 {project.name}
//               </Accordion.Header>
//               <Accordion.Body>
//                 <p>{project.name}</p>
//                 <p>{project.description}</p>
//                 <p>{project.link}</p>
//               </Accordion.Body>
//             </Accordion.Item>
//           );
//         })
//       ) : (
//         projects.map((project, index) =>
//           ProjectFormItems({
//             project,
//             index,
//             handleTextChange,
//             handleCancel,
//             handleSubmit,
//           })
//         )
//       )}
//     </BaseCard>
//   );
// }

import { useState, useEffect } from "react";
import { Accordion, Button } from "react-bootstrap";
import BaseCard from "./BaseCard";
import SkillFormItems from "./SkillFormItems";
import { type SkillSet, saveSkillSet } from "../data";

// export type SkillSet = {
//   name: string;
//   level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
// }[];

export default function SkillCard(props: {
  skills: SkillSet;
  setLoading: (loading: boolean) => void;
  revalidator: { revalidate: () => void };
}) {
  const [skills, setSkills] = useState<SkillSet>([]);
  useEffect(() => {
    if (props.skills && props.skills.length > 0) {
      setSkills(props.skills);
    }
  }, [props.skills]);

  const [newSkill, setNewSkill] = useState<SkillSet[number]>({
    name: "",
    level: "Beginner",
  });

  const [dirty, setDirty] = useState<boolean>(false);
  const [addNew, setAddNew] = useState<boolean>(false);

  const handleTextChange = (e: any, index: number, fieldName: string) => {
    if (index === -1) {
      setNewSkill((prev) => {
        const newSkill = { ...prev };
        newSkill[fieldName] = e.target.value;
        return newSkill;
      });
    } else {
      setSkills((prev) => {
        const newSkills = [...prev];
        newSkills[index][fieldName] = e.target.value;
        return newSkills;
      });
    }
  };

  const handleDelete = async (e: any, index: number) => {
    e.preventDefault();
    props.setLoading(true);
    const newSkills = [...skills];
    newSkills.splice(index, 1);
    setSkills(newSkills);
    await saveSkillSet(newSkills);
    props.revalidator.revalidate();
    props.setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    props.setLoading(true);
    const newSkills = [...skills];
    if (addNew) {
      newSkills.unshift(newSkill);
      await saveSkillSet(newSkills);
      props.revalidator.revalidate();
      setAddNew(false);
      setNewSkill({
        name: "",
        level: "Beginner",
      });
    } else {
      await saveSkillSet(newSkills);
      props.revalidator.revalidate();
    }
    setDirty(false);
    props.setLoading(false);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setDirty(false);
    setAddNew(false);
    setNewSkill({
      name: "",
      level: "Beginner",
    });
  };

  const enableEdit = (e) => {
    e.preventDefault();
    setAddNew(false);
    setDirty(true);
  };

  return (
    <BaseCard
      title="Skills"
      addNewHandler={() => {
        setAddNew(true);
      }}
    >
      {addNew ? (
        <SkillFormItems
          index={-1}
          skill={newSkill}
          handleTextChange={handleTextChange}
          handleCancel={handleCancel}
          handleSubmit={handleSubmit}
        />
      ) : !dirty ? (
        skills.map((skill, index) => {
          return (
            <Accordion.Item
              eventKey={index.toString()}
              key={btoa(JSON.stringify([skill.name, skill.level]))}
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
                {skill.name}
              </Accordion.Header>
              <Accordion.Body>
                <p>{skill.name}</p>
                <p>{skill.level}</p>
              </Accordion.Body>
            </Accordion.Item>
          );
        })
      ) : (
        skills.map((skill, index) =>
          SkillFormItems({
            skill,
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
