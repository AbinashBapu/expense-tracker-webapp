import { Fragment } from "react";
import Grid from "@mui/material/Grid";
import { Button, FormControl, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { signupSchemaValidate } from "@/utils/feature/signupFormValidation";

export default function SignUpForm() {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      emailId: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
    validate: signupSchemaValidate,
    onSubmit: (values) => {
      console.log(JSON.stringify(values));
      router.push("/dashboard");
    },
  });

  return (
    <Fragment>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2} sx={{ mb: 1 }}>
          <Grid size={6}>
            <FormControl fullWidth>
              <TextField
                name="firstName"
                label="First Name"
                variant="standard"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                }
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
            </FormControl>
          </Grid>
          <Grid size={6}>
            <FormControl fullWidth>
              <TextField
                name="lastName"
                label="Last Name"
                variant="standard"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.lastName && Boolean(formik.errors.lastName)
                }
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
            </FormControl>
          </Grid>
        </Grid>
        <FormControl fullWidth>
          <TextField
            sx={{ mb: 1 }}
            name="emailId"
            label="Email Id"
            variant="standard"
            value={formik.values.emailId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.emailId && Boolean(formik.errors.emailId)}
            helperText={formik.touched.emailId && formik.errors.emailId}
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            sx={{ mb: 1 }}
            name="phoneNumber"
            label="Phone Number"
            variant="standard"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
            }
            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            sx={{ mb: 1 }}
            name="password"
            label="Password"
            variant="standard"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            sx={{ mb: 1 }}
            name="confirmPassword"
            label="Confirm password"
            variant="standard"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
          />
        </FormControl>
        <Button variant="contained" fullWidth sx={{ mt: 2 }} type="submit">
          Sign Up
        </Button>
      </form>
    </Fragment>
  );
}
