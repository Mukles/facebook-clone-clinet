import { useField } from "formik";

const CustomInput = ({ ...props }: any) => {
  const [field, meta] = useField(props);
  return (
    <input
      {...field}
      {...props}
      className={
        meta.touched && meta.error
          ? "input-error w-100 input-field"
          : "w-100 input-field"
      }
    />
  );
};

export default CustomInput;
