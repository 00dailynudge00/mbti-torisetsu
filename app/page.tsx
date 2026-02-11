import Link from 'next/link';
import { getSiteConfig, getAvailableYearMonths } from '@/lib/data';

export default function HomePage() {
  const siteConfig = getSiteConfig();
  const availableYearMonths = getAvailableYearMonths();

  // 最新月を取得（デフォルト値として設定された年月）
  const latestYearMonth = availableYearMonths.length > 0
    ? availableYearMonths[0]
    : { year: siteConfig.defaultYear, month: siteConfig.defaultMonth };

  return (
    <div>
      <div className="page-title">
        ようこそ、MBTI わたしの取説占いへ
      </div>

      <div style={{ textAlign: 'center', margin: '40px 0' }}>
        <img
          src="/images/mbti-types-all.png"
          alt="MBTI 16タイプキャラクター"
          style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
        />
      </div>

      <div className="latest-month">
        <Link
          href={`/${latestYearMonth.year}/${latestYearMonth.month}/`}
          className="latest-month-link"
        >
          {latestYearMonth.year}年{latestYearMonth.month}月の占いを見る
        </Link>
      </div>

      {availableYearMonths.length > 1 && (
        <div style={{ marginTop: '60px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '20px', textAlign: 'center' }}>
            過去の占い
          </h2>
          <ul className="month-list">
            {availableYearMonths.slice(1).map(({ year, month }) => (
              <li key={`${year}-${month}`}>
                <Link href={`/${year}/${month}/`}>
                  {year}年{month}月の占い
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
