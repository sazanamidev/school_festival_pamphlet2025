"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import { Swiper as SwiperType } from "swiper";
import { Button } from "@heroui/react"
import "swiper/css";

type Props = {
	setFloor: React.Dispatch<React.SetStateAction<number>>;
};

export const Map: React.FC<Props> = ({ setFloor }) => {
	const floors = Array.from({ length: 9 }, (_, i) => 8 - i); // 8〜0階 (8階〜B1階)
	const swiperRef = useRef<SwiperType | null>(null);
	const [activeFloor, setActiveFloor] = useState(1);
	const defaultFloor = 1;
	const initialIndex = floors.findIndex(floor => floor === defaultFloor);


	useEffect(() => {
		setFloor(defaultFloor); // 初期階
		setActiveFloor(defaultFloor);
	}, [setFloor]);

	// ボタンから階層を変更する関数
	const jumpToFloor = (targetFloor: number) => {
		const slideIndex = floors.findIndex(floor => floor === targetFloor);
		if (slideIndex !== -1 && swiperRef.current) {
			swiperRef.current.slideTo(slideIndex);
		}
	};

	return (
		/*swiper本体部分 */
		<div className="w-full h-full text-center">
			<Swiper
				direction="vertical" // 上下にスワイプ
				modules={[Mousewheel]}
				mousewheel={true}
				pagination={false}
				initialSlide={initialIndex} // 1階から開始
				onSwiper={(swiper) => {
					swiperRef.current = swiper;
				}}
				onSlideChange={(swiper: SwiperType) => {
					const floor = floors[swiper.activeIndex];
					setFloor(floor);
					setActiveFloor(floor);
				}}
				className="h-[40vh] sm:h-[500px]" // 高さを調整
			>
				{floors.map((floor) => (
					<SwiperSlide key={floor}>
						<div className="flex flex-col items-center justify-center h-full">
							<Image
								src={`Map/${floor}.svg`}
								alt={`Floor ${floor}`}
								width={500}
								height={500}
							/>
							<p className="mt-2">{floor === 0 ? "B1階" : `${floor}階`}</p>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
			
			
			<div className="mt-4 flex flex-wrap justify-center gap-2">
				{floors.slice().reverse().map((floor) => ( // B1から8階の順番で表示
					<Button
						size="sm"
						isIconOnly
						key={floor}
						onPress={() => jumpToFloor(floor)}
						className={`px-0.5 rounded-md border transition-colors ${
							activeFloor === floor
								? 'bg-blue-500 text-white border-blue-500'
								: 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
						}`}
					>
						{floor === 0 ? 'B1' : `${floor}`}
					</Button>
				))}
			</div>
		</div>
	);
};
