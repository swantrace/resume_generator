import { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Card, Form, InputGroup, ListGroup } from "react-bootstrap";

import { type ContactInfo, saveAvatar, saveContactInfo } from "../data";

export default function ProfileContactInfoCard(props: {
  avatarUrl: string | null;
  contactInfo: ContactInfo;
  setLoading: (loading: boolean) => void;
  revalidator: { revalidate: () => void };
}) {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    name: "Candidate Name",
    title: "Candidate Title",
    email: "candidate@host",
    phone: "",
    address: "",
    website: "",
    twitter: "",
    github: "",
    linkedin: "",
  });

  const [dirty, setDirty] = useState<boolean>(false);

  useEffect(() => {
    if (props.avatarUrl) {
      setAvatarUrl(props.avatarUrl);
    }
    if (props.contactInfo) {
      setContactInfo(props.contactInfo);
    }
  }, [props.avatarUrl, props.contactInfo]);

  const enableEdit = (e) => {
    e.preventDefault();
    setDirty(true);
  };

  const handleImageUploaded = useCallback(async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setAvatarUrl(reader.result as string);
    };
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setDirty(false);
    props.setLoading(true);
    await saveAvatar(avatarUrl);
    await saveContactInfo(contactInfo);
    props.setLoading(false);
    props.revalidator.revalidate();
  };

  const handleTextChange = useCallback((e: any, fieldName: string) => {
    setContactInfo((prev) => ({ ...prev, [fieldName]: e.target.value }));
  }, []);

  const optionalItems = useMemo(() => {
    const optionalKeys = [
      ["phone", "tel", "bi-telephone-forward-fill"],
      ["address", "text", "bi-house-fill"],
      ["website", "url", "bi-link-45deg"],
      ["twitter", "url", "bi-twitter-x"],
      ["github", "url", "bi-github"],
      ["linkedin", "url", "bi-linkedin"],
    ] as const;
    return optionalKeys.map(([key, type, icon]) => [
      key,
      contactInfo[key],
      type,
      icon,
    ]);
  }, [contactInfo]);

  return (
    <Form>
      <Card className="text-center mb-3" onClick={enableEdit}>
        <Card.Img
          className="rounded-circle mx-auto my-5"
          style={{
            width: "160px",
            height: "160px",
            objectFit: "cover",
            objectPosition: "top",
          }}
          src={avatarUrl ?? `https://placehold.co/120x120`}
        ></Card.Img>
        <div style={{ height: "4opx" }} onClick={(e) => e.stopPropagation()}>
          {dirty ? (
            <Form.Group controlId="formFile">
              <Form.Label>Upload Your Avatar</Form.Label>
              <Form.Control type="file" onChange={handleImageUploaded} />
            </Form.Group>
          ) : null}
        </div>
        <Card.Body>
          <Card.Title>
            {dirty ? (
              <Form.Control
                type="text"
                value={contactInfo.name}
                placeholder="Candidate Name"
                onChange={(e) => handleTextChange(e, "name")}
              />
            ) : (
              contactInfo.name || "Candidate Name"
            )}
          </Card.Title>
          <Card.Subtitle className="mb-2">
            {dirty ? (
              <Form.Control
                type="text"
                value={contactInfo.title}
                placeholder="Candidate Title"
                onChange={(e) => handleTextChange(e, "title")}
              />
            ) : (
              contactInfo.title || "Candidate Title"
            )}
          </Card.Subtitle>
          <Card.Text className="mb-2">
            {dirty ? (
              <Form.Control
                type="email"
                value={contactInfo.email}
                placeholder="candidate@host.com"
                onChange={(e) => handleTextChange(e, "email")}
              />
            ) : (
              contactInfo.email || "candidate@host.com"
            )}
          </Card.Text>
        </Card.Body>
      </Card>
      <Card className="mb-3" onClick={enableEdit}>
        <Card.Header className="text-white">Contact Info</Card.Header>
        <Card.Body>
          <ListGroup variant="flush">
            {dirty ? (
              <>
                {optionalItems.map(([key, value, type, icon]) => (
                  <InputGroup className="mb-1" key={key}>
                    <InputGroup.Text>
                      <i className={`bi ${icon}`}></i>
                    </InputGroup.Text>
                    <Form.Control
                      key={key}
                      type={type}
                      value={value}
                      placeholder={key}
                      onChange={(e) => handleTextChange(e, key)}
                    />
                  </InputGroup>
                ))}
              </>
            ) : (
              optionalItems
                .filter(([, value]) => value)
                .map(([key, value, type, icon]) => (
                  <ListGroup.Item key={key}>
                    {
                      <i
                        className={`d-inline-block bi ${icon}`}
                        style={{ marginRight: "10px" }}
                      ></i>
                    }
                    {type === "url" ? (
                      <a href={value} target="_blank" rel="noreferrer">
                        {value}
                      </a>
                    ) : type === "tel" ? (
                      <a href={`tel:${value}`}>{value}</a>
                    ) : (
                      value
                    )}
                  </ListGroup.Item>
                ))
            )}
          </ListGroup>
        </Card.Body>
      </Card>
      {dirty ? (
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      ) : null}
    </Form>
  );
}
