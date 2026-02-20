import Link from 'next/link';
import type { Metadata } from 'next';
import {
  getSiteConfig,
  getMonthlyContent,
  getTypeInfo,
  getFortuneData,
  parseMarkdown,
  getMonthlyTypes,
  getAvailableYearMonths,
} from '@/lib/data';
import AdBanner from '../../../components/AdBanner';
import FortunePanel from '../../../components/FortunePanel';

type Props = {
  params: Promise<{
    year: string;
    month: string;
    type: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { year, month, type } = await params;
  const typeInfo = getTypeInfo(type);

  return {
    title: `MBTI わたしの取説占い｜${year}年${month}月｜${type}`,
    description: `${type}（${typeInfo?.label || ''}）の${year}年${month}月の占い - ${typeInfo?.description || ''}`,
  };
}

export async function generateStaticParams() {
  const yearMonths = getAvailableYearMonths();
  const params: Array<{ year: string; month: string; type: string }> = [];

  for (const { year, month } of yearMonths) {
    const types = getMonthlyTypes(year, month);
    for (const type of types) {
      params.push({
        year: String(year),
        month: String(month),
        type,
      });
    }
  }

  return params;
}

export default async function TypePage({ params }: Props) {
  const { year, month, type } = await params;
  const yearNum = parseInt(year);
  const monthNum = parseInt(month);

  const siteConfig = getSiteConfig();
  const typeInfo = getTypeInfo(type);
  const content = getMonthlyContent(yearNum, monthNum, type);
  const fortune = getFortuneData(yearNum, monthNum, type);
  const compatibleTypeInfo = fortune ? getTypeInfo(fortune.compatibleType) : null;

  if (!typeInfo || !content) {
    return (
      <div>
        <h1 className="page-title">コンテンツが見つかりません</h1>
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link href={`/${year}/${month}/`} className="back-link">
            ← {year}年{month}月のページに戻る
          </Link>
        </div>
      </div>
    );
  }

  const htmlContent = await parseMarkdown(content);

  return (
    <div>
      <Link href={`/${year}/${month}/`} className="back-link">
        ← {year}年{month}月のページに戻る
      </Link>

      <div className="type-detail-header">
        <div className="type-detail-icon">{typeInfo.icon}</div>
        <h1 className="type-detail-name">{typeInfo.name}</h1>
        <p className="type-detail-role">{typeInfo.animalRole}</p>
        <div style={{ marginTop: '20px' }}>
          <img
            src="/images/mbti-types-all.png"
            alt="MBTI 16タイプ"
            style={{ maxWidth: '400px', width: '100%', height: 'auto', borderRadius: '8px', opacity: 0.8 }}
          />
          <p style={{ fontSize: '12px', color: '#718096', marginTop: '8px' }}>
            16タイプの中のあなた
          </p>
        </div>
      </div>

      {fortune && (
        <FortunePanel
          keyword={fortune.keyword}
          love={fortune.love}
          work={fortune.work}
          health={fortune.health}
          money={fortune.money}
          luckyColor={fortune.luckyColor}
          luckyItem={fortune.luckyItem}
          compatibleType={fortune.compatibleType}
          compatibleTypeIcon={compatibleTypeInfo?.icon}
          compatibleTypeLabel={compatibleTypeInfo?.label}
          year={year}
          month={month}
        />
      )}

      <div className="type-content" dangerouslySetInnerHTML={{ __html: htmlContent }} />

      {siteConfig.adsenseEnabled && (
        <div style={{ marginTop: '40px' }}>
          <AdBanner format="rectangle" />
        </div>
      )}

      <div style={{ marginTop: '60px', textAlign: 'center' }}>
        <Link href={`/${year}/${month}/`} className="back-link">
          ← {year}年{month}月のページに戻る
        </Link>
      </div>
    </div>
  );
}
