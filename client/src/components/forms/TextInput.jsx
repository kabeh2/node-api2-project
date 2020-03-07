import React from "react";
import { useField } from "formik";
import { Input, Label } from "reactstrap";

const TextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <div className="mb-3">
      <Label htmlFor={props.id || props.name}>{label}</Label>
      <Input
        invalid={meta.touched && meta.error}
        className="text-input"
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="error" style={{ color: "red" }}>
          {meta.error}
        </div>
      ) : null}
    </div>
  );
};

export default TextInput;
