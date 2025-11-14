import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from '@heroui/react';

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
    <div className="mx-auto my-6 w-full max-w-[760px] rounded-2xl border border-gray-200 bg-gradient-to-b from-white to-gray-50 px-6 py-6 shadow-lg ring-1 ring-black/5">
      <div className="mb-4 flex w-full items-center justify-between">
        <span className="inline-flex items-center rounded-full border border-blue-600 bg-blue-600/10 px-3 py-1 text-sm font-semibold text-blue-700">
          {floorText}
        </span>
        {info && (
          <span className="text-xs text-gray-500">更新: {new Date().toLocaleDateString()}</span>
        )}
      </div>

      <div className="w-full">
        <div
          key={floor}
          className="h-[30vh] sm:h-[480px] overflow-y-auto overscroll-contain pr-1"
        >
          {loading ? (
            <div className="space-y-3">
              <Card radius="sm" className="animate-pulse">
                <CardBody className="space-y-2">
                  <div className="h-4 w-3/4 rounded bg-gray-200" />
                  <div className="h-4 w-2/5 rounded bg-gray-200" />
                  <div className="h-4 w-1/2 rounded bg-gray-200" />
                </CardBody>
              </Card>
            </div>
          ) : info ? (
            <div className="grid gap-3">
              {info.map((item, idx) => (
                <Card
                  key={idx}
                  radius="sm"
                  shadow="sm"
                  className="border border-gray-200 transition-shadow hover:shadow-md"
                >
                  <CardHeader className="pb-0">
                    <h3 className="text-sm font-semibold text-gray-800 truncate">{floorText} 展示</h3>
                  </CardHeader>
                  <CardBody className="py-2">
                    <p className="whitespace-pre-line text-sm leading-relaxed text-gray-700">
                      {item.description ?? item.descrip ?? '説明がありません'}
                    </p>
                  </CardBody>
                </Card>
              ))}
            </div>
          ) : (
            <Card radius="sm" shadow="none" className="border border-dashed border-gray-300">
              <CardBody className="py-3">
                <p className="m-0 text-sm text-gray-500">該当する展示情報が見つかりません。</p>
              </CardBody>
            </Card>
          )}
        </div>
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