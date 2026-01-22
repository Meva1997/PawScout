export const dynamicParams = false;

export function generateStaticParams() {
  return [{ lang: "es-mx" }, { lang: "en" }];
}

export default function LangLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
