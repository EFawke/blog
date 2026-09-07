import * as z from 'zod'

export const SigninFormSchema = z.object({
  name: z.string().min(2, { error: 'Enter your username or email.' }).trim(),
  password: z.string().min(1, { error: 'Enter your password.' }).trim(),
})

export const RegisterFormSchema = z.object({
  name: z
    .string()
    .min(2, { error: 'Name must be at least 2 characters long.' })
    .trim(),
  email: z.email({ error: 'Please enter a valid email.' }).trim(),
  password: z
    .string()
    .min(8, { error: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { error: 'Contain at least one letter.' })
    .regex(/[0-9]/, { error: 'Contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      error: 'Contain at least one special character.',
    })
    .trim(),
})
 
export type FormState =
  | {
      errors?: {
        name?: string[]
        email?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined


/* 
  old implementation of crud blog posts
  TODO: tidy up later
*/
export type BlogPostRow = {
    headerimage: string,
    tags: string[],
    blockorder: number,
    islive: boolean,
    blogdate: Date,
    blogid: number,
    blockcontent: string,
    blogtitle: string
}

export type BlogPostRowWithType = BlogPostRow & {
    blocktype: string;
};

export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
};