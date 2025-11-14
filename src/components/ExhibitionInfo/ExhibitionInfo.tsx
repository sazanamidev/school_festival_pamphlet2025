import React, { useEffect, useState } from 'react';

type Props = {
  floor: number;
};

type Exhibition = {
  floor: string | number;
  descrip?: string;
  description?: string;
};

export const ExhibitionInfo: React.FC<Props> = ({ floor }) => {
  const [info, setInfo] = useState<Exhibition[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetch('/data/ExhibitionInfo.json')
      .then(res => res.json())
      .then((data: Exhibition[]) => {
        if (!mounted) return;
        const found = data.filter(e => String(e.floor) === String(floor));
        setInfo(found.length > 0 ? found :null);
      })
      .catch(() => {
        if (mounted) setInfo(null);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [floor]);

  const floorText = floor === 0 ? '地下1階' : `${floor}階`;

  return (
    <div className="mx-auto my-6 w-full max-w-[760px] min-h-[180px] rounded-xl border-2 border-black bg-white px-6 py-6 shadow-[0_6px_18px_rgba(0,0,0,0.08)] flex flex-col">
      <div className="mb-4 flex w-full items-center justify-between">
        <span className="inline-flex items-center rounded-full border border-blue-600 bg-blue-600/10 px-3 py-1 text-sm font-semibold text-blue-700">
          {floorText}
        </span>
        {info && (
          <span className="text-xs text-gray-500">
            更新: {new Date().toLocaleDateString()}
          </span>
        )}
      </div>

      <div className="w-full">
                {!loading && info ? (
          info.map((item, idx) => (
            <p key={idx} className="m-0 whitespace-pre-line leading-relaxed text-[15px] text-gray-700 mb-3">
              {item.description ?? item.descrip ?? '説明がありません'}
            </p>
          ))
        ) : (
          <p className="m-0 text-gray-500">該当する展示情報が見つかりません。</p>
        )}
      </div>

      {!loading && !info && (
        <div className="mt-4">
          <button
            type="button"
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 transition hover:bg-gray-50"
            onClick={() => location.reload()}
          >
            再読み込み
          </button>
        </div>
      )}
    </div>
  );
};