import React, { useCallback, useRef, useState } from "react";

function useForm<T>(
  initialValue: T
): [
  T,
  React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>,
  Function,
  any
] {
  const [value, setValue] = useState(initialValue);
  const formRef = useRef<HTMLFormElement | undefined>();

  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e: any) => {
    const { name, type, value, checked, files, multiple } = e.target;
    let updatedValue: any;

    if (["password", "text", "email", "radio", "select-one"].includes(type)) {
      updatedValue = value;
    } else if (type === "checkbox") {
      updatedValue = checked;
    } else if (type === "number") {
      updatedValue = parseInt(value) || undefined;
    } else if (type === "file") {
      if (multiple) {
        updatedValue = Array.from(files);
      } else {
        updatedValue = files[0];
      }
    }

    setValue((prev) => {
      return { ...prev, [name]: updatedValue };
    });
  };

  const clearForm: Function = useCallback(() => {
    setValue(initialValue);
    formRef?.current?.reset();
  }, [initialValue]);

  return [value, handleChange, clearForm, formRef];
}

export default useForm;
