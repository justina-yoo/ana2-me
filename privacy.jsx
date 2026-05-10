// Privacy Policy page
window.Privacy = function Privacy({ lang }) {
  const t = useL(lang);
  const isKo = lang === 'ko';

  const sections = [
    {
      heading: '1. Information We Collect',
      headingKo: '1. 수집하는 정보',
      body: 'We do not require you to create an account or submit any personal information to use this site. We collect anonymous usage data through Google Analytics 4 (GA4), including pages visited, time on page, and general device/browser information. This data is aggregated and cannot be used to identify you individually.',
      bodyKo: '이 사이트는 계정을 만들거나 개인정보를 입력할 필요가 없어요. Google Analytics 4(GA4)로 방문 페이지, 체류 시간, 기기/브라우저 정보 등 익명 데이터만 수집합니다. 이 데이터로는 개인을 특정할 수 없어요.',
    },
    {
      heading: '2. Cookies',
      headingKo: '2. 쿠키',
      body: 'We use cookies for analytics purposes (Google Analytics) and to remember your language and display preferences locally in your browser. We do not use advertising cookies or sell data to third parties.',
      bodyKo: '분석용(Google Analytics)과 언어·화면 설정 저장용으로만 쿠키를 사용해요. 광고 쿠키는 쓰지 않고, 데이터를 제3자에게 팔지 않습니다.',
    },
    {
      heading: '3. Google Analytics',
      headingKo: '3. Google Analytics',
      body: 'This site uses Google Analytics 4 to understand how visitors interact with our content. Google may collect and process data in accordance with their own privacy policy. You can opt out of Google Analytics tracking by installing the Google Analytics Opt-out Browser Add-on.',
      bodyKo: '방문자가 어떤 콘텐츠를 읽는지 이해하기 위해 Google Analytics 4를 사용해요. Google은 자체 개인정보처리방침에 따라 데이터를 처리합니다. 추적을 원하지 않으시면 Google Analytics 차단 브라우저 확장 프로그램을 설치하세요.',
    },
    {
      heading: '4. Third-Party Images',
      headingKo: '4. 외부 이미지',
      body: 'Product images on this site are sourced from third-party brand owners or image platforms (Unsplash). We do not claim ownership of these images. Links to external sites are provided for reference only — we are not responsible for the privacy practices of those sites.',
      bodyKo: '제품 이미지는 브랜드사나 이미지 플랫폼(Unsplash)에서 가져온 것이며, 이미지 소유권을 주장하지 않습니다. 외부 사이트 링크는 참고용으로만 제공되며, 해당 사이트의 개인정보 처리 방식에 대해서는 저희가 책임지지 않아요.',
    },
    {
      heading: '5. Data Retention',
      headingKo: '5. 데이터 보존',
      body: 'We do not store personal data on our servers. Analytics data is retained by Google Analytics per their standard data retention settings (default 14 months). Local preferences (language, display settings) are stored only in your own browser.',
      bodyKo: '저희 서버에는 개인 데이터를 저장하지 않습니다. 분석 데이터는 Google Analytics의 표준 데이터 보존 설정(기본 14개월)에 따라 보관됩니다. 언어, 표시 설정 등 로컬 설정은 본인의 브라우저에만 저장됩니다.',
    },
    {
      heading: '6. Your Rights',
      headingKo: '6. 이용자의 권리',
      body: 'You have the right to access, correct, or request deletion of any personal data we hold about you. As we collect no personally identifiable information, there is typically nothing to request. For any privacy-related questions, please contact us.',
      bodyKo: '보유 중인 개인 데이터에 대해 열람·수정·삭제를 요청할 수 있어요. 다만 저희는 개인 식별 정보를 수집하지 않기 때문에 실제로 요청할 내용은 거의 없을 거예요. 궁금한 점이 있으시면 편하게 연락해 주세요.',
    },
    {
      heading: '7. Changes to This Policy',
      headingKo: '7. 방침 변경',
      body: 'We may update this policy occasionally. The "last updated" date at the top of this page reflects the most recent revision. Continued use of the site after changes constitutes acceptance of the updated policy.',
      bodyKo: '이 방침은 필요에 따라 업데이트될 수 있어요. 상단의 "최종 업데이트" 날짜를 확인해 주세요. 변경 후에도 사이트를 계속 이용하시면 업데이트된 방침에 동의한 것으로 봅니다.',
    },
    {
      heading: '8. Affiliate Disclosure',
      headingKo: '8. 제휴 링크 안내',
      body: 'Some links on this site are affiliate links. If you click and make a purchase, we may earn a small commission at no extra cost to you. This helps support the site and allows us to continue producing independent, research-based content. Affiliate relationships do not influence our editorial opinions or product evaluations.',
      bodyKo: '이 사이트의 일부 링크는 제휴 링크예요. 클릭 후 구매하시면 추가 비용 없이 저희가 소정의 수수료를 받을 수 있어요. 이 수익은 사이트 운영과 독립적인 연구 기반 콘텐츠 제작에 사용됩니다. 제휴 관계는 편집 의견이나 제품 평가에 영향을 미치지 않아요.',
    },
    {
      heading: '9. Content Disclaimer',
      headingKo: '9. 콘텐츠 면책 조항',
      body: 'Content on ana2me is for informational purposes only and is not medical advice. We strive for accuracy, but ingredient science and product formulations change frequently. Always consult a dermatologist or healthcare professional before starting any new skincare or supplement routine. We are not responsible for any adverse effects resulting from the use of information provided on this site.',
      bodyKo: 'ana2me의 콘텐츠는 정보 제공 목적으로만 작성되며 의학적 조언이 아니에요. 정확성을 위해 노력하지만 성분 과학과 제품 포뮬레이션은 자주 변경돼요. 새로운 스킨케어나 보충제를 시작하기 전에 반드시 피부과 전문의나 의료 전문가와 상담하세요. 이 사이트에 제공된 정보 사용으로 인한 부작용에 대해 책임지지 않아요.',
    },
    {
      heading: '10. DMCA / Copyright',
      headingKo: '10. 저작권 및 DMCA',
      body: 'We respect intellectual property rights. If you believe any content on this site infringes your copyright, please contact us at ana2me2026@gmail.com with a description of the copyrighted work, the URL where the material appears, and your contact information. We will review and respond to valid requests promptly.',
      bodyKo: '저희는 지식재산권을 존중해요. 이 사이트의 콘텐츠가 저작권을 침해한다고 판단되시면 ana2me2026@gmail.com으로 저작물 설명, 해당 URL, 연락처를 보내주세요. 유효한 요청에 신속하게 검토 및 대응하겠습니다.',
    },
    {
      heading: '11. Contact',
      headingKo: '11. 문의',
      body: 'For any questions about this privacy policy or the disclaimers above, please contact us at ana2me2026@gmail.com.',
      bodyKo: '본 개인정보처리방침 또는 위 면책 조항에 관한 문의사항은 ana2me2026@gmail.com으로 연락해 주세요.',
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
              'ana2me가 이 웹사이트를 운영합니다. 어떤 정보를 모으고, 어떻게 쓰는지, 그리고 이와 관련된 권리를 안내드립니다.'
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
