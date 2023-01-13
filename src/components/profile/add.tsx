import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useUpdaterUserDetailsMutation } from "../../App/features/user/userApi";
import { RootState } from "../../App/store";
import { Types } from "../../types/userTypes";

interface Props {
  title: string;
  type: Types;
  isOwner?: boolean;
}

interface Field {
  feild: string;
  placeholder: string;
}

type Fields = Field[];

const shecma: { [K in Types]: Fields } = {
  work: [
    {
      feild: "company",
      placeholder: "Company",
    },
    {
      feild: "postion",
      placeholder: "Position",
    },
    {
      feild: "city",
      placeholder: "City/Town",
    },
  ],
  study: [
    {
      feild: "school",
      placeholder: "School",
    },
  ],
  university: [
    {
      feild: "school",
      placeholder: "School",
    },
  ],
  currentCity: [{ feild: "currentTown", placeholder: "current town/city" }],
  homeTown: [{ feild: "homeTown", placeholder: "current home/town" }],
};

const Add = ({ title, type, isOwner }: Props) => {
  const userId = useSelector<RootState, string | undefined>(
    (state) => state.auth.user._id
  );

  const [updateUser, { isLoading }] = useUpdaterUserDetailsMutation();

  const [isOpen, setOpen] = useState(false);
  const [data, setData] = useState<any>();

  if (data === undefined) {
    const init: any = {};
    shecma[type]?.forEach((element) => {
      init[element.feild] = "";
    });
    setData(init);
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const onClose = () => setOpen(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateUser({ userId, data: { [type]: data } });
  };

  const onOpen = (type: string) => {
    setOpen(true);
    setData({});
  };

  return (
    <motion.li className="about-info-add">
      <AnimatePresence>
        {!isOpen ? (
          <>
            {isOwner && (
              <motion.button
                onClick={() => onOpen(type)}
                className="d-flex align-items-center"
              >
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
                    d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p>{title}</p>
              </motion.button>
            )}
          </>
        ) : (
          <motion.form
            onSubmit={handleSubmit}
            className="w-100"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {shecma[type].map((item, i: number) => (
              <div className="input-container" key={i}>
                <input
                  onChange={handleChange}
                  id={item.feild}
                  type="text"
                  name={item.feild}
                />
                <label
                  className="label"
                  htmlFor={item.feild}
                  id={`label-${item.feild}`}
                >
                  <div className={`text ${data[item.feild] && "exit"}`}>
                    {item.placeholder}
                  </div>
                </label>
              </div>
            ))}
            <div className="button-group">
              <button disabled={isLoading} type="reset" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" disabled={isLoading}>
                Save
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.li>
  );
};

export default Add;
