import React from "react";
import { useFormik } from "formik";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { loginSchemaValidate } from "@/utils/feature/loginFormValidation";
import { FormControl } from "@mui/material";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      emailId: "",
      password: "",
    },
    validate: loginSchemaValidate,
    onSubmit: (values) => {
      console.log(JSON.stringify(values));
      //   router.push("/dashboard");
      router.push("/dashboard");
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormControl fullWidth>
        <TextField
          sx={{ mb: 1 }}
          label="Email Id"
          variant="standard"
          name="emailId"
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
          label="Password"
          variant="standard"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
      </FormControl>

      <Button variant="contained" fullWidth sx={{ mt: 2 }} type="submit">
        Sign In
      </Button>
    </form>
  );
};

export default LoginForm;
