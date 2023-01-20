import { forwardRef } from "react";

interface Props {
  setOpen: any;
}

const Option = forwardRef<HTMLUListElement, Props>(({ setOpen }, ref) => {
  return (
    <ul ref={ref} className="comment-option shadow-lg rounded">
      <li onClick={() => setOpen(false)}>Delete</li>
      <li>Hide Comment</li>
      <li>Report Comment</li>
    </ul>
  );
});

export default Option;
