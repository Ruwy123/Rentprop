"use server";
import cloudinary from "@/config/cloudinary";

import Property from "../models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function deleteProperty(propertyId) {
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("user id is required");
  }
  const { userId } = sessionUser;
  const property = await Property.findById(propertyId);
  if (!property) throw new Error("property not found");

  //verify ownership
  if (property.owner.toString() !== userId) {
    throw new Error("unauthorized");
  }
  //delete propertky
  await property.deleteOne();
  revalidatePath("/", "layout");

  //extract public id from images
  const publicIds = property.images.map((imageUrl) => {
    const parts = imageUrl.split("/");
    return parts.at(-1).split(".").at(0);
  });
}
export default deleteProperty;
