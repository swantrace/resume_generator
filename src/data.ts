import localforage from "localforage";

export type ApplicationRecord = {
  id: string;
  job: {
    description: string;
    company: string;
    position: string;
  };
  date: number;
  resume: string;
  coverLetter: string;
};

export type ContactInfo = {
  name: string;
  title: string;
  email: string;
  phone?: string;
  address?: string;
  website?: string;
  twitter?: string;
  github?: string;
  linkedin?: string;
};

export type EducationRecord = {
  school: string;
  degree: string;
  major: string;
  gpa?: number;
  startDate?: string;
  endDate?: string;
  description?: string;
}[];

export type WorkExperienceRecord = {
  company: string;
  position: string;
  startDate?: string;
  endDate?: string;
  description?: string;
}[];

export type ProjectRecord = {
  name: string;
  description?: string;
  link?: string;
}[];

export type SkillSet = {
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
}[];

export type MyProfile = {
  contactInfo: ContactInfo;
  educationRecord: EducationRecord;
  workExperienceRecord: WorkExperienceRecord;
  projectRecord: ProjectRecord;
  skillSet: SkillSet;
  avatar: string;
};

const profileStore = localforage.createInstance({
  name: "profile",
});

const recordsStore = localforage.createInstance({
  name: "records",
});

const getRecordSummary = async () => {
  const keys = await recordsStore.keys();
  return keys
    .map<{ company: string; position: string; date: number }>((key) => {
      const [company, position, date] = JSON.parse(atob(key));
      return { company, position, date, id: key };
    })
    .sort((a, b) => {
      return b.date - a.date;
    });
};

const getRecord = async (key: string) => {
  const record = await recordsStore.getItem<ApplicationRecord | null>(key);
  console.log("record", record);
  return record;
};

const saveRecord = async (record: ApplicationRecord) => {
  await recordsStore.setItem(record.id, record);
};

const saveContactInfo = async (contactInfo: ContactInfo) => {
  await profileStore.setItem("contactInfo", contactInfo);
};

const saveAvatar = async (avatar: string) => {
  await profileStore.setItem("avatar", avatar);
};

const saveEducationRecord = async (educationRecord: EducationRecord) => {
  await profileStore.setItem("educationRecord", educationRecord);
};

const saveWorkExperienceRecord = async (
  workExperienceRecord: WorkExperienceRecord
) => {
  await profileStore.setItem("workExperienceRecord", workExperienceRecord);
};

const saveProjectRecord = async (projectRecord: ProjectRecord) => {
  await profileStore.setItem("projectRecord", projectRecord);
};

const saveSkillSet = async (skillSet: SkillSet) => {
  await profileStore.setItem("skillSet", skillSet);
};

const saveProfile = async (profile: MyProfile) => {
  const rawResult = await Promise.allSettled([
    saveAvatar(profile.avatar),
    saveContactInfo(profile.contactInfo),
    saveEducationRecord(profile.educationRecord),
    saveWorkExperienceRecord(profile.workExperienceRecord),
    saveProjectRecord(profile.projectRecord),
    saveSkillSet(profile.skillSet),
  ]);

  const [
    rawAvatar,
    rawContactInfo,
    rawEducationRecord,
    rawWorkExperienceRecord,
    rawProjectRecord,
    rawSkillSet,
  ] = rawResult;

  const result = {
    avatar: rawAvatar.status === "fulfilled" ? rawAvatar.value : null,
    contactInfo:
      rawContactInfo.status === "fulfilled" ? rawContactInfo.value : null,
    educationRecord:
      rawEducationRecord.status === "fulfilled"
        ? rawEducationRecord.value
        : null,
    workExperienceRecord:
      rawWorkExperienceRecord.status === "fulfilled"
        ? rawWorkExperienceRecord.value
        : null,
    projectRecord:
      rawProjectRecord.status === "fulfilled" ? rawProjectRecord.value : null,
    skillSet: rawSkillSet.status === "fulfilled" ? rawSkillSet.value : null,
  };

  return result;
};

const getProfile = async () => {
  const rawResult = await Promise.allSettled([
    profileStore.getItem<string>("avatar"),
    profileStore.getItem<ContactInfo>("contactInfo"),
    profileStore.getItem<EducationRecord>("educationRecord"),
    profileStore.getItem<WorkExperienceRecord>("workExperienceRecord"),
    profileStore.getItem<ProjectRecord>("projectRecord"),
    profileStore.getItem<SkillSet>("skillSet"),
  ]);

  const [
    rawAvatar,
    rawContactInfo,
    rawEducationRecord,
    rawWorkExperienceRecord,
    rawProjectRecord,
    rawSkillSet,
  ] = rawResult as [any, any, any, any, any, any];
  console.log("rawResult", rawResult);
  console.log("rawAvatar", rawAvatar);
  console.log("rawContactInfo", rawContactInfo);
  console.log("rawEducationRecord", rawEducationRecord);
  const result = {
    avatar: rawAvatar?.value ?? "",
    contactInfo: rawContactInfo?.value ?? {
      name: "",
      title: "",
      email: "",
      phone: "",
      address: "",
      website: "",
      twitter: "",
      github: "",
      linkedin: "",
    },
    educationRecord: rawEducationRecord?.value ?? [],
    workExperienceRecord: rawWorkExperienceRecord?.value ?? [],
    projectRecord: rawProjectRecord?.value ?? [],
    skillSet: rawSkillSet?.value ?? [],
  };

  console.log("result", result);

  return result as MyProfile;
};

const recordsPageLoader = async () => {
  const recordSummary = await getRecordSummary();
  return { records: recordSummary };
};

export type RecordsPageData = {
  records: {
    company: string;
    position: string;
    date: number;
    id: string;
  }[];
};

const profilePageLoader = async () => {
  const profile = await getProfile();
  return { profile };
};

const generatorPageLoader = async ({
  params,
}: {
  params: Record<string, string>;
}) => {
  const profile = await getProfile();
  if (params.jobPostId === "new") {
    return {
      record: {
        job: {
          description: "",
          company: "",
          position: "",
        },
        date: null,
        resume: "",
        coverLetter: "",
      },
      profile,
    };
  }
  const record = await getRecord(params.jobPostId);
  return { record, profile };
};

const deleteRecord = async (key: string) => {
  await recordsStore.removeItem(key);
};

export {
  getRecordSummary,
  getRecord,
  saveRecord,
  saveProfile,
  getProfile,
  recordsPageLoader,
  profilePageLoader,
  generatorPageLoader,
  saveAvatar,
  saveContactInfo,
  saveEducationRecord,
  saveWorkExperienceRecord,
  saveProjectRecord,
  saveSkillSet,
  deleteRecord,
};
