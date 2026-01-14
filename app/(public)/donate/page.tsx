import AmountForm from "@/components/donate/AmountForm";
import HeroDonate from "@/components/donate/HeroDonate";
import MoneyInfo from "@/components/donate/MoneyInfo";
import SuccessStory from "@/components/donate/SuccessStory";

export default function page() {
  return (
    <>
      <main className="bg-gray-100 py-20">
        <section className="grid md:grid-cols-2 py-20 max-w-6xl mx-auto p-8 gap-10 items-start">
          <HeroDonate />
          <AmountForm />
        </section>
        <section>
          <MoneyInfo />
        </section>
        <section>
          <SuccessStory />
        </section>
      </main>
    </>
  );
}
