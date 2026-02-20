import Link from 'next/link';

interface FortunePanelProps {
  keyword: string;
  love: number;
  work: number;
  health: number;
  money: number;
  luckyColor: string;
  luckyItem: string;
  compatibleType: string;
  compatibleTypeIcon?: string;
  compatibleTypeLabel?: string;
  year: string;
  month: string;
}

function Stars({ count }: { count: number }) {
  return (
    <span className="fortune-stars">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < count ? 'star-filled' : 'star-empty'}>
          {i < count ? '★' : '☆'}
        </span>
      ))}
    </span>
  );
}

export default function FortunePanel({
  keyword,
  love,
  work,
  health,
  money,
  luckyColor,
  luckyItem,
  compatibleType,
  compatibleTypeIcon,
  compatibleTypeLabel,
  year,
  month,
}: FortunePanelProps) {
  return (
    <div className="fortune-panel">
      <h2 className="fortune-panel-title">今月の占い</h2>

      <div className="fortune-keyword">
        <span className="fortune-keyword-label">今月のキーワード</span>
        <span className="fortune-keyword-value">{keyword}</span>
      </div>

      <div className="fortune-meters">
        <div className="fortune-meter">
          <span className="fortune-meter-label">恋愛運</span>
          <Stars count={love} />
        </div>
        <div className="fortune-meter">
          <span className="fortune-meter-label">仕事運</span>
          <Stars count={work} />
        </div>
        <div className="fortune-meter">
          <span className="fortune-meter-label">健康運</span>
          <Stars count={health} />
        </div>
        <div className="fortune-meter">
          <span className="fortune-meter-label">金運</span>
          <Stars count={money} />
        </div>
      </div>

      <div className="fortune-lucky">
        <div className="fortune-lucky-item">
          <span className="fortune-lucky-label">ラッキーカラー</span>
          <span className="fortune-lucky-value">{luckyColor}</span>
        </div>
        <div className="fortune-lucky-item">
          <span className="fortune-lucky-label">ラッキーアイテム</span>
          <span className="fortune-lucky-value">{luckyItem}</span>
        </div>
      </div>

      <div className="fortune-compatible">
        <span className="fortune-compatible-label">今月の相性タイプ</span>
        <Link href={`/${year}/${month}/${compatibleType}/`} className="fortune-compatible-link">
          {compatibleTypeIcon && <span className="fortune-compatible-icon">{compatibleTypeIcon}</span>}
          {compatibleType}
          {compatibleTypeLabel && <span className="fortune-compatible-sublabel">（{compatibleTypeLabel}）</span>}
        </Link>
      </div>
    </div>
  );
}
