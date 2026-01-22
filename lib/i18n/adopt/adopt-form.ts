import type { HeroContentKey } from "../home/hero";

type AdoptFormContentKey = HeroContentKey;

type TextFieldCopy = {
  label: string;
  placeholder?: string;
};

type TextAreaCopy = {
  title: string;
  placeholder: string;
};

type AdoptFormContent = {
  header: {
    formTitle: string;
    formDescription: string;
    applyingFor: string;
    noImage: string;
  };
  attributes: {
    kids: string;
    dogs: string;
    houseTrained: string;
  };
  yesNo: {
    yes: string;
    no: string;
  };
  gender: {
    genderMale: string;
    genderFemale: string;
  };
  personalInfoTitle: string;
  fields: {
    firstName: TextFieldCopy;
    lastName: TextFieldCopy;
    email: TextFieldCopy;
    phone: TextFieldCopy;
    address: TextFieldCopy;
    city: TextFieldCopy;
    state: TextFieldCopy;
    postalCode: TextFieldCopy;
    birthDate: { label: string };
    occupation: TextFieldCopy;
  };
  interests: TextAreaCopy;
  experience: TextAreaCopy;
  homeInfo: {
    title: string;
    housingTypeLabel: string;
    housingOptions: {
      house: string;
      apartment: string;
    };
    householdLabel: string;
    householdPlaceholder: string;
  };
  terms: {
    text: string;
    linkText: string;
    suffix: string;
    buttonLabel: string;
  };
};

const adoptFormContent: Record<AdoptFormContentKey, AdoptFormContent> = {
  "es-mx": {
    header: {
      formTitle: "Formulario de Adopción",
      formDescription:
        "Completa el siguiente formulario para iniciar el proceso de adopción. Nos pondremos en contacto contigo pronto.",
      applyingFor: "Aplicando para:",
      noImage: "Sin imagen",
    },
    attributes: {
      kids: "Bueno con niños",
      dogs: "Bueno con perros",
      houseTrained: "Entrenado en casa",
    },
    yesNo: {
      yes: "Sí",
      no: "No",
    },
    gender: {
      genderMale: "Macho",
      genderFemale: "Hembra",
    },
    personalInfoTitle: "Información Personal",
    fields: {
      firstName: { label: "Primer Nombre", placeholder: "María" },
      lastName: { label: "Apellidos", placeholder: "González" },
      email: { label: "Correo Electrónico", placeholder: "maria@example.com" },
      phone: { label: "Teléfono", placeholder: "(123) 456-7890" },
      address: { label: "Dirección Completa", placeholder: "Calle Falsa 123" },
      city: { label: "Ciudad", placeholder: "Ciudad" },
      state: { label: "Estado/Provincia", placeholder: "Estado/Provincia" },
      postalCode: { label: "Código Postal", placeholder: "Código Postal" },
      birthDate: { label: "Fecha de Nacimiento" },
      occupation: { label: "Ocupación", placeholder: "Ocupación" },
    },
    interests: {
      title: "Intereses",
      placeholder:
        "¿Por qué quieres adoptar esta mascota? ¿Tienes experiencia previa con mascotas y cuáles?",
    },
    experience: {
      title: "Experiencia con Mascotas",
      placeholder:
        "Describe tu experiencia previa con mascotas, si has tenido mascotas antes, y cómo las has cuidado.",
    },
    homeInfo: {
      title: "Información del Hogar",
      housingTypeLabel: "Tipo de vivienda",
      housingOptions: {
        house: "Casa",
        apartment: "Apartamento",
      },
      householdLabel: "¿Quiénes residen en el hogar?",
      householdPlaceholder:
        "Por favor agrega una lista de adultos (Mayores de 18 años), niños (con edades) y el ambiente familiar",
    },
    terms: {
      text: "Acepto los",
      linkText: "términos y condiciones",
      suffix:
        ". Estoy de acuerdo en que los datos proporcionados serán utilizados conforme a la política de privacidad.",
      buttonLabel: "Enviar Solicitud de Adopción",
    },
  },
  en: {
    header: {
      formTitle: "Adoption Form",
      formDescription:
        "Fill out the form below to start the adoption process. We will contact you soon.",
      applyingFor: "Applying for:",
      noImage: "No image",
    },
    attributes: {
      kids: "Good with kids",
      dogs: "Good with dogs",
      houseTrained: "House trained",
    },
    yesNo: {
      yes: "Yes",
      no: "No",
    },
    gender: {
      genderMale: "Male",
      genderFemale: "Female",
    },
    personalInfoTitle: "Personal Information",
    fields: {
      firstName: { label: "First Name", placeholder: "Maria" },
      lastName: { label: "Last Name", placeholder: "Gonzalez" },
      email: { label: "Email", placeholder: "maria@example.com" },
      phone: { label: "Phone", placeholder: "(123) 456-7890" },
      address: { label: "Full Address", placeholder: "123 Main Street" },
      city: { label: "City", placeholder: "City" },
      state: { label: "State/Province", placeholder: "State/Province" },
      postalCode: { label: "Postal Code", placeholder: "Postal Code" },
      birthDate: { label: "Date of Birth" },
      occupation: { label: "Occupation", placeholder: "Occupation" },
    },
    interests: {
      title: "Interests",
      placeholder:
        "Why do you want to adopt this pet? Do you have previous experience with pets and which ones?",
    },
    experience: {
      title: "Pet Experience",
      placeholder:
        "Describe your previous experience with pets, if you have had pets before, and how you took care of them.",
    },
    homeInfo: {
      title: "Home Information",
      housingTypeLabel: "Type of housing",
      housingOptions: {
        house: "House",
        apartment: "Apartment",
      },
      householdLabel: "Who lives in the household?",
      householdPlaceholder:
        "Please add a list of adults (over 18), children (with ages), and describe the family environment.",
    },
    terms: {
      text: "I agree to the",
      linkText: "terms and conditions",
      suffix:
        ". I agree that the provided data will be used according to the privacy policy.",
      buttonLabel: "Submit Adoption Application",
    },
  },
};

export function getAdoptFormContent(lang?: string) {
  const normalizedLang: AdoptFormContentKey = lang === "en" ? "en" : "es-mx";
  return {
    lang: normalizedLang,
    content: adoptFormContent[normalizedLang],
  } as const;
}
