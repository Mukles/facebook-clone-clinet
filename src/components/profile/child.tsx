interface Props {
  details: any;
  type: string;
}

const Child = ({ details, type }: Props) => {
  return (
    <>
      {details?.length && (
        <ul>
          {details.map((item: any, i: number) => (
            <li key={i}>
              <p>{item[type]}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Child;
