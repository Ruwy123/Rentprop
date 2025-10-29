"use server";

import connectDB from "@/config/database";
import User from "@/app/models/User";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function bookmarkProperty(propertyId) {
  await connectDB();
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("id is required");
  }
  const { userId } = sessionUser;

  const user = await User.findById(userId);
  let isBookmarked = user.bookmarks.includes(propertyId);

  let message;

  if (isBookmarked) {
    //remove from bookmark
    user.bookmarks.pull(propertyId);
    message = "bookmark removed";
    isBookmarked = false;
  } else {
    //add bookmark
    user.bookmarks.push(propertyId);
    message = "Bookmark added";
    isBookmarked = true;
  }
  await user.save();
  revalidatePath("/Properties/saved", "page");

  return { message, isBookmarked };
}
export default bookmarkProperty;
