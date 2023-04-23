import { DataTypes } from "sequelize";

export const AdminSchema = {
  employeeId: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: () => true,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  profileImage: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  passwordResetToken: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  tokenTimestamp: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  dateOfBirth: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nationality: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  department: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  salary: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  jobTitle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  jobInfo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
};

export const AdminChangeLogSchema = {
  logId: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
  },
  employeeId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  action: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdBy: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};

export const FAQSchema = {
  faqId: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  question: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  answer: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  media: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};

export const AboutSchema = {
  aboutId: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
  },
  about: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};

export const PrivacySchema = {
  privacyId: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
  },
  privacy: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};

export const TermsAndConditionSchema = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
  },
  termsAndCondition: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};

export const CreatePointShema = {
  offerId: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
  },
  points: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
    default: 0,
  },
  createdBy: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};

export const TicketShema = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
  },

  ticketId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  username: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  resolveBy: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  issueTitle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  issueExpanation: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  submissionDate: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  assignedTo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  comments: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ticketStatus: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  resolutionDate: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};

export const PostReportedShema = {
  reportId: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  reporter: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  reasons: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  postId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};
export const UserSuspensionShema = {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  reasonForSuspension: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};
