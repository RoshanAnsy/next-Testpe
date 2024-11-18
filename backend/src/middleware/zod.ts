import {z} from "zod"

export const UserVote=z.object({
    name:z.string(),
    voting_choice:z.boolean(),
    casted_at:z.date(),
}).nullable()





const MAX_FILE_SIZE = 500000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const imageSchema = z.object({
  image: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.mimetype),
      " .jpg, .jpeg, .png and .webp"
    )
});