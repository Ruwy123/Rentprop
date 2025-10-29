"use server";
import { getSessionUser } from "@/utils/getSessionUser";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import connectDB from "@/config/database";
import Property from "@/app/models/Property";
import cloudinary from "@/config/cloudinary";

async function AddProperty(formData) {
  await connectDB();
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("id is required");
  }

  const { userId } = sessionUser;

  const amenities = formData.getAll("amenities");
  const images = formData.getAll("images").filter((image) => image.name !== "");

  const propertyData = {
    owner: userId,
    type: formData.get("type"),
    name: formData.get("name"),
    description: formData.get("description"),
    location: {
      street: formData.get("location.street"),
      city: formData.get("location.city"),
      state: formData.get("location.state"),
      zipcode: formData.get("location.zipcode"),
    },
    beds: formData.get("beds"),
    baths: formData.get("baths"),
    square_feet: formData.get("square_feet"),
    amenities: amenities,
    rates: {
      nightly: formData.get("rates.nightly"),
      weekly: formData.get("rates.weekly"),
      monthly: formData.get("rates.monthly"),
    },
    seller_info: {
      name: formData.get("seller_info.name"),
      email: formData.get("seller_info.email"),
      phone: formData.get("seller_info.phone"),
    },
  };
  const imageUrls = [];
  for (const imageFile of images) {
    const imageBuffer = await imageFile.arrayBuffer();
    const imageArray = Array.from(new Uint8Array(imageBuffer));
    const imageData = Buffer.from(imageArray);
    //convert to Base64
    const imagebase64 = imageData.toString("base64");

    //make a request to cloudinary
    const result = await cloudinary.uploader.upload(
      `data:image/png;base64,${imagebase64}`,
      { folder: "realestateapp" }
    );
    imageUrls.push(result.secure_url);
  }
  propertyData.images = imageUrls;
  const newProperty = new Property(propertyData);
  await newProperty.save();
  revalidatePath("/", "layout");
  redirect(`/Properties/${newProperty._id}`);
}

export default AddProperty;
