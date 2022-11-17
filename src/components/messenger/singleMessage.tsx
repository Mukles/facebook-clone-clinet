interface justify {
  justify: "start" | "end";
}

const SingleMessage = ({ justify }: justify) => {
  return (
    <li className={`d-flex justify-content-${justify} single-message`}>
      <div className={justify === "end" ? "bg-blue" : "bg-gray"}>
        <p className="mb-1">dsfkljsadkflsadjfk</p>
        <span className="ms-end d-block">8:45 PM</span>
      </div>
    </li>
  );
};

export default SingleMessage;
