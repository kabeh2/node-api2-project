import React from "react";
import { useField } from "formik";
import { Input, Label, InputGroup, InputGroupAddon, Button } from "reactstrap";

const TextInput = ({ commentInput, label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <div className="mb-3">
      <Label htmlFor={props.id || props.name}>{label}</Label>

      {commentInput ? (
        <InputGroup>
          <Input
            invalid={meta.touched && meta.error && true}
            className="text-input"
            {...field}
            {...props}
          />
          <InputGroupAddon addonType="append">
            <Button type="submit" color="primary">
              Submit
            </Button>
          </InputGroupAddon>
        </InputGroup>
      ) : (
        <Input
          invalid={meta.touched && meta.error && true}
          className="text-input"
          {...field}
          {...props}
        />
      )}

      {meta.touched && meta.error ? (
        <div className="error" style={{ color: "red" }}>
          {meta.error}
        </div>
      ) : null}
    </div>
  );
};

export default TextInput;
