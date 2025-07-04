import { db } from "@/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export const addNotification = async ({
  userId,
  message,
  type,
  link,
}: {
  userId: string;
  message: string;
  type: "info" | "success" | "error";
  link?: string;
}) => {
  if (!userId) return;
  try {
    const ref = collection(db, "notifications", userId, "items");
    await addDoc(ref, {
      message,
      type,
      link: link || null,
      read: false,
      createdAt: serverTimestamp(),
    });
  } catch (err) {
    console.error("❌ Ошибка при создании уведомления:", err);
  }
};
