import { FastField } from "formik";
import { useEffect, useRef } from "react";
interface Props {
  type: "post" | "comment";
  name: string;
  placeholder: string;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
  submitForm?: () => Promise<any>;
}

let scrollHeightBefore = 0;
let less = false;

const TextArea = ({
  name,
  type,
  placeholder,
  submitForm,
  setFieldValue,
}: Props) => {
  const limit = type === "post" ? 500 : Infinity;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    function adjustFont(textarea: HTMLTextAreaElement) {
      scrollHeightBefore =
        scrollHeightBefore !== 0 ? scrollHeightBefore : textarea.scrollHeight;
      const scrollHeightAfter = less
        ? scrollHeightBefore
        : textarea.scrollHeight;

      if (scrollHeightAfter > scrollHeightBefore) {
        textarea.style.fontSize = "14px";
        scrollHeightBefore = scrollHeightAfter;
      }
    }

    const handleInput = (e: any) => {
      const { name, value } = e.target;
      textarea.style.height = ""; // reset the height
      textarea.style.height = Math.min(textarea.scrollHeight, limit) + "px"; // set the height
      setFieldValue(name, value); // set value to the formik
      type === "post" && adjustFont(e.target);
    };

    const handleKeyDown = (event: any) => {
      if (event.key === "Enter" && event.shiftKey && type === "comment") {
        console.log({ shift: event.shiftKey });
        // event.preventDefault();
      } else if (event.key === "Enter" && type === "comment") {
        event.preventDefault();
        submitForm && submitForm();
      }
    };

    //input event
    textarea.addEventListener("input", handleInput);

    //keydown event
    textarea.addEventListener("keydown", handleKeyDown);
    return () => {
      textarea.removeEventListener("keydown", handleKeyDown);
      textarea.removeEventListener("input", handleInput);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FastField name={name}>
      {({ field, form }: any) => {
        return (
          <textarea
            ref={textareaRef}
            className="w-100"
            {...field}
            placeholder={placeholder}
          />
        );
      }}
    </FastField>
  );
};

export default TextArea;
