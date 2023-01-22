type Work = {
  // Fields for a work experience
};

type Study = {
  // Fields for an educational qualification
};

type University = {
  // Fields for a university or other institution of higher education
};

type CurrentCity = {
  // Fields for a current city of residence
};

type HomeTown = {
  // Fields for a home town or place of origin
};

export type Details = {
  work: Work[];
  study: Study[];
  university: University[];
  currentCity: CurrentCity[];
  homeTown: HomeTown[];
};

export interface IUser {
  _id?: string;
  userName?: string;
  email?: string;
  numberOfFriends?: number;
  friends?: IUser[];
  profilePicture?: string;
  converPicture?: string;
  gender?: string;
  dateOfBrith?: string;
  details?: Details;
  bio?: string;
}

export type Types =
  | "work"
  | "study"
  | "university"
  | "currentCity"
  | "homeTown";
