import { skipToken } from "@reduxjs/toolkit/dist/query";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Oval } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  useAddSearchMutation,
  useDeleteSearchMutation,
  useGetSearchQuery,
  useSearchBynameQuery,
} from "../../App/features/search/searchApi";
import { RootState } from "../../App/store";
import defaultProfile from "../../assets/default/profile.png";
import { useDebounce } from "../../hooks/useDebouce";
import { IUser } from "../../types/userTypes";

interface Props {
  setShow: any;
  buttonRef: React.RefObject<HTMLDivElement>;
  serachRef: React.RefObject<HTMLDivElement>;
  search: string;
}

const SearchOverlay = ({ setShow, buttonRef, serachRef, search }: Props) => {
  const modal = useRef<HTMLDivElement>(null);
  const naviagate = useNavigate();
  const user = useSelector<RootState, IUser>((state) => state.auth.user);
  const [inputValue, setInputValue] = useState(search);
  const debouncedValue = useDebounce(inputValue, 500);
  const { isLoading, data } = useSearchBynameQuery(debouncedValue || skipToken);
  const [addSearch, { isLoading: isAdding }] = useAddSearchMutation();
  const [deleteSearch, { isLoading: isDeleting }] = useDeleteSearchMutation();
  const { isLoading: isSearchLoading, data: searchData } = useGetSearchQuery(
    user._id,
    { refetchOnFocus: true }
  );

  const submitHandler = (event: any, value: string) => {
    event.preventDefault();
    addSearch({ userId: user._id, search: value });
  };

  const deleteHandle = (event: any, value: string) => {
    event.preventDefault();
    deleteSearch({ search: value, userId: user._id });
  };

  useEffect(() => {
    const handleClick = (event: any) => {
      if (
        !modal.current?.contains(event.target) &&
        !buttonRef.current?.contains(event.target) &&
        !serachRef.current?.contains(event.target)
      ) {
        setShow(false);
      }
    };

    document.addEventListener("click", handleClick);

    return () => document.removeEventListener("click", handleClick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      ref={modal}
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="search-overlay d-block"
    >
      <div className="d-flex align-items-center">
        <div onClick={() => setShow(false)} className="arrow-icon">
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
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
        </div>
        <form onSubmit={(e) => submitHandler(e, inputValue)}>
          <motion.input
            value={inputValue}
            layoutId="input"
            type={"text"}
            placeholder="Search facebook"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInputValue(e.target.value)
            }
          />
        </form>
      </div>

      {false && (
        <motion.div className="mt-3">
          <AnimatePresence initial={false}>
            {inputValue ? (
              <>
                {data?.map((user: any) => {
                  const { _id, profilePicture, userName } = user || {};
                  return (
                    <Link
                      key={_id}
                      to={`/profile/${_id}`}
                      className="d-flex mt-2 search-item align-items-center rounded"
                      onClick={(e) => {
                        submitHandler(e, _id);
                        setShow(false);
                        naviagate(`/profile/${_id}`);
                      }}
                    >
                      <img
                        src={profilePicture || defaultProfile}
                        alt={userName}
                      />
                      <p>{userName}</p>
                    </Link>
                  );
                })}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Oval
                      height={30}
                      width={30}
                      color="#1876f2"
                      wrapperClass={"d-flex justify-content-center"}
                      visible={true}
                      ariaLabel="oval-loading"
                      secondaryColor="#65676b"
                      strokeWidth={5}
                      strokeWidthSecondary={2}
                    />
                  </motion.div>
                )}
              </>
            ) : (
              <>
                {isSearchLoading ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Oval
                      height={30}
                      width={30}
                      color="#1876f2"
                      wrapperClass={"d-flex justify-content-center"}
                      visible={true}
                      ariaLabel="oval-loading"
                      secondaryColor="#65676b"
                      strokeWidth={5}
                      strokeWidthSecondary={2}
                    />
                  </motion.div>
                ) : !isSearchLoading && searchData.length === 0 ? (
                  <p className="text-center">No recent searches</p>
                ) : (
                  <motion.div>
                    <div className="d-flex justify-content-between serach-header">
                      <h6>Recent searches</h6>
                      <button>Edit</button>
                    </div>
                    {searchData?.map((item: any, i: number) => {
                      return (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ opacity: { duration: 0.2 } }}
                        >
                          <Link
                            key={i}
                            to="/"
                            className="d-flex mt-2 search-item align-items-center rounded"
                          >
                            {true ? (
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
                                  d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                            ) : (
                              <img src={defaultProfile} alt="user" />
                            )}
                            <p>{item}</p>
                            <button
                              onClick={(e) => deleteHandle(e, item)}
                              type="button"
                              className="close"
                            >
                              &times;
                            </button>
                          </Link>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                )}
              </>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SearchOverlay;
