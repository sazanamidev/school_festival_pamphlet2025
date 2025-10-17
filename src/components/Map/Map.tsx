"use client";

import { useEffect } from "react";
import { setFlagsFromString } from "v8";

type Props = {
  setFloor: React.Dispatch<React.SetStateAction<number>>;
};
export const Map: React.FC<Props> = ({ setFloor }) => {
	useEffect(()=>{
		setFloor(2);
	},[setFloor]);
  return <h1>Hello Map</h1>;
};
