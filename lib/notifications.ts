import { prisma } from "@/lib/prisma"

export async function createNotification(
  title: string,
  message: string
) {
  return prisma.notification.create({
    data: { title, message, isRead: false },
  })
}
