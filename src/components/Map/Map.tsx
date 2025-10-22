"use client";
import Image from "next/image";
import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Pagination } from "swiper/modules";
import { Swiper as SwiperType } from "swiper";


import "swiper/css";
import "swiper/css/pagination";

type Props = {
	setFloor: React.Dispatch<React.SetStateAction<number>>;
};

export const Map: React.FC<Props> = ({ setFloor }) => {
	const floors = Array.from({ length: 9 }, (_, i) =>8 - i); // 0〜8階 (B1〜8階)

	useEffect(() => {
		setFloor(1); // 初期階
	}, [setFloor]);

	return (
		<div className="w-full h-full text-center">
			<Swiper
				direction="vertical" // 上下にスワイプ
				modules={[Mousewheel, Pagination]}
				mousewheel={true}
				pagination={{ clickable: true }}
				initialSlide={7}
				onSlideChange={(swiper: SwiperType) => {
					const floor = floors[swiper.activeIndex];
					setFloor(floor);
				}}
				className="h-[500px]" // 高さを調整
			>
				{floors.map((floor) => (
					<SwiperSlide key={floor}>
						<div className="flex flex-col items-center justify-center h-full">
							<Image
								src={`/test_Map/floor${floor}.svg`}//本番時には適切なURLにしてください
								alt={`Floor ${floor}`}
								width={500}
								height={500}
							/>
							<p className="mt-2">{floor === 0 ? "B1階" : `${floor}階`}</p>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};
