import * as yup from "yup";

export const postSchema = yup.object().shape({
  caption: yup.string().required("caption is required"),
  image: yup.object().shape({
    file: yup.mixed().required("File is required"),
  }),
});
