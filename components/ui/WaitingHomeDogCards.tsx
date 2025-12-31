import Image from "next/image";

type WaitingHomeDogCardsProps = {
  src: string;
  name: string;
  subtitle: string;
  breed: string;
  age: string;
};

export default function WaitingHomeDogCards({
  src,
  name,
  subtitle,
  breed,
  age,
}: WaitingHomeDogCardsProps) {
  return (
    <>
      <div className="w-full max-w-xs bg-white rounded-2xl shadow-md overflow-hidden mx-auto">
        <Image
          src={src}
          alt={`Image of ${name}, a dog waiting for a home`}
          width={300}
          height={300}
          className="rounded-t-2xl object-cover w-full"
        />
        <div className=" bg-gray-100 p-4 rounded-b-2xl">
          <h5 className="text-xl font-bold text-black">{name}</h5>
          <p className="text-gray-500">{subtitle}</p>
          <p className="text-gray-700 mt-2 font-bold">
            Raza: <span className="font-semibold text-gray-500">{breed}</span>
          </p>
          <p className="text-gray-700 font-bold">
            Edad: <span className="font-semibold text-gray-500">{age}</span>
          </p>
        </div>
      </div>
    </>
  );
}
