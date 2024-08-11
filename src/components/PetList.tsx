import Image from "next/image";
import React from "react";

export default function PetList({ pets }) {
  return (
    <ul className="bg-white border-b border-black/[0.08]">
      {pets.map((pet) => (
        <li key={pet.key}>
          <button className="flex h-[70px] items-center w-full cursor-pointer px-5 text-base gap-3 hover:bg-[#eff1f2] focus:bg-[#eff1f2] transition">
            <Image
              src={pet.imageUrl}
              alt="Pet image"
              width={45}
              height={45}
              className="rounded-full object-cover"
            />
            <p className="font-semibold">{pet.name}</p>
          </button>
        </li>
      ))}
    </ul>
  );
}
