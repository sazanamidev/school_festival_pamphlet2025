'use client'
type Props = {
    setFloor: React.Dispatch<React.SetStateAction<number>>;
  };
export const Map: React.FC<Props> = ({setFloor}) =>{
    setFloor(2);
    return(
        <h1>Hello Map</h1>
    );
}