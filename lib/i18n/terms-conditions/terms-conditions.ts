import type { HeroContentKey } from "../home/hero";

type TermsContentKey = HeroContentKey;

type TermsSection = {
  id: string;
  title: string;
  paragraphs: string[];
};

type TermsContent = {
  heroLabel: string;
  heroTitle: string;
  heroSubtitle: string;
  lastUpdated: string;
  tableOfContentsTitle: string;
  sections: TermsSection[];
  contactTitle: string;
  contactText: string;
};

const termsContent: Record<TermsContentKey, TermsContent> = {
  "es-mx": {
    heroLabel: "Documentos Legales",
    heroTitle: "Términos y Condiciones",
    heroSubtitle:
      "Lee detenidamente estos términos antes de utilizar nuestros servicios o enviar cualquier formulario.",
    lastUpdated: "Última actualización: 15 de mayo de 2026",
    tableOfContentsTitle: "Contenido",
    sections: [
      {
        id: "general",
        title: "1. Información General",
        paragraphs: [
          "Bienvenido a PawScout. Al acceder y utilizar este sitio web, aceptas cumplir con los presentes Términos y Condiciones. Si no estás de acuerdo con alguno de estos términos, te pedimos que no utilices nuestros servicios.",
          "PawScout es una plataforma digital de adopción de mascotas que conecta animales en situación de vulnerabilidad con familias que desean brindarles un hogar. Nos reservamos el derecho de modificar estos términos en cualquier momento; los cambios entrarán en vigor en el momento de su publicación en esta página.",
        ],
      },
      {
        id: "adoption",
        title: "2. Formulario de Adopción",
        paragraphs: [
          "Al completar y enviar el formulario de adopción, confirmas que la información proporcionada es veraz, completa y actualizada. Cualquier dato falso o incompleto puede resultar en la cancelación inmediata de tu solicitud.",
          "La recepción del formulario no garantiza la aprobación de la adopción. PawScout evaluará cada solicitud de forma individual considerando factores como entorno del hogar, historial con mascotas anteriores y compatibilidad con el animal seleccionado.",
          "El proceso de adopción implica una visita de verificación al domicilio del solicitante y la firma de un contrato de adopción responsable. El adoptante se compromete a proveer al animal con alimentación adecuada, atención veterinaria, un ambiente seguro y trato digno durante toda su vida.",
          "PawScout se reserva el derecho de realizar seguimientos post-adopción para garantizar el bienestar del animal. En caso de detectarse maltrato o negligencia, la organización podrá solicitar la devolución del animal y tomar las acciones legales correspondientes.",
        ],
      },
      {
        id: "volunteer",
        title: "3. Formulario de Voluntariado",
        paragraphs: [
          "Al postularte como voluntario en PawScout, aceptas que la información personal proporcionada (nombre, edad, datos de contacto, disponibilidad) será utilizada exclusivamente para la gestión interna del programa de voluntariado.",
          "La aceptación como voluntario queda sujeta a la revisión de tu solicitud y a la disponibilidad de actividades en tu área o modalidad de interés. PawScout se reserva el derecho de aceptar o rechazar solicitudes sin necesidad de justificación.",
          "Como voluntario, te comprometes a respetar las normas internas del refugio, mantener un trato respetuoso hacia los animales y el personal, y a notificar con anticipación cualquier cambio en tu disponibilidad o renuncia al programa.",
          "Las actividades de voluntariado no generan ningún tipo de relación laboral ni derecho a remuneración económica. PawScout no se responsabiliza por accidentes ocurridos durante las actividades voluntarias fuera de las instalaciones del refugio cuando el voluntario no haya seguido los protocolos de seguridad establecidos.",
        ],
      },
      {
        id: "donations",
        title: "4. Donaciones",
        paragraphs: [
          "Las donaciones realizadas a través de PawScout son voluntarias e irrevocables. Al completar el proceso de donación, aceptas que los fondos serán destinados al cuidado, alimentación, atención médica y rescate de animales bajo nuestra responsabilidad.",
          "PawScout gestiona las donaciones de forma transparente. Publicamos periódicamente informes de uso de fondos en nuestra plataforma. Si deseas información específica sobre el destino de tu donación, puedes contactarnos a través del formulario de contacto.",
          "Las donaciones en especie (alimento, medicamentos, artículos de higiene) deben coordinarse previamente con el equipo de PawScout para confirmar disponibilidad de espacio y necesidades actuales del refugio. No aceptamos artículos en mal estado o vencidos.",
          "PawScout no emite recibos fiscales deducibles de impuestos a menos que se indique expresamente lo contrario en campañas específicas. Consulta la legislación fiscal vigente en tu país para más información.",
        ],
      },
      {
        id: "privacy",
        title: "5. Privacidad y Uso de Datos",
        paragraphs: [
          "PawScout recopila únicamente los datos personales necesarios para operar sus servicios: formularios de adopción, voluntariado, contacto y suscripción al boletín. Esta información nunca será vendida ni cedida a terceros con fines comerciales.",
          "Los datos recopilados se almacenan en servidores seguros y son tratados conforme a las leyes de protección de datos personales aplicables. Implementamos medidas técnicas y organizativas razonables para proteger tu información contra acceso no autorizado, pérdida o alteración.",
          "Tienes derecho a acceder, rectificar o solicitar la eliminación de tus datos personales en cualquier momento enviando un correo a nuestro equipo de soporte. Atenderemos tu solicitud en un plazo máximo de 15 días hábiles.",
          "Al suscribirte a nuestro boletín informativo, autorizas a PawScout a enviarte comunicaciones periódicas sobre animales disponibles, campañas y eventos. Puedes cancelar tu suscripción en cualquier momento mediante el enlace de baja incluido en cada correo.",
        ],
      },
      {
        id: "cookies",
        title: "6. Cookies",
        paragraphs: [
          "PawScout utiliza cookies esenciales para garantizar el correcto funcionamiento del sitio (gestión de sesión, preferencias de idioma). También empleamos cookies de análisis para entender cómo los usuarios interactúan con nuestra plataforma y mejorar la experiencia.",
          "Al continuar navegando en este sitio, aceptas el uso de cookies. Puedes gestionar o deshabilitar las cookies a través de la configuración de tu navegador, aunque esto puede afectar algunas funciones del sitio.",
        ],
      },
      {
        id: "liability",
        title: "7. Limitación de Responsabilidad",
        paragraphs: [
          "PawScout actúa como intermediario entre los animales en adopción y los posibles adoptantes. No nos hacemos responsables por daños materiales, lesiones o perjuicios derivados de la convivencia con un animal adoptado una vez completado el proceso de adopción y firmado el contrato correspondiente.",
          "El sitio web puede contener enlaces a sitios de terceros. PawScout no tiene control sobre el contenido de estos sitios y no asume responsabilidad alguna por su contenido, políticas de privacidad o prácticas.",
          "Nos esforzamos por mantener el sitio disponible en todo momento, pero no garantizamos la disponibilidad ininterrumpida del servicio. No seremos responsables por daños derivados de interrupciones, errores o problemas técnicos.",
        ],
      },
      {
        id: "jurisdiction",
        title: "8. Legislación Aplicable",
        paragraphs: [
          "Estos Términos y Condiciones se rigen por las leyes de México. Cualquier disputa que surja en relación con estos términos estará sujeta a la jurisdicción exclusiva de los tribunales competentes del domicilio de PawScout.",
          "Si alguna disposición de estos términos es declarada inválida o inaplicable, las demás disposiciones continuarán en plena vigencia.",
        ],
      },
    ],
    contactTitle: "¿Tienes preguntas?",
    contactText:
      "Si tienes dudas sobre estos términos o sobre cómo utilizamos tu información, no dudes en contactarnos a través de nuestro formulario de contacto. Nuestro equipo estará encantado de ayudarte.",
  },
  en: {
    heroLabel: "Legal Documents",
    heroTitle: "Terms and Conditions",
    heroSubtitle:
      "Please read these terms carefully before using our services or submitting any form.",
    lastUpdated: "Last updated: May 15, 2026",
    tableOfContentsTitle: "Contents",
    sections: [
      {
        id: "general",
        title: "1. General Information",
        paragraphs: [
          "Welcome to PawScout. By accessing and using this website, you agree to comply with these Terms and Conditions. If you disagree with any of these terms, please do not use our services.",
          "PawScout is a digital pet adoption platform that connects vulnerable animals with families who wish to provide them with a home. We reserve the right to modify these terms at any time; changes will take effect upon publication on this page.",
        ],
      },
      {
        id: "adoption",
        title: "2. Adoption Form",
        paragraphs: [
          "By completing and submitting the adoption form, you confirm that the information provided is truthful, complete, and up to date. Any false or incomplete data may result in the immediate cancellation of your application.",
          "Receipt of the form does not guarantee adoption approval. PawScout will evaluate each application individually, considering factors such as the home environment, history with previous pets, and compatibility with the selected animal.",
          "The adoption process involves a home verification visit and signing a responsible adoption contract. The adopter commits to providing the animal with adequate nutrition, veterinary care, a safe environment, and dignified treatment for life.",
          "PawScout reserves the right to conduct post-adoption follow-ups to ensure animal welfare. If mistreatment or neglect is detected, the organization may request the return of the animal and take appropriate legal action.",
        ],
      },
      {
        id: "volunteer",
        title: "3. Volunteer Form",
        paragraphs: [
          "By applying as a volunteer at PawScout, you agree that the personal information provided (name, age, contact details, availability) will be used exclusively for the internal management of the volunteer program.",
          "Acceptance as a volunteer is subject to review of your application and the availability of activities in your area or preferred modality. PawScout reserves the right to accept or reject applications without providing justification.",
          "As a volunteer, you commit to respecting the shelter's internal rules, maintaining respectful treatment toward the animals and staff, and notifying us in advance of any changes to your availability or withdrawal from the program.",
          "Volunteer activities do not create any employment relationship or right to financial compensation. PawScout is not responsible for accidents occurring during volunteer activities outside shelter facilities when the volunteer has not followed established safety protocols.",
        ],
      },
      {
        id: "donations",
        title: "4. Donations",
        paragraphs: [
          "Donations made through PawScout are voluntary and irrevocable. By completing the donation process, you agree that funds will be used for the care, feeding, medical attention, and rescue of animals under our responsibility.",
          "PawScout manages donations transparently. We periodically publish fund usage reports on our platform. If you want specific information about the destination of your donation, you can contact us through the contact form.",
          "In-kind donations (food, medications, hygiene items) must be coordinated in advance with the PawScout team to confirm available space and current shelter needs. We do not accept damaged or expired items.",
          "PawScout does not issue tax-deductible receipts unless expressly stated in specific campaigns. Please consult the applicable tax legislation in your country for more information.",
        ],
      },
      {
        id: "privacy",
        title: "5. Privacy and Data Use",
        paragraphs: [
          "PawScout only collects personal data necessary to operate its services: adoption, volunteer, contact, and newsletter subscription forms. This information will never be sold or shared with third parties for commercial purposes.",
          "Collected data is stored on secure servers and processed in accordance with applicable personal data protection laws. We implement reasonable technical and organizational measures to protect your information against unauthorized access, loss, or alteration.",
          "You have the right to access, rectify, or request the deletion of your personal data at any time by sending an email to our support team. We will respond to your request within a maximum of 15 business days.",
          "By subscribing to our newsletter, you authorize PawScout to send you periodic communications about available animals, campaigns, and events. You can unsubscribe at any time via the unsubscribe link included in every email.",
        ],
      },
      {
        id: "cookies",
        title: "6. Cookies",
        paragraphs: [
          "PawScout uses essential cookies to ensure the proper functioning of the site (session management, language preferences). We also use analytics cookies to understand how users interact with our platform and improve the experience.",
          "By continuing to browse this site, you accept the use of cookies. You can manage or disable cookies through your browser settings, although this may affect some site functions.",
        ],
      },
      {
        id: "liability",
        title: "7. Limitation of Liability",
        paragraphs: [
          "PawScout acts as an intermediary between animals available for adoption and potential adopters. We are not responsible for material damages, injuries, or harm resulting from living with an adopted animal once the adoption process is completed and the corresponding contract is signed.",
          "The website may contain links to third-party sites. PawScout has no control over the content of these sites and assumes no responsibility for their content, privacy policies, or practices.",
          "We strive to keep the site available at all times, but we do not guarantee uninterrupted service availability. We will not be liable for damages resulting from interruptions, errors, or technical problems.",
        ],
      },
      {
        id: "jurisdiction",
        title: "8. Applicable Law",
        paragraphs: [
          "These Terms and Conditions are governed by the laws of Mexico. Any dispute arising in connection with these terms will be subject to the exclusive jurisdiction of the competent courts at PawScout's registered address.",
          "If any provision of these terms is declared invalid or unenforceable, the remaining provisions will continue in full force.",
        ],
      },
    ],
    contactTitle: "Have questions?",
    contactText:
      "If you have questions about these terms or how we use your information, feel free to contact us through our contact form. Our team will be happy to help you.",
  },
};

export function getTermsContent(lang?: string) {
  const normalizedLang: TermsContentKey = lang === "en" ? "en" : "es-mx";
  return {
    lang: normalizedLang,
    content: termsContent[normalizedLang],
  } as const;
}
