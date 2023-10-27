import { useState, useRef, useEffect, useCallback } from "react";
import { Accordion, Button, Card, Form } from "react-bootstrap";
import BaseEditor from "./BaseEditor";
import EditorActions from "./EditorActions";
import OpenAI from "openai";
import type { MDXEditorMethods } from "@mdxeditor/editor";
import { saveRecord, type ApplicationRecord, type MyProfile } from "../data";

const GeneratorPanel = ({
  newPage,
  openAIKey,
  record,
  profile,
  setLoading,
}: {
  newPage: boolean;
  openAIKey: string;
  record: ApplicationRecord;
  profile: MyProfile;
  setLoading: (loading: boolean) => void;
}) => {
  const jobPostEditorRef = useRef<MDXEditorMethods>(null);
  const resumeEditorRef = useRef<MDXEditorMethods>(null);
  const coverLetterEditorRef = useRef<MDXEditorMethods>(null);
  const [resumeReadOnly, setResumeReadOnly] = useState<boolean>(true);
  const [coverLetterReadOnly, setCoverLetterReadOnly] = useState<boolean>(true);
  const initialDataPrepared = useRef<boolean>(false);

  useEffect(() => {
    if (record && !initialDataPrepared.current) {
      jobPostEditorRef.current?.setMarkdown(record.job.description);
      resumeEditorRef.current?.setMarkdown(record.resume);
      coverLetterEditorRef.current?.setMarkdown(record.coverLetter);
      initialDataPrepared.current = true;
    }
    if (newPage) {
      jobPostEditorRef.current?.setMarkdown("");
      resumeEditorRef.current?.setMarkdown("");
      coverLetterEditorRef.current?.setMarkdown("");
      initialDataPrepared.current = false;
    }
  }, [record, newPage]);

  const handleTalkWithOpenAI = useCallback(
    async (e) => {
      e.preventDefault();
      const jobPost =
        jobPostEditorRef.current?.getMarkdown() ||
        "We are looking for a junior software engineer to join our team. You will be responsible for developing and maintaining web applications using modern technologies such as React and Node.js. You will also work closely with other engineers and product managers to deliver high-quality products that meet customer needs. To be successful in this role, you should have a bachelor's degree in computer science or related field, or equivalent work experience. You should also have strong programming skills in Python and JavaScript, as well as experience with web development frameworks such as React and Node.js. You should also be familiar with HTML, CSS, Git, and RESTful APIs. You should also have excellent communication and teamwork skills, as well as a passion for learning new technologies.";
      if (!jobPost) {
        alert("Please input a job post");
        return;
      }
      if (!openAIKey) {
        alert("Please input an OpenAI key");
        return;
      }
      if (!newPage) {
        alert("Please create a new job post");
        return;
      }
      setLoading(true);
      const openai = new OpenAI({
        apiKey: openAIKey,
        dangerouslyAllowBrowser: true,
      });
      const data = { post: jobPost, profile };
      const dataString = JSON.stringify(data);
      const prompt = `Please generate a resume and cover letter based on the profile and job post below. The output should be a JSON object that contains the following properties:
          - company: The name of the company you are applying to.
          - position: The name of the position you are applying for.
          - resume: Your resume in markdown format.
          - coverLetter: Your cover letter in markdown format.

          For example:

          {
            "company": "Google",
            "position": "Software Engineer",
            "date": "2023-04-09",
            "resume": "# Resume\\n\\n## John Smith\\njohn.smith@example.com | ...",
            "coverLetter": "# Cover Letter\\n\\nDear Hiring Manager,\\n\\nI am writing to express my interest in ..."
          }

          The profile and job post are:

          ${dataString}
      `;

      try {
        const response = await openai.chat.completions.create({
          model: "gpt-4",
          messages: [
            { role: "system", content: "You are a career coach" },
            { role: "user", content: prompt },
          ],
          temperature: 1,
          max_tokens: 8192,
          top_p: 1,
          stream: false,
          frequency_penalty: 0,
          presence_penalty: 0,
        });
        const text = response.choices[0].message.content;
        const result = JSON.parse(text);
        const { company, position, resume, coverLetter } = result as any;
        const jobPostId = btoa(
          JSON.stringify([company, position, Date.now().toString()])
        );
        await saveRecord({
          id: jobPostId,
          job: {
            company,
            position,
            description: jobPost,
          },
          date: Number(Date.now()),
          coverLetter,
          resume,
        });
        window.location.href = `/generator/${jobPostId}`;
      } catch {
        alert("Error in generating resume and cover letter");
      } finally {
        setLoading(false);
      }
    },
    [openAIKey, profile, setLoading, newPage]
  );

  return (
    <>
      <Form className="mb-2">
        <Card>
          <Accordion flush>
            <Accordion.Item eventKey="0">
              <Accordion.Header style={{ zIndex: "-1" }}>
                Input Job Post
              </Accordion.Header>
              <Accordion.Body>
                <BaseEditor readOnly={!newPage} editorRef={jobPostEditorRef} />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <Card.Footer className="d-flex justify-content-end">
            <Button
              variant="primary"
              type="submit"
              className="me-2"
              disabled={!newPage}
              onClick={handleTalkWithOpenAI}
            >
              Create Resume & Cover Letter
            </Button>
          </Card.Footer>
        </Card>
      </Form>
      <Form className="mb-2">
        <Card>
          <Accordion flush>
            <Accordion.Item eventKey="0">
              <Accordion.Header style={{ zIndex: "-1" }}>
                Resume
              </Accordion.Header>
              <Accordion.Body>
                <BaseEditor
                  readOnly={resumeReadOnly}
                  editorRef={resumeEditorRef}
                />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <Card.Footer className="d-flex justify-content-end">
            <EditorActions
              readOnly={resumeReadOnly}
              newPage={newPage}
              setReadOnly={setResumeReadOnly}
              editorRef={resumeEditorRef}
              field="resume"
              record={record}
            />
          </Card.Footer>
        </Card>
      </Form>
      <Form className="mb-2">
        <Card>
          <Accordion flush>
            <Accordion.Item eventKey="0">
              <Accordion.Header style={{ zIndex: "-1" }}>
                Cover Letter
              </Accordion.Header>
              <Accordion.Body>
                <BaseEditor
                  readOnly={coverLetterReadOnly}
                  editorRef={coverLetterEditorRef}
                />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <Card.Footer className="d-flex justify-content-end">
            <EditorActions
              readOnly={coverLetterReadOnly}
              newPage={newPage}
              setReadOnly={setCoverLetterReadOnly}
              editorRef={coverLetterEditorRef}
              field="coverLetter"
              record={record}
            />
          </Card.Footer>
        </Card>
      </Form>
    </>
  );
};

export default GeneratorPanel;
