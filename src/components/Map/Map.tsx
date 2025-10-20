"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

import { useSwipeable } from "react-swipeable";

/**
 * 学園祭のフロアマップを表示するコンポーネント
 * 各階のSVG画像を切り替えて表示する
 */

// Propsの型定義
type Props = {
	setFloor: React.Dispatch<React.SetStateAction<number>>; // 親コンポーネントへの階数の状態更新関数
};

export const Map: React.FC<Props> = ({ setFloor }) => {
	// ローカルで現在の階数を管理
	const [floor, setLocalFloor] = useState(1);

	// 階数が変更されたら親コンポーネントに通知
	useEffect(() => {
		setFloor(floor);
	}, [floor, setFloor]);

	const handlers = useSwipeable({
		onSwipedUp:()=>setLocalFloor(f=>Math.max(3,f + 1)),
		onSwipedDown:()=>setLocalFloor(f=>Math.min(1,f - 1))

	})

	return (
		<div {...handlers} className="w-full text-center select-none">
			{/* 現在選択されている階のマップ画像を表示 */}
			{/* テスト用SVGのURLを指定している */}
			<Image src={`/test_Map/floor${floor}.svg`} alt={`Floor ${floor}`} width={500} height={500} />
			
			<div>
				{/* 階数選択ボタン */}
				<button onClick={() => setLocalFloor(0)}>B1階</button>
				<button onClick={() => setLocalFloor(1)}>1階</button>
				<button onClick={() => setLocalFloor(2)}>2階</button>
				<button onClick={() => setLocalFloor(3)}>3階</button>
				<button onClick={() => setLocalFloor(4)}>4階</button>
				<button onClick={() => setLocalFloor(5)}>5階</button>
				<button onClick={() => setLocalFloor(6)}>6階</button>
				<button onClick={() => setLocalFloor(7)}>7階</button>
				<button onClick={() => setLocalFloor(8)}>8階</button>
			</div>
			
		</div>
	);
};
