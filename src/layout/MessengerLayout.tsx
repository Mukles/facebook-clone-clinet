import MessengerMenu from "../components/messenger/menu";

type Props = {
  children: JSX.Element;
};

const MessengerLayout = ({ children }: Props) => {
  return (
    <>
      <div className="col col-lg-4 col-md-2 h-100">
        <div className="messenger-left-side">
          <MessengerMenu />
        </div>
      </div>
      {children}
    </>
  );
};

export default MessengerLayout;
