import Link from 'next/link';
import type { Metadata } from 'next';
import {
  getMonthlyAtmosphere,
  getMonthlyTypes,
  getAllTypes,
  getAvailableYearMonths,
} from '@/lib/data';

type Props = {
  params: Promise<{
    year: string;
    month: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { year, month } = await params;
  return {
    title: `MBTI わたしの取説占い｜${year}年${month}月`,
    description: `MBTIタイプ別に読む${year}年${month}月の占い`,
  };
}

export async function generateStaticParams() {
  const yearMonths = getAvailableYearMonths();
  return yearMonths.map(({ year, month }) => ({
    year: String(year),
    month: String(month),
  }));
}

export default async function MonthPage({ params }: Props) {
  const { year, month } = await params;
  const yearNum = parseInt(year);
  const monthNum = parseInt(month);

  const atmosphere = getMonthlyAtmosphere(yearNum, monthNum);
  const types = getMonthlyTypes(yearNum, monthNum);
  const allTypesData = getAllTypes();

  return (
    <div>
      <h1 className="page-title">
        MBTI わたしの取説占い｜{year}年{month}月
      </h1>

      <div className="month-atmosphere">
        <h2>今月の空気</h2>
        <p>{atmosphere}</p>
      </div>

      <div>
        <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px', textAlign: 'center' }}>
          あなたのタイプを選んでください
        </h2>
        <div className="type-cards">
          {types.map((type) => {
            const typeInfo = allTypesData[type];
            if (!typeInfo) return null;

            return (
              <div key={type} className="type-card">
                <div className="type-card-header">
                  <span className="type-card-icon">{typeInfo.icon}</span>
                  <h3 className="type-card-name">{typeInfo.name}</h3>
                </div>
                <p className="type-card-role">{typeInfo.animalRole}</p>
                <Link
                  href={`/${year}/${month}/${type}/`}
                  className="type-card-link"
                >
                  詳しく見る →
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
