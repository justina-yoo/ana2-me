// Privacy Policy page
window.Privacy = function Privacy({ lang }) {
  const t = useL(lang);
  const isKo = lang === 'ko';

  const sections = [
    {
      heading: '1. Information We Collect',
      headingKo: '1. 수집하는 정보',
      body: 'We do not require you to create an account or submit any personal information to use this site. We collect anonymous usage data through Google Analytics 4 (GA4), including pages visited, time on page, and general device/browser information. This data is aggregated and cannot be used to identify you individually.',
      bodyKo: '이 사이트를 이용하기 위해 계정을 만들거나 개인정보를 제출할 필요가 없습니다. Google Analytics 4(GA4)를 통해 방문한 페이지, 페이지 체류 시간, 일반적인 기기/브라우저 정보 등 익명 사용 데이터를 수집합니다. 이 데이터는 집계되며 개인을 식별하는 데 사용될 수 없습니다.',
    },
    {
      heading: '2. Cookies',
      headingKo: '2. 쿠키',
      body: 'We use cookies for analytics purposes (Google Analytics) and to remember your language and display preferences locally in your browser. We do not use advertising cookies or sell data to third parties.',
      bodyKo: '분석 목적(Google Analytics)과 언어 및 표시 설정을 브라우저에 저장하기 위해 쿠키를 사용합니다. 광고 쿠키는 사용하지 않으며 제3자에게 데이터를 판매하지 않습니다.',
    },
    {
      heading: '3. Google Analytics',
      headingKo: '3. Google Analytics',
      body: 'This site uses Google Analytics 4 to understand how visitors interact with our content. Google may collect and process data in accordance with their own privacy policy. You can opt out of Google Analytics tracking by installing the Google Analytics Opt-out Browser Add-on.',
      bodyKo: '이 사이트는 방문자가 콘텐츠와 어떻게 상호작용하는지 파악하기 위해 Google Analytics 4를 사용합니다. Google은 자체 개인정보처리방침에 따라 데이터를 수집하고 처리할 수 있습니다. Google Analytics 추적을 거부하려면 Google Analytics 차단 브라우저 부가기능을 설치하세요.',
    },
    {
      heading: '4. Third-Party Images',
      headingKo: '4. 제3자 이미지',
      body: 'Product images on this site are sourced from third-party brand owners or image platforms (Unsplash). We do not claim ownership of these images. Links to external sites are provided for reference only — we are not responsible for the privacy practices of those sites.',
      bodyKo: '이 사이트의 제품 이미지는 제3자 브랜드 소유자 또는 이미지 플랫폼(Unsplash)에서 제공됩니다. 저희는 이러한 이미지에 대한 소유권을 주장하지 않습니다. 외부 사이트 링크는 참고 목적으로만 제공되며, 해당 사이트의 개인정보 처리 방식에 대해서는 책임을 지지 않습니다.',
    },
    {
      heading: '5. Data Retention',
      headingKo: '5. 데이터 보존',
      body: 'We do not store personal data on our servers. Analytics data is retained by Google Analytics per their standard data retention settings (default 14 months). Local preferences (language, display settings) are stored only in your own browser.',
      bodyKo: '저희 서버에는 개인 데이터를 저장하지 않습니다. 분석 데이터는 Google Analytics의 표준 데이터 보존 설정(기본 14개월)에 따라 보관됩니다. 언어, 표시 설정 등 로컬 설정은 본인의 브라우저에만 저장됩니다.',
    },
    {
      heading: '6. Your Rights',
      headingKo: '6. 귀하의 권리',
      body: 'You have the right to access, correct, or request deletion of any personal data we hold about you. As we collect no personally identifiable information, there is typically nothing to request. For any privacy-related questions, please contact us.',
      bodyKo: '저희가 보유한 개인 데이터에 대해 열람, 수정, 삭제를 요청할 권리가 있습니다. 저희는 개인 식별 정보를 수집하지 않으므로 일반적으로 요청할 사항이 없습니다. 개인정보 관련 문의사항이 있으시면 저희에게 연락해 주세요.',
    },
    {
      heading: '7. Changes to This Policy',
      headingKo: '7. 방침 변경',
      body: 'We may update this policy occasionally. The "last updated" date at the top of this page reflects the most recent revision. Continued use of the site after changes constitutes acceptance of the updated policy.',
      bodyKo: '본 방침은 가끔 업데이트될 수 있습니다. 페이지 상단의 "최종 업데이트" 날짜가 가장 최근 개정 사항을 반영합니다. 변경 후 사이트를 계속 이용하면 업데이트된 방침에 동의한 것으로 간주됩니다.',
    },
    {
      heading: '8. Contact',
      headingKo: '8. 문의',
      body: 'For any questions about this privacy policy, please reach out via the contact information on our About page.',
      bodyKo: '본 개인정보처리방침에 관한 문의사항은 소개 페이지의 연락처를 통해 문의해 주세요.',
    },
  ];

  return (
    <div className={cn('insights', 'dens-normal')}>
      <header className="ins-hero" style={{ paddingTop: 12, paddingBottom: 24 }}>
        <Sticker color="ink" rotate={2}>{t('privacy', '개인정보')}</Sticker>
        <h1 className="display">
          {isKo ? <>개인정보<br /><span className="display-accent">처리방침<span className="display-dot">.</span></span></> : <>Privacy<br /><span className="display-accent">Policy<span className="display-dot">.</span></span></>}
        </h1>
        <p className="ins-sub" style={{ maxWidth: '48ch' }}>
          {t('Last updated: May 2026', '최종 업데이트: 2026년 5월')}
        </p>
      </header>

      <section style={{ maxWidth: 680, margin: '0 auto 80px', display: 'flex', flexDirection: 'column', gap: 32 }}>

        <div>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--ink-soft)', margin: '0 0 16px' }}>
            {t(
              'ana2me ("we", "our", or "us") operates this website. This policy explains what information we collect, how we use it, and your rights in relation to it. We keep this simple — we are a small editorial platform, not a data company.',
              'ana2me("저희", "당사")가 이 웹사이트를 운영합니다. 본 방침은 수집하는 정보, 사용 방법, 이와 관련된 귀하의 권리를 설명합니다. 저희는 간단하게 유지합니다 — 작은 에디토리얼 플랫폼이지, 데이터 회사가 아닙니다.'
            )}
          </p>
        </div>

        {sections.map((s, i) => (
          <div key={i}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(18px, 2vw, 22px)', fontWeight: 500, margin: '0 0 10px', color: 'var(--ink)' }}>
              {isKo ? s.headingKo : s.heading}
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--ink-soft)', margin: 0 }}>
              {isKo ? s.bodyKo : s.body}
            </p>
          </div>
        ))}

      </section>
    </div>
  );
};
