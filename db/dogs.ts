export type DogsDataType = {
  id: number;
  name: string;
  age: number;
  size: string;
  breed: string;
  gender: string;
  shortDescription: string;
  longDescription: string;
  // attributes: {
  goodWithKids: boolean;
  goodWithDogs: boolean;
  homeTrained: boolean;
  // };
  availableForAdoption: string;
  media: { url: string }[];
};
