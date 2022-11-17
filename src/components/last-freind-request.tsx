import img from "../assets/story/311888806_797128861505186_6075576457730166756_n.jpg";

const LastFriendRequest = () => {
  return (
    <>
      <div className="last-frd-req">
        <div className="d-flex justify-content-between req-header">
          <p className="mb-0 title">Friend requests</p>
          <button>See all</button>
        </div>

        <div className="mt-3 d-flex gap-3 wrapper p-2 overflow-hidden rounded">
          <div className="request-profile">
            <img src={img} width={50} height={50} alt="profile" />
          </div>

          <div className="flex-fill w-100 d-flex justify-content-between">
            <div className="req-info d-flex flex-column">
              <p className="mb-0">Mukles mukles</p>
              <div className="d-flex gap-2 mt-1">
                <div className="frd-profile">
                  <img src={img} width={22} height={22} alt="profile" />
                </div>
                <div className="frd-profile">
                  <img src={img} width={22} height={22} alt="profile" />
                </div>
                <span className="-mt-2">5 mutual friends</span>
              </div>

              <div className="buttons mt-1 d-flex gap-2 gap-xl-3">
                <button className="confirm">Confirm</button>
                <button className="delete">Delete</button>
              </div>
            </div>
            <span>1d</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default LastFriendRequest;
