import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setIndex } from "../../App/features/auth/authSlice";
import SingleChat from "./singChat";

const MessengerMenu = () => {
  const ref = useRef<any>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    ref.current?.addEventListener("scroll", function (e: any) {
      if (ref.current?.scrollTop > 50) {
        menuRef.current?.classList.add("scrolled-bottom");
      } else {
        menuRef.current?.classList.remove("scrolled-bottom");
      }
    });
  });

  return (
    <>
      <div
        ref={menuRef}
        className="menu-header d-flex d-md-none p-2 d-lg-flex flex-column gap-3"
      >
        <div className="d-flex justify-content-between align-items-center">
          <h2>Chats</h2>
          <div className="icons-wrapper d-flex gap-3">
            <div className="icon d-none d-lg-flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
            </div>
            <div className="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
                />
              </svg>
            </div>
            <div className="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
            </div>
          </div>
        </div>

        <input
          className="w-100 messenger-search"
          type={"search"}
          name="search"
          id="search"
          placeholder="Search messenger"
        />

        <div className="d-lg-flex gap-2 align-items-center messenger-button d-none">
          <button className="active">Inbox</button>
          <button>Communities</button>
        </div>
      </div>

      {
        <ul
          ref={ref}
          className="chat-lists d-flex flex-column mt-2 py-2 overflow-y-auto"
        >
          {Array(10)
            .fill("")
            .map((conversation, idx) => (
              <Link
                to={`/messenger/${idx + 1}`}
                key={idx + 1}
                className="text-decoration-none"
                onClick={() => dispatch(setIndex(8))}
              >
                <SingleChat />
              </Link>
            ))}
        </ul>
      }
    </>
  );
};

export default MessengerMenu;
