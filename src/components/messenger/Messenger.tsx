import MessengerLayout from "../../layout/MessengerLayout";
import MessengesBody from "./message-body";

const Messenger = () => {
  return (
    <div className="messenger row p-0">
      <MessengerLayout>
        <div className="col d-md-block d-none h-100 p-0 m-0">
          <div className="messenger-right-side">
            <MessengesBody />
          </div>
        </div>
      </MessengerLayout>
    </div>
  );
};

export default Messenger;
