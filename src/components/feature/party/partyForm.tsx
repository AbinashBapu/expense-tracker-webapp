import React from "react";
import { useFormik } from "formik";
import { z } from "zod";

import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

const partySchema = z.object({
  partyName: z.string().min(1, "Name is required"),
  relation: z.string().min(1, "Relation type is required"),
});

type PartyFormValues = z.infer<typeof partySchema>;

const validate = (values: PartyFormValues) => {
  try {
    partySchema.parse(values);
    return {};
  } catch (error) {
    if (error instanceof z.ZodError) {
      return error.formErrors.fieldErrors;
    }
    return {};
  }
};

const PartyForm = ({
  closePartyDrawer,
  createAParty,
  reloadParties,
}: {
  closePartyDrawer: any;
  createAParty: any;
  reloadParties: any;
}) => {
  const formik = useFormik<PartyFormValues>({
    initialValues: {
      partyName: "",
      relation: "",
    },
    validate,
    onSubmit: async (values) => {
      console.log("Submitted Party Form", values);

      let payload = {
        name: values.partyName,
        relationType: values.relation,
      };

      createAParty([payload])
        .then((response: any) => {
          console.log("Party Saved: ", response);
          reloadParties();
          closePartyDrawer();
        })
        .catch((error: any) => {
          console.log("Some error occureed");
        });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormControl fullWidth variant="standard" sx={{ mb: 1 }}>
        <TextField
          label="Party Name"
          name="partyName"
          variant="standard"
          value={formik.values.partyName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.partyName && Boolean(formik.errors.partyName)}
          helperText={formik.touched.partyName && formik.errors.partyName}
        />
      </FormControl>

      <FormControl
        variant="standard"
        fullWidth
        sx={{ mb: 3 }}
        error={formik.touched.relation && Boolean(formik.errors.relation)}
      >
        <InputLabel id="relation-label">Relation</InputLabel>
        <Select
          labelId="relation-label"
          name="relation"
          value={formik.values.relation}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="Self">Self</MenuItem>
          <MenuItem value="Family">Family</MenuItem>
          <MenuItem value="ExtendedFamily">Extended Family</MenuItem>
          <MenuItem value="Relative">Relative</MenuItem>
          <MenuItem value="Friend">Friend</MenuItem>
          <MenuItem value="Unspecified">Unspecified</MenuItem>
        </Select>
        <FormHelperText>
          {formik.touched.relation && formik.errors.relation}
        </FormHelperText>
      </FormControl>

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          fullWidth
          size="small"
          variant="contained"
          color="primary"
          type="submit"
          sx={{ mr: 1 }}
        >
          Save
        </Button>
        <Button
          fullWidth
          size="small"
          variant="outlined"
          color="secondary"
          onClick={closePartyDrawer}
          sx={{ ml: 1 }}
        >
          Cancel
        </Button>
      </Box>
    </form>
  );
};

export default PartyForm;
