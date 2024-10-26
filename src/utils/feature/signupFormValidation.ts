import { z } from "zod";

export const signupSchemaValidate = (values: any) => {
  const registrationSchema = z
    .object({
      firstName: z.string().min(2, "First name must be at least 2 characters"),
      lastName: z.string().min(2, "Last name must be at least 2 characters"),
      emailId: z
        .string()
        .min(1, "Email address cannot be empty")
        .email("Invalid email address"),
      phoneNumber: z
        .string()
        .min(1, "Phone number cannot be empty")
        .regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
      password: z
        .string()
        .min(1, "Password cannot be empty")
        .min(6, "Password must be at least 6 characters"),
      confirmPassword: z.string().min(1, "Confirm password cannot empty"),
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
      let formattedErrors: any = {};
      for (const key in error.formErrors.fieldErrors) {
        if (
          error.formErrors &&
          error.formErrors.fieldErrors &&
          error.formErrors.fieldErrors[key]
        ) {
          formattedErrors[key] = error.formErrors.fieldErrors[key][0];
        }
      }

      return formattedErrors;
    }
  }
};
