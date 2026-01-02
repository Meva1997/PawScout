export type DogsDataType = {
  id: number;
  name: string;
  age: string;
  size: string;
  breed: string;
  gender: string;
  shortDescription: string;
  longDescription: string;
  attributes: {
    goodWithKids: boolean;
    goodWithDogs: boolean;
    houseTrained: boolean;
  };
  availability: string;
  imageUrl: string;
};

export const dogsData: DogsDataType[] = [
  {
    id: 1,
    name: "Max",
    age: "8 años",
    size: "Mediano",
    breed: "Labrador",
    gender: "Macho",
    shortDescription: "Amistoso y juguetón.",
    longDescription:
      "Max es un labrador retriever de 8 años, conocido por su naturaleza amistosa y juguetona. Le encanta pasar tiempo con niños y otros perros, y es muy obediente y fácil de entrenar. Max está buscando un hogar amoroso donde pueda recibir mucho cariño y atención.",
    attributes: {
      goodWithKids: true,
      goodWithDogs: true,
      houseTrained: true,
    },
    availability: "Disponible",
    imageUrl: "/dog-smiling-camera.png",
  },
  {
    id: 2,
    name: "Bella",
    age: "1 año",
    size: "Pequeño",
    breed: "Beagle",
    gender: "Hembra",
    shortDescription: "Le encanta jugar y acurrucarse.",
    longDescription:
      "Bella es una beagle de 1 año llena de energía y amor. Le encanta jugar al aire libre y es muy cariñosa cuando se trata de acurrucarse. Bella es perfecta para familias activas que disfrutan de aventuras al aire libre y buscan una compañera leal.",
    attributes: {
      goodWithKids: true,
      goodWithDogs: true,
      houseTrained: true,
    },
    availability: "Disponible",
    imageUrl: "/dog-smiling-camera.png",
  },
  {
    id: 3,
    name: "Charlie",
    age: "7 años",
    size: "Grande",
    breed: "Pastor Alemán",
    gender: "Macho",
    shortDescription: "Calmado y cariñoso.",
    longDescription:
      "Charlie es un pastor alemán de 7 años conocido por su naturaleza calmada y cariñosa. Es un perro muy leal y protector, ideal para familias que buscan un compañero confiable. Charlie se lleva bien con niños y otros perros, y está listo para encontrar su hogar definitivo.",
    attributes: {
      goodWithKids: true,
      goodWithDogs: true,
      houseTrained: true,
    },
    availability: "Disponible",
    imageUrl: "/dog-smiling-camera.png",
  },
  {
    id: 4,
    name: "Lucy",
    age: "6 años",
    size: "Mediano",
    breed: "Bulldog",
    gender: "Hembra",
    shortDescription: "Muy cariñosa e inteligente.",
    longDescription:
      "Lucy es una bulldog de 6 años que destaca por su inteligencia y naturaleza cariñosa. Es una compañera leal que disfruta de la compañía humana y es excelente con niños. Lucy está buscando un hogar donde pueda recibir mucho amor y atención.",
    attributes: {
      goodWithKids: true,
      goodWithDogs: true,
      houseTrained: true,
    },
    availability: "Disponible",
    imageUrl: "/dog-smiling-camera.png",
  },
  {
    id: 5,
    name: "Daisy",
    age: "1 año",
    size: "Pequeño",
    breed: "Poodle",
    gender: "Hembra",
    shortDescription: "Le encanta jugar y acurrucarse.",
    longDescription:
      "Daisy es una poodle de 1 año llena de energía y amor. Le encanta jugar al aire libre y es muy cariñosa cuando se trata de acurrucarse. Daisy es perfecta para familias activas que disfrutan de aventuras al aire libre y buscan una compañera leal.",
    attributes: {
      goodWithKids: true,
      goodWithDogs: true,
      houseTrained: true,
    },
    availability: "Disponible",
    imageUrl: "/dog-smiling-camera.png",
  },
  {
    id: 6,
    name: "Rocky",
    age: "8 años",
    size: "Grande",
    breed: "Rottweiler",
    gender: "Macho",
    shortDescription: "Fuerte y leal.",
    longDescription:
      "Rocky es un rottweiler de 8 años conocido por su fuerza y lealtad. Es un perro protector que se lleva bien con niños y otros perros cuando se socializa adecuadamente. Rocky está buscando un hogar donde pueda sentirse seguro y amado.",
    attributes: {
      goodWithKids: true,
      goodWithDogs: true,
      houseTrained: true,
    },
    availability: "Disponible",
    imageUrl: "/dog-smiling-camera.png",
  },
  {
    id: 7,
    name: "Molly",
    age: "7 años",
    size: "Mediano",
    breed: "Golden Retriever",
    gender: "Hembra",
    shortDescription: "Gentil y sabia.",
    longDescription:
      "Molly es una golden retriever de 7 años conocida por su naturaleza gentil y sabia. Es una compañera leal que disfruta de la compañía humana y es excelente con niños. Molly está buscando un hogar donde pueda recibir mucho amor y atención.",
    attributes: {
      goodWithKids: true,
      goodWithDogs: true,
      houseTrained: true,
    },
    availability: "Disponible",
    imageUrl: "/dog-smiling-camera.png",
  },
  {
    id: 8,
    name: "Buddy",
    age: "10 años",
    size: "Grande",
    breed: "Boxer",
    gender: "Macho",
    shortDescription: "Fuerte y protector.",
    longDescription:
      "Buddy es un boxer de 10 años conocido por su fuerza y naturaleza protectora. Es un perro leal que se lleva bien con niños y otros perros cuando se socializa adecuadamente. Buddy está buscando un hogar donde pueda sentirse seguro y amado.",
    attributes: {
      goodWithKids: true,
      goodWithDogs: true,
      houseTrained: true,
    },
    availability: "Disponible",
    imageUrl: "/dog-smiling-camera.png",
  },
];
