import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../App/store";
import AddMoreSvg from "../../assets/messenger/addMoreSvg";
import AttachtFileSvg from "../../assets/messenger/attachaFileSvg";
import ChooseGiftSVg from "../../assets/messenger/chooseGift";
import ChooseSticker from "../../assets/messenger/chooseStickerSvg";
import ThumsUpSvg from "../../assets/messenger/thumsUpSvg";

import { useAddConversationMutation } from "../../App/features/conversation/conversationApi";

interface Props {
  recipient: string;
}

const MessengerForm = ({ recipient }: Props) => {
  const [message, setMessage] = useState<string>("");
  const sender = useSelector<RootState, string | undefined>(
    (state) => state.auth.user._id
  );

  const [addConversation, { isLoading, isSuccess }] =
    useAddConversationMutation();

  useEffect(() => {
    if (isSuccess) {
      setMessage("");
    }
  }, [isSuccess]);

  const submitHanlder: React.MouseEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (message) {
      addConversation({ sender, recipient, message });
      return;
    }
    return;
  };

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setMessage(value);
  };

  const onClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (message && !isLoading) {
      addConversation({ sender, recipient, message });
      return;
    }
    return;
  };

  return (
    <div className="d-flex gap-3 messenger-form align-items-center">
      <div className="icon">
        <AddMoreSvg />
      </div>

      <div className="icon">
        <AttachtFileSvg />
      </div>

      <div className="icon">
        <ChooseSticker />
      </div>

      <div className="icon">
        <ChooseGiftSVg />
      </div>

      <form className="flex-fill py-2" onSubmit={submitHanlder}>
        <input
          onChange={onChangeHandler}
          value={message}
          name="message"
          className="w-100 messenge-area"
          type={"text"}
          placeholder="Aa"
        />
      </form>

      <div className="thums-up">
        {message ? (
          <button
            className="submit-button"
            disabled={isLoading}
            onClick={onClickHandler}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
            </svg>
          </button>
        ) : (
          <ThumsUpSvg />
        )}
      </div>
    </div>
  );
};

export default MessengerForm;
