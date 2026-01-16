const subscribeers = [
  { email: "email@email.com" },
  { email: "example@example.com" },
  { email: "test@test.com" },
  { email: "user@domain.com" },
  { email: "newuser@newdomain.com" },
];
export default function NewsSubscribers() {
  return (
    <>
      <article className="my-6  max-w-7xl mx-auto table-auto rounded-2xl overflow-x-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-2 text-center">
        {subscribeers.map((subscriber, index) => (
          <div
            key={`${subscriber.email}-${index}`}
            className="rounded-2xl border border-white/10 bg-white/5 p-4 text-white wrap-break-word"
          >
            {subscriber.email}
          </div>
        ))}
      </article>
    </>
  );
}
