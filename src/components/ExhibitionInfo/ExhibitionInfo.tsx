type Props = {
  floor: number;
};
export const ExhibitionInfo: React.FC<Props> = ({ floor }) => {
  return (
    <>
      <h1>Hello ExhibitionInfo</h1>
      <h1>{floor}</h1>
    </>
  );
};
