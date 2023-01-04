import { ErrorMessage } from "formik";

interface Props {
  type?: "top" | "up" | "left" | "right";
  name: string;
}

const ErrorMessages = ({ type, name }: Props) => {
  return (
    <ErrorMessage
      component={"div"}
      className={`input-error-message ${type}`}
      name={name}
    />
  );
};

export default ErrorMessages;
