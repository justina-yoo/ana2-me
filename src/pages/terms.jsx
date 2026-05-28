// Terms of Service page
window.Terms = function Terms({ lang }) {
  const t = useL(lang);
  const isKo = lang === 'ko';

  const sections = [
    {
      heading: '1. About the Service',
      headingKo: '1. 서비스 소개',
      body: 'ana2me is an informational ingredient-discovery and personalization tool focused on Korean cosmetic products. We don\u2019t sell products. The Service includes an ingredient analyzer that processes user-provided products and surfaces ingredient patterns based on a structured ingredient database.',
      bodyKo: 'ana2me는 한국 화장품을 중심으로 한 성분 분석\u00B7정보 제공 서비스입니다. 제품을 직접 판매하지 않습니다. 서비스에는 사용자가 입력한 제품을 바탕으로 성분 패턴을 분석하는 도구가 포함되어 있습니다.',
    },
    {
      heading: '2. Not medical advice \u2014 important',
      headingKo: '2. 의학적 조언이 아닙니다 \u2014 중요',
      body: 'ana2me is for informational and educational use only. Nothing on this Service is medical, dermatological, or therapeutic advice. The analyzer\u2019s output is not a diagnosis, treatment recommendation, or prediction of how your skin will react to any product. Reactions to cosmetic ingredients vary significantly between individuals. If you have a skin concern, allergy, ongoing condition, or experience a reaction, please consult a qualified healthcare professional or dermatologist. Do not use ana2me to make medical decisions.',
      bodyKo: 'ana2me는 정보 제공 및 교육 목적으로만 제공되며, 의학적\u00B7피부과적\u00B7치료적 조언이 아닙니다. 분석 결과는 진단이나 치료 권고가 아니며, 특정 제품에 대한 피부 반응을 예측하지 않습니다. 화장품 성분에 대한 반응은 개인차가 큽니다. 피부 관련 우려, 알레르기, 진행 중인 피부 질환이 있거나 사용 중 이상 반응이 발생하면 반드시 의료 전문가 또는 피부과 전문의와 상담해 주세요. 본 서비스를 의학적 판단의 근거로 사용하지 마세요.',
    },
    {
      heading: '3. No warranty on analysis output',
      headingKo: '3. 분석 결과에 대한 보증 없음',
      body: 'The analyzer is based on patterns in the products you submit. It cannot account for everything that affects skin compatibility \u2014 formulation, concentration, personal sensitivities, environmental factors, and many others. We provide the Service \u201Cas is\u201D and make no warranty that the analysis is complete, accurate, or applicable to your specific situation. Use your own judgment, and patch-test new products on a small area before broader use.',
      bodyKo: '분석 도구는 사용자가 제출한 제품의 성분 패턴을 바탕으로 작동합니다. 제형, 농도, 개인 민감도, 환경 요인 등 피부 적합성에 영향을 미치는 모든 요소를 반영할 수는 없습니다. 서비스는 \u201C있는 그대로(as is)\u201D 제공되며, 분석의 완전성\u00B7정확성\u00B7개인 적용 가능성에 대해 보증하지 않습니다. 직접 판단하시고, 새로운 제품은 소량으로 패치 테스트 후 사용해 주세요.',
    },
    {
      heading: '4. Acceptable use',
      headingKo: '4. 이용 규칙',
      body: 'Don\u2019t use automated tools to scrape or extract ana2me\u2019s content, ingredient database, or product data. Don\u2019t submit malicious, abusive, or unlawful content. Don\u2019t attempt to disrupt the Service or access non-public areas. We may suspend access for users who violate these Terms.',
      bodyKo: 'ana2me의 콘텐츠, 성분 데이터베이스, 제품 정보를 자동화 도구로 수집\u00B7추출하지 마세요. 악의적\u00B7불법적인 콘텐츠를 제출하거나, 서비스 운영을 방해하거나, 비공개 영역에 접근하려 하지 마세요. 본 약관을 위반할 경우 이용을 제한할 수 있습니다.',
    },
    {
      heading: '5. Intellectual property',
      headingKo: '5. 지식재산권',
      body: 'Original content on ana2me \u2014 including articles, the ingredient knowledge base structure, design, and code \u2014 is owned by ana2me. Brand names, product names, and logos belong to their respective owners and appear on the Service for editorial and informational purposes only.',
      bodyKo: 'ana2me의 기사, 성분 지식베이스 구조, 디자인, 코드 등 자체 콘텐츠는 ana2me에 귀속됩니다. 브랜드명, 제품명, 로고는 각 권리자에게 귀속되며, 편집\u00B7정보 제공 목적으로만 표시됩니다.',
    },
    {
      heading: '6. User-submitted content',
      headingKo: '6. 사용자 제출 콘텐츠',
      body: 'When you paste ingredient lists, submit feedback, or otherwise interact with the Service, you grant ana2me a non-exclusive, royalty-free license to use that input to operate and improve the Service. We don\u2019t claim ownership of your input. We work to keep submitted data anonymous; see our Privacy Policy for details.',
      bodyKo: '성분 목록을 붙여넣거나 피드백을 남기는 등 서비스와 상호작용할 때, 해당 입력 정보를 서비스 운영 및 개선에 사용할 수 있도록 ana2me에 비독점적\u00B7무상의 라이선스를 부여하는 것에 동의하시는 것으로 간주됩니다. 입력 데이터에 대한 소유권을 주장하지 않으며, 제출된 데이터를 익명으로 처리하기 위해 최선을 다합니다. 자세한 내용은 개인정보처리방침을 참고해 주세요.',
      hasPrivacyLink: true,
    },
    {
      heading: '7. Third-party links and affiliate relationships',
      headingKo: '7. 외부 링크 및 제휴 관계',
      body: 'ana2me may include links to third-party websites or products, some of which are affiliate links. Where a link is an affiliate or sponsored link, it will be clearly labeled in compliance with applicable disclosure regulations \u2014 \u2018\uD611\uCC2C / \uAD11\uACE0 / \uC81C\uD734\u2019 under KFTC guidelines for users in Korea, and \u2018#ad\u2019 or \u2018#affiliate\u2019 under the US FTC\u2019s 16 CFR Part 255 for users in the United States. We\u2019re not responsible for the content, accuracy, or policies of third-party sites.',
      bodyKo: 'ana2me\uC5D0\uB294 \uC678\uBD80 \uC6F9\uC0AC\uC774\uD2B8\uB098 \uC81C\uD488\uC73C\uB85C \uC5F0\uACB0\uB418\uB294 \uB9C1\uD06C\uAC00 \uD3EC\uD568\uB420 \uC218 \uC788\uC73C\uBA70, \uC77C\uBD80\uB294 \uC81C\uD734 \uB9C1\uD06C\uC77C \uC218 \uC788\uC2B5\uB2C8\uB2E4. \uC81C\uD734 \uB610\uB294 \uAD11\uACE0 \uB9C1\uD06C\uC758 \uACBD\uC6B0 \uC801\uC6A9\uB418\uB294 \uADDC\uC815\uC5D0 \uB530\uB77C \uBA85\uD655\uD788 \uD45C\uC2DC\uD569\uB2C8\uB2E4 \u2014 \uD55C\uAD6D \uC774\uC6A9\uC790\uC5D0\uAC8C\uB294 \uACF5\uC815\uAC70\uB798\uC704\uC6D0\uD68C \uC9C0\uCE68\uC5D0 \uB530\uB77C \u2018\uD611\uCC2C/\uAD11\uACE0/\uC81C\uD734\u2019\uB85C, \uBBF8\uAD6D \uC774\uC6A9\uC790\uC5D0\uAC8C\uB294 \uBBF8\uAD6D FTC\uC758 16 CFR Part 255\uC5D0 \uB530\uB77C \u2018#ad\u2019 \uB610\uB294 \u2018#affiliate\u2019\uB85C \uD45C\uC2DC\uD569\uB2C8\uB2E4. \uC678\uBD80 \uC0AC\uC774\uD2B8\uC758 \uCF58\uD150\uCE20, \uC815\uD655\uC131, \uC815\uCC45\uC5D0 \uB300\uD574\uC11C\uB294 \uCC45\uC784\uC9C0\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.',
    },
    {
      heading: '8. Privacy',
      headingKo: '8. 개인정보',
      body: 'Your use of the Service is also governed by our Privacy Policy, which explains what information we collect, how we use it, and your rights under applicable privacy laws \u2014 including PIPA (Korea), the California Consumer Privacy Act (CCPA), and other US state privacy laws where applicable.',
      bodyKo: '\uC11C\uBE44\uC2A4 \uC774\uC6A9\uC740 \uAC1C\uC778\uC815\uBCF4\uCC98\uB9AC\uBC29\uCE68\uC758 \uC801\uC6A9\uC744 \uBC1B\uC2B5\uB2C8\uB2E4. \uC218\uC9D1 \uC815\uBCF4, \uC774\uC6A9 \uBAA9\uC801, \uADF8\uB9AC\uACE0 \uC801\uC6A9 \uAC00\uB2A5\uD55C \uAC1C\uC778\uC815\uBCF4 \uBCF4\uD638\uBC95(\uD55C\uAD6D PIPA, \uBBF8\uAD6D \uCEA0\uB9AC\uD3EC\uB2C8\uC544 CCPA \uBC0F \uAE30\uD0C0 \uBBF8\uAD6D \uC8FC \uAC1C\uC778\uC815\uBCF4 \uBCF4\uD638\uBC95 \uD3EC\uD568)\uC5D0 \uB530\uB978 \uAD8C\uB9AC\uB97C \uC548\uB0B4\uB4DC\uB9BD\uB2C8\uB2E4.',
      hasPrivacyLink: true,
    },
    {
      heading: '9. Changes to the Terms',
      headingKo: '9. 약관 변경',
      body: 'We may update these Terms from time to time. Material changes will be noted on this page with an updated \u201Clast updated\u201D date. Continued use of the Service after changes means you accept the updated Terms.',
      bodyKo: '본 약관은 수시로 변경될 수 있습니다. 중요한 변경 사항은 본 페이지에서 \u201C최종 업데이트\u201D 일자와 함께 안내됩니다. 변경 이후 서비스 이용을 지속할 경우 변경된 약관에 동의하시는 것으로 간주됩니다.',
    },
    {
      heading: '10. Governing law and disputes',
      headingKo: '10. 준거법 및 분쟁 해결',
      body: 'These Terms are governed by the laws of the Republic of Korea. Any dispute relating to the Service will be resolved in the courts of the Republic of Korea. This governing-law clause does not limit any mandatory consumer protection rights you may have under the laws of your country of residence. Users outside Korea retain the consumer protection rights available under their local jurisdiction (including, for users in the United States, applicable state and federal consumer protection laws).',
      bodyKo: '\uBCF8 \uC57D\uAD00\uC740 \uB300\uD55C\uBBFC\uAD6D \uBC95\uB960\uC758 \uC801\uC6A9\uC744 \uBC1B\uC73C\uBA70, \uC11C\uBE44\uC2A4\uC640 \uAD00\uB828\uB41C \uBD84\uC7C1\uC740 \uB300\uD55C\uBBFC\uAD6D \uBC95\uC6D0\uC758 \uAD00\uD560\uC5D0 \uB530\uB985\uB2C8\uB2E4. \uBCF8 \uC900\uAC70\uBC95 \uC870\uD56D\uC740 \uAC70\uC8FC\uC9C0 \uBC95\uB960\uC5D0 \uB530\uB77C \uC774\uC6A9\uC790\uC5D0\uAC8C \uBCF4\uC7A5\uB41C \uC758\uBB34\uC801 \uC18C\uBE44\uC790 \uBCF4\uD638 \uAD8C\uB9AC\uB97C \uC81C\uD55C\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4. \uD55C\uAD6D \uC678 \uAC70\uC8FC \uC774\uC6A9\uC790\uB294 \uD574\uB2F9 \uAD6D\uAC00\uC758 \uC18C\uBE44\uC790 \uBCF4\uD638 \uAD8C\uB9AC(\uBBF8\uAD6D \uC774\uC6A9\uC790\uC758 \uACBD\uC6B0 \uAD00\uB828 \uC8FC \uBC0F \uC5F0\uBC29 \uC18C\uBE44\uC790 \uBCF4\uD638\uBC95 \uD3EC\uD568)\uB97C \uADF8\uB300\uB85C \uC720\uC9C0\uD569\uB2C8\uB2E4.',
    },
    {
      heading: '11. Contact',
      headingKo: '11. 문의',
      body: 'Questions about these Terms: ana2me2026@gmail.com',
      bodyKo: '약관 관련 문의: ana2me2026@gmail.com',
    },
  ];

  const goPrivacy = (e) => {
    e.preventDefault();
    history.pushState({}, '', '/privacy');
    if (window.SEO) window.SEO.setPrivacy();
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo(0, 0);
  };

  return (
    <div className={cn('insights', 'dens-normal')}>
      <header className="ins-hero" style={{ paddingTop: 12, paddingBottom: 24 }}>
        <Sticker color="ink" rotate={-3}>{t('terms', '약관')}</Sticker>
        <h1 className="display">
          {isKo ? <>이용<br /><span className="display-accent">약관<span className="display-dot">.</span></span></> : <>Terms of<br /><span className="display-accent">Service<span className="display-dot">.</span></span></>}
        </h1>
        <p className="ins-sub" style={{ maxWidth: '48ch' }}>
          {t('Last updated: May 28, 2026', '최종 업데이트: 2026년 5월 28일')}
        </p>
      </header>

      <section style={{ maxWidth: 680, margin: '0 auto 80px', display: 'flex', flexDirection: 'column', gap: 32 }}>

        <div>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--ink-soft)', margin: '0 0 16px' }}>
            {t(
              'Welcome to ana2me. These Terms of Service (\u201CTerms\u201D) govern your use of ana2me (the \u201CService\u201D), available at ana2-me.com. By using ana2me, you agree to these Terms. If you don\u2019t agree, please don\u2019t use the Service.',
              'ana2me 이용약관에 오신 것을 환영합니다. 본 약관은 ana2-me.com에서 제공되는 ana2me(\u201C서비스\u201D) 이용에 적용됩니다. 서비스를 이용하시면 본 약관에 동의하시는 것으로 간주됩니다. 동의하지 않으실 경우 서비스 이용을 중단해 주세요.'
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
              {s.hasPrivacyLink && ' '}
              {s.hasPrivacyLink && <a href="/privacy" onClick={goPrivacy} style={{ color: 'var(--accent)', textDecoration: 'underline', textUnderlineOffset: 3 }}>{t('Privacy Policy', '개인정보처리방침')}</a>}
            </p>
          </div>
        ))}

      </section>
    </div>
  );
};
