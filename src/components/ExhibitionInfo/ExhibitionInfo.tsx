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
  const [info, setInfo] = useState<Exhibition | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetch('/data/ExhibitionInfo.json')
      .then((res) => res.json())
      .then((data: Exhibition[]) => {
        if (!mounted) return;
        const found = data.find((e) => String(e.floor) === String(floor));
        setInfo(found ?? null);
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

  const cardStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    width: '100%',
    maxWidth: 760,
    minHeight: 180,         // 余白を増やす
    padding: 20,            // 内側の余白を増やす
    boxSizing: 'border-box',
    background: '#ffffff',
    borderRadius: 12,
    boxShadow: '0 6px 18px rgba(0,0,0,0.08)',
    border: '2px solid #000', // 太い黒線でくっきり表示
    margin: '24px auto',    // 上下の余白を広げ、ボタンとの感覚を確保
  };

  const headerBoxStyle: React.CSSProperties = {
    width: '100%',
    marginBottom: 12, // ヘッダと本文の間を広げる
    paddingBottom: 8,
  };

  const titleStyle: React.CSSProperties = {
    margin: 0,
    fontSize: 16,
    color: '#222',
  };

  const floorStyle: React.CSSProperties = {
    margin: '6px 0 0 0',
    fontSize: 14,
    color: '#111',
    fontWeight: 600,
  };

  const descStyle: React.CSSProperties = {
    margin: 0,
    whiteSpace: 'pre-line', // JSON の \n を改行として表示
    color: '#333',
    lineHeight: 1.8,        // 行間を広げて読みやすく
    fontSize: 15,
  };
  const floorText = floor === 0 ? '地下1階' : `${floor}階`;


  return (
    <div style={cardStyle}>
      <div style={headerBoxStyle}>
        <div style={floorStyle}>{floorText}</div>
        <div></div>
      </div>

      <div style={{ width: '100%' }}>
        {loading ? (
          <p style={{ margin: 0 }}>読み込み中...</p>
        ) : info ? (
          <p style={descStyle}>{info.description ?? info.descrip ?? '説明がありません'}</p>
        ) : (
          <p style={{ margin: 0 }}>該当する展示情報が見つかりません。</p>
        )}
      </div>
    </div>
  );
};
