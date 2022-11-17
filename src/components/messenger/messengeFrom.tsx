import AddMoreSvg from "../../assets/messenger/addMoreSvg";
import AttachtFileSvg from "../../assets/messenger/attachaFileSvg";
import ChooseGiftSVg from "../../assets/messenger/chooseGift";
import ChooseSticker from "../../assets/messenger/chooseStickerSvg";
import ThumsUpSvg from "../../assets/messenger/thumsUpSvg";

const MessengerForm = () => {
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

      <form className="flex-fill py-2">
        <input className="w-100 messenge-area" type={"text"} placeholder="Aa" />
      </form>

      <div className="thums-up">
        <ThumsUpSvg />
      </div>
    </div>
  );
};

export default MessengerForm;
