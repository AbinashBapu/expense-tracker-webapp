import { z } from "zod";

export const signupSchemaValidate = (values: any) => {
  const registrationSchema = z
    .object({
      firstName: z.string().min(2, "First name must be at least 2 characters"),
      lastName: z.string().min(2, "Last name must be at least 2 characters"),
      emailId: z.string().email("Invalid email address"),
      phoneNumber: z
        .string()
        .regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
      password: z.string().min(6, "Password must be at least 6 characters"),
      confirmPassword: z.string().min(1, "Confirm password is required"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Password & confirm password don't match",
      path: ["confirmPassword"],
    });

  try {
    registrationSchema.parse(values);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log("Error: " + JSON.stringify(error.formErrors.fieldErrors));
      return error.formErrors.fieldErrors;
    }
  }
};
