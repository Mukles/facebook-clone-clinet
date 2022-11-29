import * as yup from "yup";

export const postSchema = yup.object().shape({
  caption: yup.string().required("caption is required"),
});
