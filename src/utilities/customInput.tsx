import { useField } from "formik";
import ErrorMessages from "./errorMessage";

const CustomInput = ({ ...props }: any) => {
  const [field, meta] = useField(props);

  return (
    <>
      <input
        {...field}
        {...props}
        className={
          meta.touched && meta.error
            ? "input-error w-100 input-field"
            : "w-100 input-field"
        }
      />
      {meta.touched && meta.error && <ErrorMessages name={props.name} />}
    </>
  );
};

export default CustomInput;
