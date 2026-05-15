// Batch-add sources blocks to all articles missing them
const SUPABASE_URL = 'https://hkyfggapijgedsizfqec.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhreWZnZ2FwaWpnZWRzaXpmcWVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwNzY5MDksImV4cCI6MjA5MzY1MjkwOX0.huZi2uDRI0EnVWkg6HTo-VK1V3fz3DyR-ZNGpMd0yLQ';

const SOURCES = {
  'exosomes-skincare-korean-labs': [
    { label: 'Exosome-Based Therapeutics in Dermatology — PMC', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC12062580/' },
    { label: 'Exosomes in Dermatology: Current Applications, Clinical Evidence, and Future Directions — International Journal of Dermatology', url: 'https://onlinelibrary.wiley.com/doi/10.1111/ijd.17903' },
    { label: 'Exosomes in Dermatology: Emerging Roles in Skin Health and Disease — MDPI Pharmaceutics', url: 'https://www.mdpi.com/1999-4923/17/5/600' },
    { label: 'Exosomes for Skin Treatment: Therapeutic and Cosmetic Applications — ScienceDirect', url: 'https://www.sciencedirect.com/science/article/pii/S2790676024000190' },
  ],
  'overnight-masks-replacing-night-creams': [
    { label: 'Clinical Evaluation of a Multi-Component Facial Mask for Moisturizing, Repairing, and Anti-Aging Effects — PMC', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC12326291/' },
    { label: 'Beauty Sleep: The Science Behind Nighttime Skin Rejuvenation — Creative Touch', url: 'https://creativetouchrotherham.co.uk/blog/post/nighttime-skin-rejuvenation' },
    { label: 'Sleeping Masks vs Night Moisturizers: What\'s the Difference? — Dot & Key', url: 'https://www.dotandkey.com/blogs/skin-care/sleeping-masks-vs-night-moisturizers' },
  ],
  'pdrn-injectable-vs-topical-vs-microneedling': [
    { label: 'Comparison of Polynucleotide and Polydeoxyribonucleotide — PMC', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC12388916/' },
    { label: 'Versatile and Marvelous Potentials of PDRN for Tissue Engineering and Regeneration — PMC', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11994882/' },
    { label: 'Analysis of Skin Regeneration and Barrier-Improvement Efficacy of PDRN — PMC', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10649580/' },
    { label: 'Pharmacological Activity and Clinical Use of PDRN — PMC', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5405115/' },
  ],
  'korean-capsule-cream-technology': [
    { label: 'Encapsulation of Cosmetic Active Ingredients for Topical Application — PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/26612271/' },
    { label: 'Study of Vitamin E Microencapsulation and Controlled Release — ScienceDirect', url: 'https://www.sciencedirect.com/science/article/abs/pii/S0144861720311619' },
    { label: 'Microencapsulation Technology for Personal Care — Spray-Tek', url: 'https://spray-tek.com/microencapsulation-technology-for-personal-care-white-paper/' },
  ],
  'taeyeon-skips-toner': [
    { label: 'Taeyeon Reveals the Skincare Secrets That Make Her Complexion So Perfect — Koreaboo', url: 'https://www.koreaboo.com/news/girls-generation-taeyeon-reveals-skincare-secrets-make-complexion-so-perfect/' },
    { label: 'Taeyeon Beauty & Skincare Routine 2022 — KpopStarz', url: 'https://www.kpopstarz.com/articles/305237/20220308/taeyeon-beauty-skincare-routine-2022-girls-generation.htm' },
    { label: 'Steps to a Korean Skin Care Routine — Cleveland Clinic', url: 'https://health.clevelandclinic.org/korean-skincare-routine' },
  ],
  'met-gala-2026-skin-prep': [
    { label: 'How Celebs Are Prepping Their Skin Ahead of the 2026 Met Gala — NewBeauty', url: 'https://www.newbeauty.com/view/met-gala-2026-celeb-skin-prep' },
    { label: 'Met Gala Glowy Skin Secrets Revealed by Celeb Facialists and Derms — WWD', url: 'https://wwd.com/beauty-industry-news/fragrance/korean-fragrances-1238949110/' },
    { label: 'Celebs\' Met Gala Facials Include Microcurrent Gloves, LED Therapy, and Vibrational Orbs — Marie Claire', url: 'https://www.marieclaire.com/beauty/inside-shani-darden-met-gala-facial/' },
    { label: 'The $950 Facial Everyone Is Getting Before the Met — NewBeauty', url: 'https://www.newbeauty.com/view/the-met-gala-prestige-glow-facial' },
  ],
  'korean-sunscreen-illegal-filters': [
    { label: 'Blocking Sunblock: Regulatory Barriers to Korean Sunscreens in the United States — University of Miami Law Review', url: 'https://international-and-comparative-law-review.law.miami.edu/blocking-sunblock-regulatory-barriers-to-korean-sunscreens-in-the-united-states/' },
    { label: 'Are Korean Sunscreens Really Better Than American Ones? Experts Weigh In — TODAY', url: 'https://www.today.com/health/skin-beauty/korean-vs-american-sunscreens-rcna205214' },
    { label: 'The Real Story Behind "Banned" Korean Sunscreens in the US — Oreate AI', url: 'https://www.oreateai.com/blog/the-real-story-behind-banned-korean-sunscreens-in-the-us/141f311e077f8f900f1f9305694569ca' },
    { label: 'Let\'s Talk Sunscreen: Why Are Influencers Crazy for Korean SPF? — Nevada Cancer Coalition', url: 'https://www.nevadacancercoalition.org/blog/lets-talk-sunscreen-why-are-influencers-crazy-korean-spf' },
  ],
  'hypochlorous-acid-skincare': [
    { label: 'Hypochlorous Acid: An Ideal Wound Care Agent — PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/25785777/' },
    { label: 'Topical Stabilized Hypochlorous Acid: The Future Gold Standard for Wound Care — PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/31904191/' },
    { label: 'Hypochlorous Acid: Applications in Dermatology — Journal of Integrative Dermatology', url: 'https://www.jintegrativederm.org/article/56663-hypochlorous-acid-applications-in-dermatology' },
    { label: 'Hypochlorous Acid as a Potential Wound Care Agent — PMC', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC1853324/' },
  ],
  'skin-barrier-2026': [
    { label: 'The Role of Ceramides in Skin Barrier Function — International Journal of Cosmetic Science', url: 'https://onlinelibrary.wiley.com/doi/10.1111/ics.12972' },
    { label: 'Ceramides and Skin Health: New Insights — Experimental Dermatology', url: 'https://onlinelibrary.wiley.com/doi/full/10.1111/exd.70042' },
    { label: 'Optimization of Physiological Lipid Mixtures for Barrier Repair — Journal of Investigative Dermatology', url: 'https://www.jidonline.org/article/S0022-202X(15)42564-3/pdf' },
    { label: 'Evaluating the Effect of Moisturizers Containing Endogenous Lipids on Skin Barrier — ScienceDirect', url: 'https://www.sciencedirect.com/science/article/pii/S2950306X24000359' },
  ],
  'fermentation-transformation': [
    { label: 'Galactomyces Ferment Filtrate Potentiates an Anti-Inflammaging System in Keratinocytes — PMC', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9657190/' },
    { label: 'Fermentation in Skincare: Why K-Beauty\'s Fermented Ingredients Are Transforming Skin Health — Korean Skincare Coach', url: 'https://www.koreanskincarecoach.com/blog/fermentation-in-skincare-why-k-beautys-fermented-ingredients-are-transforming-skin-health' },
    { label: 'Galactomyces Ferment Filtrate in Skin Care — Paula\'s Choice', url: 'https://www.paulaschoice.com/ingredient-dictionary/ingredient-galactomyces-ferment-filtrate.html' },
  ],
  'sugar-glycation-skin-aging': [
    { label: 'Advanced Glycation End Products: Key Players in Skin Aging? — PMC', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3583887/' },
    { label: 'Advanced Glycation End Products in the Skin — PMC', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9131003/' },
    { label: 'Advanced Glycation End Products: Mechanics of Aged Collagen from Molecule to Tissue — PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/27616134/' },
    { label: 'Advanced Glycation End Products in the Skin: Molecular Mechanisms and Inhibitory Pathways — Frontiers in Medicine', url: 'https://www.frontiersin.org/journals/medicine/articles/10.3389/fmed.2022.837222/full' },
  ],
  'spicules-microneedling': [
    { label: 'Skin Delivery of siRNA Using Sponge Spicules in Combination with Cationic Flexible Liposomes — ScienceDirect', url: 'https://www.sciencedirect.com/science/article/pii/S2162253120301116' },
    { label: 'Micro-Spicule Skincare: Microneedling in a Bottle? — Dr Rachel Ho', url: 'https://www.drrachelho.com/blog/micro-spicule-skincare-review/' },
    { label: 'Spicules: The K-Beauty Microneedling Alternative — Cosmetics Business', url: 'https://cosmeticsbusiness.com/spicules-the-k-beauty-skin-care-ingredient-primed' },
  ],
  'celebrity-skincare-methods': [
    { label: 'Song Hye Kyo Reveals That Washing Her Face with Milk Is the Secret — AllKPop', url: 'https://www.allkpop.com/article/2021/11/song-hye-kyo-reveals-that-washing-her-face-with-milk-is-the-secret-to-her-flawless-skin' },
    { label: 'I Tried The 4-2-4 Cleansing Method For A Week — Bustle', url: 'https://www.bustle.com/articles/83787-i-tried-the-4-2-4-cleansing-method-for-a-week-to-get-skin-as-clear-as-a' },
    { label: 'Skincare Tips from Korean Stars — Her World Singapore', url: 'https://www.herworld.com/style/beauty/makeup/skincare-korean-celebrity-song-joong-ki-hye-kyo-jessica-jung-suzy-bae-beauty-secrets' },
  ],
  'centella-superbug-discovery': [
    { label: 'Scientists Discover Skincare Compound That Kills Drug-Resistant Bacteria — ScienceDaily', url: 'https://www.sciencedaily.com/releases/2026/04/260420014738.htm' },
    { label: 'Korean Skincare Ingredient Madecassic Acid Shown to Combat Antibiotic Resistance — GeneOnline', url: 'https://www.geneonline.com/korean-skincare-ingredient-madecassic-acid-shown-to-combat-antibiotic-resistance-in-new-study/' },
    { label: 'Scientists Discover the Antibacterial Potential of "Hero" Korean Skincare Ingredient — Phys.org', url: 'https://phys.org/news/2026-04-scientists-antibacterial-potential-hero-korean.html' },
  ],
  'ten-step-routine-dead': [
    { label: 'The Rise of the Minimalist Skincare Routine — Vice', url: 'https://www.vice.com/en/article/do-you-really-need-a-skincare-routine-korean-beauty-dermatologists/' },
    { label: 'The 10-Step Korean Skin Care Routine Vs. Skip-Care — The Klog', url: 'https://theklog.co/skipcare-10-step-korean-skincare-routine/' },
    { label: 'Steps to a Korean Skin Care Routine — Cleveland Clinic', url: 'https://health.clevelandclinic.org/korean-skincare-routine' },
  ],
  'mushroom-skincare-replacing-retinol': [
    { label: 'Macrofungal Extracts as a Source of Bioactive Compounds for Anti-Aging Therapy — PMC', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11356820/' },
    { label: 'Mushroom Skincare Is Trending — Here\'s How Fungi Can Benefit Your Skin — Renée Rouleau', url: 'https://blog.reneerouleau.com/mushroom-skincare/' },
    { label: 'Mushroom Mycelium and Beta-Glucans for Barrier Repair — Revival Labs', url: 'https://www.revivalabs.com/mushroom-mycelium-skincare-beta-glucans-for-barrier-repair/' },
  ],
  // FRAGRANCE
  'boozy-fragrance-chemistry': [
    { label: 'Everything Delicious in Perfumes: Ethyl Maltol and Its Band of Friends — Fragrantica', url: 'https://www.fragrantica.com/news/Everything-Delicious-in-Perfumes-Ethyl-Maltol-and-Its-Band-of-Friends-12848.html' },
    { label: 'Chemistry Flash: Maltol and Ethyl Maltol — Chemist in the Bottle', url: 'https://chemistinthebottle.wordpress.com/2014/04/24/chemistry-flash-maltol-and-ethyl-maltol/' },
    { label: 'Liquor Note in Perfumery — Premiere Peau', url: 'https://premierepeau.com/pages/glossary-terms/liquor' },
  ],
  'hair-perfume-format-trend': [
    { label: 'Hair Perfume Market Size & Share Report 2025–2034 — GM Insights', url: 'https://www.gminsights.com/industry-analysis/hair-perfume-market' },
    { label: 'Hair Perfume Market Expected to Surpass $24 Billion by 2035 — Perfumer & Flavorist', url: 'https://www.perfumerflavorist.com/fragrance/personal-care-beauty/news/22948520/hair-perfume-market-expected-to-surpass-24-billion-by-2035' },
    { label: 'Hair Product Scent Loyalty Statistics for 2025 — Free Yourself', url: 'https://freeyourself.com/blogs/news/hair-product-scent-loyalty-statistics' },
  ],
  'milk-perfume-lactonic': [
    { label: 'Understanding Lactones — Fraterworks', url: 'https://fraterworks.com/blogs/information/understanding-lactones' },
    { label: 'Peaches, Coconuts and Cream: Lactones in Fragrance — Fragrantica', url: 'https://www.fragrantica.com/news/Peaches-Coconuts-and-Cream-Lactones-in-Fragrance-11529.html' },
    { label: 'Scents & Science: A Guide to Esters and Lactones in Perfumery — Drop of Odor', url: 'https://dropofodor.com/en/esters-and-lactones-in-perfumery/' },
  ],
  'tropical-fruit-fragrance': [
    { label: 'Volatile Sulfur Compounds in Tropical Fruits — ScienceDirect', url: 'https://www.sciencedirect.com/science/article/pii/S1021949818300437' },
    { label: 'Comprehensive Analysis of Aroma Compounds in Passion Fruit — Springer Nature', url: 'https://link.springer.com/rwe/10.1007/978-3-031-38663-3_100' },
    { label: 'Guava, Cacao, Acai: Inside the Tropical Boom Redefining Beauty, Food, and Fragrance — Symrise', url: 'https://blog.symrise.com/guava-cacao-acai-inside-the-tropical-boom-redefining-beauty-food-and-fragrance/' },
  ],
  'pistachio-fragrance-note': [
    { label: 'What Is Pistachio in Perfumery? — Premiere Peau', url: 'https://premierepeau.com/pages/glossary-terms/pistachio' },
    { label: 'Pistachio Fragrance Note — Fragrantica', url: 'https://www.fragrantica.com/notes/Pistachio-221.html' },
    { label: 'Best Pistachio Fragrances in 2026: The Note That Broke the Internet — Fragranova', url: 'https://fragranova.com/blog/best-pistachio-fragrances' },
  ],
  'fragrance-wardrobing': [
    { label: 'Repeated Exposure to Odors Induces Affective Habituation of Perception and Sniffing — PMC', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3989720/' },
    { label: 'New Determinants of Olfactory Habituation — Scientific Reports / Nature', url: 'https://www.nature.com/articles/srep41047' },
    { label: 'Olfactory Fatigue — Wikipedia', url: 'https://en.wikipedia.org/wiki/Olfactory_fatigue' },
  ],
  'k-fragrance-skin-scents': [
    { label: 'K-Fragrance Emerges as Next K-Beauty Wave with Record Exports — Seoul Economic Daily', url: 'https://en.sedaily.com/finance/2026/04/13/k-fragrance-emerges-as-next-k-beauty-wave-with-record' },
    { label: 'Korean Fragrances Are the Next Wave to Know in K-Beauty — WWD', url: 'https://wwd.com/beauty-industry-news/fragrance/korean-fragrances-1238949110/' },
    { label: 'K-Perfume in Bloom: How Korea\'s Scents Are Redefining Beauty — The Korea Herald', url: 'https://www.koreaherald.com/article/10451693' },
  ],
  'fragrance-volatility': [
    { label: 'Olfactory Fatigue — Wikipedia', url: 'https://en.wikipedia.org/wiki/Olfactory_fatigue' },
    { label: 'The Fundamentals of Lactone — The Perfumer\'s Valley', url: 'https://www.theperfumersvalley.com/post/fundamentals-of-lactone' },
    { label: 'Fragrance Market Size & Share Industry Report 2033 — Grand View Research', url: 'https://www.grandviewresearch.com/industry-analysis/fragrances-market' },
  ],
  'grown-up-gourmand-matcha-pistachio': [
    { label: 'The Savory Gourmand Revolution: Fragrance Trend 1 of AURA\'s Top 10 for 2026 — AURA Candle Bar', url: 'https://auracandlebar.com/blogs/news/top-ten-fragrance-trends-2026-savory-gourmand' },
    { label: 'New Notes — And Old Ones Rediscovered — Fragrantica', url: 'https://www.fragrantica.com/news/New-Notes-And-Old-Ones-Rediscovered-22736.html' },
    { label: 'Tiramisu, Creme Brulee, Pistachio Latte, Matcha Ice Cream & Lemon Tart — Fragrantica', url: 'https://www.fragrantica.com/news/Tiramisu-Creme-Brulee-Pistachio-Latte-Matcha-Ice-Cream-Lemon-Tart-Bon-Appetit-23355.html' },
  ],
  // WELLNESS
  'ozempic-changing-how-we-eat': [
    { label: 'GLP-1 Drugs Are Changing How Americans Eat — CNBC', url: 'https://www.cnbc.com/2026/03/21/glp-1-diets-restaurants-protein-fiber-weight-loss-drugs.html' },
    { label: 'Ozempic Is Changing the Foods Americans Buy — Cornell Chronicle', url: 'https://news.cornell.edu/stories/2025/12/ozempic-changing-foods-americans-buy' },
    { label: 'How Ozempic and Wegovy Are Quietly Cutting America\'s Food Bills — ScienceDaily', url: 'https://www.sciencedaily.com/releases/2026/01/260112001029.htm' },
    { label: 'GLP-1 Users to Make Up 35% of Food and Beverage Sales by 2030 — Food Dive', url: 'https://www.fooddive.com/news/glp1s-weight-loss-food-beverage-sales-2030/806415/' },
  ],
  'women-supplements-wrong-life-stage': [
    { label: 'Essential Nutrients for Adult Women, in Each Decade of Life — IFIC', url: 'https://ific.org/resources/articles/what-every-woman-should-know-about-food-and-their-health/' },
    { label: 'Macronutrient and Micronutrient Intake Among US Women Aged 20 to 44 — JAMA Network Open', url: 'https://jamanetwork.com/journals/jamanetworkopen/fullarticle/2824678' },
    { label: 'Multivitamin/Mineral Supplements — NIH Office of Dietary Supplements', url: 'https://ods.od.nih.gov/factsheets/MVMS-HealthProfessional/' },
    { label: 'Vitamins and Minerals: The Essentials for Women — Pharmacy Times', url: 'https://www.pharmacytimes.com/view/vitamins-and-minerals-the-essentials-for-women' },
  ],
  'l-theanine-calm-without-drowsiness': [
    { label: 'A Randomized, Triple-Blind, Placebo-Controlled Study on AlphaWave L-Theanine and Stress — PMC', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8475422/' },
    { label: 'L-Theanine: From Tea Leaf to Trending Supplement — PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/39854799/' },
    { label: 'The Effects of L-Theanine on Alpha-Band Oscillatory Brain Activity — PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/18841456/' },
    { label: 'L-Theanine, a Natural Constituent in Tea, and Its Effect on Mental State — PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/18296328/' },
  ],
  'jjimjilbang-wellness-science': [
    { label: 'How the Sauna Affects the Endocrine System — PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/3218898/' },
    { label: 'Endocrine Effects of Sauna Bath — ScienceDirect', url: 'https://www.sciencedirect.com/science/article/abs/pii/S2451965019301048' },
    { label: 'Deliberate Heat Exposure Protocols for Health & Performance — Huberman Lab', url: 'https://www.hubermanlab.com/newsletter/deliberate-heat-exposure-protocols-for-health-and-performance' },
  ],
  'korea-sleep-crisis': [
    { label: 'Korea Sleep Economy 2026: How OECD\'s Most Sleep-Deprived Country Built an $11B Industry — Seoulz', url: 'https://www.seoulz.com/korea-sleep-economy-2026/' },
    { label: 'Sleep Crisis in South Korea: Lowest OECD Sleep Hours — MEDI:GATE NEWS', url: 'https://medigatenews.com/news/2726334626' },
    { label: 'Sleeponomics Growing Rapidly in Korea — The Korea Times', url: 'https://www.koreatimes.co.kr/www/tech/2019/04/694_266561.html' },
  ],
  'creatine-women-brain': [
    { label: 'Effects of Creatine Supplementation on Cognition in Perimenopausal and Menopausal Women (CONCRET-MENOPA) — PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/40854087/' },
    { label: 'Creatine in Women\'s Health: Bridging the Gap from Menstruation Through Pregnancy to Menopause — Taylor & Francis', url: 'https://www.tandfonline.com/doi/full/10.1080/15502783.2025.2502094' },
    { label: 'The Effects of Creatine Supplementation on Cognitive Performance — PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/39070254/' },
    { label: 'Creatine Supplementation in Women\'s Health: A Lifespan Perspective — ResearchGate', url: 'https://www.researchgate.net/publication/349902895_Creatine_Supplementation_in_Women%27s_Health_A_Lifespan_Perspective' },
  ],
  'postbiotics-skin-barrier': [
    { label: 'The Pivotal Role of Bifida Ferment Lysate on Reinforcing the Skin Barrier Function — PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/37218728/' },
    { label: 'Applications of Probiotic Constituents in Cosmetics — PMC', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10574390/' },
    { label: 'Oral and Topical Probiotics and Postbiotics in Skincare — PMC', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10301930/' },
    { label: 'Bifidobacterium Longum Lysate, a New Ingredient for Reactive Skin — PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/19624730/' },
  ],
  'edible-skincare-gut-skin': [
    { label: 'Unraveling the Gut-Skin Axis: The Role of Microbiota in Skin Health and Disease — MDPI Cosmetics', url: 'https://www.mdpi.com/2079-9284/12/4/167' },
    { label: 'The Gut-Skin Axis: Emerging Insights in Understanding and Treating Skin Diseases — PMC', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC12494302/' },
    { label: 'The Gut Microbiome as a Major Regulator of the Gut-Skin Axis — Frontiers in Microbiology', url: 'https://www.frontiersin.org/journals/microbiology/articles/10.3389/fmicb.2018.01459/full' },
    { label: 'Impact of Gut Microbiome on Skin Health — PMC', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9311318/' },
  ],
  'myo-inositol-hormonal-health': [
    { label: 'Effects of Myo-Inositol and D-Chiro-Inositol in 40:1 Ratio on Hormonal and Metabolic Profile in PCOS — PMC', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11126204/' },
    { label: 'Update on the Combination of Myo-Inositol/D-Chiro-Inositol for PCOS Treatment — Taylor & Francis', url: 'https://www.tandfonline.com/doi/full/10.1080/09513590.2023.2301554' },
    { label: 'The 40:1 MI/DCI Plasma Ratio Is Able to Restore Ovulation in PCOS Patients — European Review', url: 'https://www.europeanreview.org/article/18223' },
    { label: 'Combined Therapy with MI and DCI Improves Endocrine Parameters in PCOS — PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/27493664/' },
  ],
  'adaptogens-bioavailability': [
    { label: 'Lion\'s Mane & Adaptogens: Merging Focus & Endurance — BF-EssE', url: 'https://bfesse.com/sport-nutrition-cmo/lions-mane-adaptogen-endurance-focus' },
    { label: 'Liposomal Delivery for Enhanced Mushroom Bioavailability — Florida Shroom King', url: 'https://floridashroomking.com/pages/liposomal-delivery' },
    { label: 'Adaptogen Guide for Beverages: Ashwagandha, Lion\'s Mane and More — Beverage Daily', url: 'https://www.beveragedaily.com/Article/2025/03/18/adaptogen-guide-for-beverages-ashwagandha-lions-mane-and-more/' },
  ],
  'korea-sleep-wellness-snacks': [
    { label: 'GABA Sleep Gummies Market Size & Share 2025–2030 — 360iResearch', url: 'https://www.360iresearch.com/library/intelligence/gaba-sleep-gummies' },
    { label: 'Gummies Come on Strong in Supplement Market — Glanbia Nutritionals', url: 'https://www.glanbianutritionals.com/en/nutri-knowledge-center/insights/gummies-come-strong-supplement-market' },
    { label: 'Sleep Gummy Market Size, Growth & Forecast 2025 to 2035 — Future Market Insights', url: 'https://www.futuremarketinsights.com/reports/sleep-gummy-market' },
  ],
  'fibermaxxing-gut-skin-hormones': [
    { label: 'High-Fiber, Whole-Food Dietary Intervention Alters the Human Gut Microbiome — PMC', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8546969/' },
    { label: 'Dietary Fiber Intake and Gut Microbiota in Human Health — PMC', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9787832/' },
    { label: 'Why Fiber Matters: Essential Foods for a Healthy Gut Microbiome — Mayo Clinic Press', url: 'https://mcpress.mayoclinic.org/healthygut/why-fiber-matters-essential-foods-for-a-healthy-gut-microbiome/' },
  ],
  'pdrn-salmon-dna': [
    { label: 'Polydeoxyribonucleotides as Emerging Therapeutics for Skin Diseases — MDPI Applied Sciences', url: 'https://www.mdpi.com/2076-3417/15/19/10437' },
    { label: 'Pharmacological Activity and Clinical Use of PDRN — PMC', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5405115/' },
    { label: 'Polydeoxyribonucleotide Regulation of Inflammation — PMC', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7585621/' },
    { label: 'The Impact of Polydeoxyribonucleotide on Wound Healing — International Journal of Surgery', url: 'https://www.ijsurgery.com/index.php/isj/article/download/11044/6597/52236' },
  ],
};

async function run() {
  // Fetch all articles
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/articles?select=id,body_blocks&order=created_at.desc`,
    { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } }
  );
  const articles = await res.json();

  let updated = 0;
  let skipped = 0;
  let noSources = 0;

  for (const a of articles) {
    const blocks = a.body_blocks || [];
    const hasSources = blocks.some(b => b.type === 'sources');
    if (hasSources) { skipped++; continue; }

    const sources = SOURCES[a.id];
    if (!sources) { noSources++; console.log(`⚠ No sources defined for: ${a.id}`); continue; }

    // Append sources block
    const newBlocks = [...blocks, { type: 'sources', items: sources }];

    const updateRes = await fetch(
      `${SUPABASE_URL}/rest/v1/articles?id=eq.${a.id}`,
      {
        method: 'PATCH',
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({ body_blocks: newBlocks }),
      }
    );

    if (updateRes.ok) {
      updated++;
      console.log(`✓ ${a.id} — ${sources.length} sources added`);
    } else {
      console.log(`✗ ${a.id} — ${updateRes.status} ${await updateRes.text()}`);
    }
  }

  console.log(`\nDone: ${updated} updated, ${skipped} already had sources, ${noSources} had no sources defined`);
}

run();
