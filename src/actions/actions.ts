"use server";
import { signIn, signOut } from "@/lib/auth";
import prisma from "@/lib/db";

import { sleep } from "@/lib/utils";
import { authSchema, petFormSchema, petIdSchema } from "@/lib/validation";

import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

import { redirect } from "next/navigation";
import { checkAuth, getPetById } from "@/lib/server-utils";

//user actions

export async function login(formData: unknown) {
  if (!(formData instanceof FormData)) {
    return {
      message: "invalid form data",
    };
  }
  await signIn("credentials", formData);
  redirect("app/dashboard");
}

export async function signUp(formData: unknown) {
  //check if form data is it
  if (!(formData instanceof FormData)) {
    return {
      message: "invalid form data",
    };
  }

  const formDataEntries = Object.fromEntries(formData.entries());

  //validation
  const validateFormData = authSchema.safeParse(formDataEntries);
  if (!validateFormData.success) {
    return {
      message: "Invalid form data",
    };
  }
  const { email, password } = validateFormData.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: {
      email,
      hashedPassword,
    },
  });
  await signIn("credentials", formData);
}

export async function logOut() {
  await signOut({ redirectTo: "/" });
}

// pet actions
export async function addPet(pet: unknown) {
  await sleep(1000);

  const session = await checkAuth();

  const validatedPet = petFormSchema.safeParse(pet);
  if (!validatedPet.success) {
    return {
      message: "Invalid pet data",
    };
  }

  try {
    await prisma.pet.create({
      data: {
        ...validatedPet.data,
        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });
  } catch (error) {
    return {
      message: "Could not add pet.",
    };
  }

  revalidatePath("/app", "layout");
}

export async function editPet(petId: unknown, newPetData: unknown) {
  //authentication
  const session = await checkAuth();
  //validation
  const validatedPetId = petIdSchema.safeParse(petId);
  const validatedPet = petFormSchema.safeParse(newPetData);

  if (!validatedPetId.success || !validatedPet.success) {
    return {
      message: "Invalid pet data",
    };
  }

  //authorization
  const pet = await getPetById(validatedPetId.data);
  if (!pet) {
    return {
      message: "Pet not found",
    };
  }
  if (pet.userId !== session.user?.id) {
    return {
      message: "Unauthorized to edit this pet",
    };
  }

  try {
    await prisma.pet.update({
      where: { id: validatedPetId.data },
      data: validatedPet.data,
    });
  } catch (error) {
    return {
      message: "could not update pet",
    };
  }
  revalidatePath("/app", "layout");
}

export async function deletePet(petId: unknown) {
  const validatedPetId = petIdSchema.safeParse(petId);
  if (!validatedPetId.success) {
    return {
      message: "Invalid pet data",
    };
  }

  //authorization
  const session = await checkAuth();

  const pet = await getPetById(validatedPetId.data);

  if (!pet) {
    return {
      message: "Pet not found",
    };
  }

  if (pet.userId !== session.user.id) {
    return {
      message: "You are not authorized to delete this pet",
    };
  }

  //database mutation
  try {
    await prisma.pet.delete({
      where: { id: validatedPetId.data },
    });
  } catch (error) {
    return {
      message: "pet could not be deleted",
    };
  }
  revalidatePath("/app", "layout");
}
