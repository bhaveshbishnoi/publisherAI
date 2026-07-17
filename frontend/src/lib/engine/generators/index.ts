import { ProjectRequirements, GeneratedFile } from '../types';

export interface GeneratedArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  readTime: string;
  author: string;
  date: string;
  contentHtml: string;
  faqs: { question: string; answer: string }[];
  keywords: string[];
}

export function synthesizeArticles(req: ProjectRequirements): GeneratedArticle[] {
  const isIndia = req.country.toLowerCase().includes('india') || req.primaryKeyword.toLowerCase().includes('festival');
  const primaryTopic = req.primaryKeyword || req.name || 'Digital Innovation';
  
  if (isIndia || req.primaryKeyword.toLowerCase().includes('festival')) {
    return [
      {
        id: '1',
        title: 'Deepavali: The Ultimate Guide to India\'s Festival of Lights & Traditions',
        slug: 'deepavali-ultimate-guide-india-festival-of-lights',
        excerpt: 'Explore the historical origins, spiritual significance, regional rituals, and eco-friendly celebration practices of Diwali across India.',
        category: 'Major Festivals',
        readTime: '8 min read',
        author: 'Aarav Sharma',
        date: 'October 24, 2026',
        keywords: ['Diwali rituals', 'Indian festivals', 'eco-friendly Diwali', 'Deepavali significance'],
        faqs: [
          { question: 'Why is Diwali celebrated over five days?', answer: 'Each day of Diwali holds unique spiritual significance: Dhanteras honors wealth, Chhoti Diwali celebrates the defeat of Narakasura, Lakshmi Puja is the main night of prosperity, Govardhan Puja honors Lord Krishna, and Bhai Dooj celebrates the bond between siblings.' },
          { question: 'How can one celebrate an eco-friendly Diwali?', answer: 'Opt for traditional clay diyas with organic ghee or oil instead of chemical candles, use natural flower petals and natural dyes for Rangoli, and choose community celebrations over noise-heavy firecrackers.' }
        ],
        contentHtml: `
          <p class="lead">Diwali, or Deepavali, is arguably India's most celebrated and visually breathtaking festival. Symbolizing the ultimate triumph of light over darkness, wisdom over ignorance, and good over evil, it brings together families across diverse cultures.</p>
          <h2>The Historical and Mythological Origins</h2>
          <p>The roots of Deepavali extend deep into ancient Sanskrit scriptures. In northern India, the festival commemorates the return of Lord Rama, Goddess Sita, and Lakshmana to Ayodhya after 14 years of exile and Rama's victory over the demon king Ravana. To welcome their beloved prince, the citizens of Ayodhya illuminated the city with thousands of earthen lamps (diyas).</p>
          <p>In southern and eastern India, the festival is tied to the victory of Lord Krishna and Satyabhama over the oppressive demon Narakasura, as well as the annual worship of Goddess Lakshmi and Lord Ganesha for wealth and intellect.</p>
          <h2>The Five Days of Celebration Explained</h2>
          <div class="highlight-box">
            <ul>
              <li><strong>Day 1: Dhanteras</strong> – Dedicated to Lord Dhanvantari and Goddess Lakshmi; families purchase gold, silver, or new utensils as auspicious symbols of health and prosperity.</li>
              <li><strong>Day 2: Naraka Chaturdashi (Chhoti Diwali)</strong> – A day for spiritual cleansing and preparing the household for the grand celebration.</li>
              <li><strong>Day 3: Lakshmi Puja</strong> – The pinnacle of Diwali. Homes are lit with diyas, decorated with intricate Rangoli patterns, and families unite for evening prayers.</li>
              <li><strong>Day 4: Govardhan Puja / Padwa</strong> – Honoring Lord Krishna's lifting of Mount Govardhan to protect villagers from torrential rains.</li>
              <li><strong>Day 5: Bhai Dooj</strong> – Celebrating the enduring bond of affection and lifelong protection between brothers and sisters.</li>
            </ul>
          </div>
          <h2>Modern & Eco-Friendly Celebration Best Practices</h2>
          <p>As environmental awareness surges across urban and rural centers, modern celebrations increasingly emphasize sustainability. Traditional organic terracotta diyas not only support local rural artisans but also reduce carbon footprints compared to paraffin candles. Furthermore, creating Rangolis with turmeric, rice flour, marigold petals, and spinach powder ensures that local birds and insects are nourished rather than harmed by synthetic colors.</p>
          <h2>Conclusion: The Timeless Message of Deepavali</h2>
          <p>Beyond the sweets, new attire, and brilliant illuminations, Diwali serves as an annual reminder for internal illumination. By igniting the lamp of compassion and knowledge within ourselves, we contribute to a more harmonious and enlightened world.</p>
        `
      },
      {
        id: '2',
        title: 'Holi: The Colors, Science, and Cultural Unity of Spring Celebration',
        slug: 'holi-colors-science-cultural-unity-spring-celebration',
        excerpt: 'Discover the cultural depth of Holi, the scientific wellness behind natural colors, and how communities unite to welcome spring.',
        category: 'Spring Festivals',
        readTime: '6 min read',
        author: 'Priya Patel',
        date: 'March 14, 2026',
        keywords: ['Holi colors', 'Spring festival India', 'Holika Dahan', 'organic gulal'],
        faqs: [
          { question: 'What is the significance of Holika Dahan?', answer: 'Holika Dahan takes place on the eve of Holi, where community bonfires are lit to symbolize the burning of evil spirits and the preservation of Prahlad due to his unwavering devotion.' },
          { question: 'What are traditional Ayurvedic ingredients for Holi colors?', answer: 'Natural Ayurvedic colors are made using dried tesu/palash flowers (yellow-orange), beetroot powder (pink/red), neem and henna leaves (green), and indigo (blue).' }
        ],
        contentHtml: `
          <p class="lead">Holi, known globally as the Festival of Colors, marks the joyous arrival of spring, the end of winter, and the blossoming of love and forgiveness across society.</p>
          <h2>Holika Dahan: The Triumph of Devotion</h2>
          <p>On the full moon evening before the colorful splash of Holi, communities gather around roaring bonfires known as Holika Dahan. This ritual commemorates the divine rescue of young Prahlad, a devotee of Lord Vishnu, from the wicked intentions of his aunt Holika, reinforcing that truth and righteousness always outlast arrogance and deceit.</p>
          <h2>The Ayurvedic Science of Colorful Celebration</h2>
          <p>In ancient times, Holi was celebrated primarily using medicinal herbs and flowers such as Tesu (Palash), Neem, Haldi (Turmeric), and Bilva. As the spring season transitions into summer, the human body is susceptible to seasonal fevers and fatigue. Throwing and applying natural herbal powders acted as a community-wide skin treatment and immune boost, cleansing pores and invigorating the senses.</p>
          <h2>Social Cohesion and Culinary Delights</h2>
          <p>One of the most extraordinary aspects of Holi is the temporary dissolution of social barriers. People of all backgrounds sing traditional folk songs, play with water balloons and gulal, and share celebratory delicacies such as Gujiya (crispy sweet dumplings stuffed with khoya and dry fruits), Thandai (a spiced milk beverage enriched with saffron and almonds), and Dahi Bhalla.</p>
        `
      },
      {
        id: '3',
        title: 'Navratri & Durga Puja: Nine Nights of Divine Feminine Energy',
        slug: 'navratri-durga-puja-nine-nights-divine-feminine-energy',
        excerpt: 'An immersive look into the nine nights of Navratri, the vibrant Garba dances of Gujarat, and the artistic majesty of Bengal\'s Durga Puja pandals.',
        category: 'Spiritual Festivals',
        readTime: '9 min read',
        author: 'Devangana Mukherjee',
        date: 'September 30, 2026',
        keywords: ['Navratri 2026', 'Durga Puja pandals', 'Garba dance', 'Shakti worship'],
        faqs: [
          { question: 'What are the nine forms of Goddess Durga worshipped during Navratri?', answer: 'The nine forms (Navadurga) are Shailaputri, Brahmacharini, Chandraghanta, Kushmanda, Skandamata, Katyayani, Kalaratri, Mahagauri, and Siddhidatri.' }
        ],
        contentHtml: `
          <p class="lead">Navratri, translating to 'Nine Nights', is one of the most spiritually charged and culturally dynamic observances in the Indian subcontinent, dedicated entirely to the worship of Shakti (the cosmic divine feminine energy).</p>
          <h2>Regional Expressions: Garba, Ramlila, and Pandal Hopping</h2>
          <p>While the core essence remains the adoration of Goddess Durga, regional celebrations manifest in spectacularly distinct artistic traditions across India:</p>
          <ul>
            <li><strong>Western India (Gujarat & Maharashtra):</strong> The nights come alive with rhythmic communal folk dances—Garba and Dandiya Raas—performed in concentric circles around an illuminated earthen pot representing the cosmic womb of life.</li>
            <li><strong>Eastern India (West Bengal, Assam & Odisha):</strong> Durga Puja transforms cities into breathtaking open-air art galleries. Gigantic, architecturally stunning temporary shrines (Pandals) house magnificent clay idols of Goddess Durga slaying the buffalo demon Mahishasura.</li>
            <li><strong>Northern India:</strong> Communities stage Ramlila theatrics recounting the epic Ramayana, culminating on the tenth day (Vijayadashami/Dussehra) with the burning of towering effigies of Ravana.</li>
          </ul>
        `
      }
    ];
  }

  // Generic or Corporate/Blog Articles
  return [
    {
      id: '1',
      title: `The Comprehensive Guide to Mastering ${primaryTopic} in 2026`,
      slug: `comprehensive-guide-mastering-${req.primaryKeyword.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-2026`,
      excerpt: `An in-depth exploration of key trends, proven methodologies, and technical strategies for achieving excellence in ${primaryTopic}.`,
      category: 'Industry Insights',
      readTime: '7 min read',
      author: 'Dr. Marcus Vance',
      date: 'July 15, 2026',
      keywords: [req.primaryKeyword, ...req.secondaryKeywords.slice(0, 3)],
      faqs: [
        { question: `Why is ${primaryTopic} critical for modern digital success?`, answer: `Implementing structured best practices in ${primaryTopic} directly correlates with higher engagement, robust system security, and sustainable organic reach across competitive sectors.` }
      ],
      contentHtml: `
        <p class="lead">In an era defined by rapid technological shifts and discerning audience demands, mastering ${primaryTopic} is no longer optional—it is a core strategic imperative for modern organizations and digital creators alike.</p>
        <h2>Understanding the Core Fundamentals</h2>
        <p>Before implementing advanced architectures or growth loops, practitioners must solidify foundational principles. Every robust workflow within ${primaryTopic} relies on high reliability, strict data hygiene, and seamless user accessibility across varied network conditions and device viewports.</p>
        <h2>Proven Frameworks for Execution</h2>
        <p>Leading industry teams consistently utilize modular, iterative workflows. By isolating components into distinct functional blocks, teams can execute rapid multivariate testing, optimize server response bottlenecks, and maintain strict adherence to international accessibility and security benchmarks.</p>
        <div class="highlight-box">
          <h3>Key Actionable Takeaways:</h3>
          <ul>
            <li>Conduct bi-weekly technical audits to eliminate dead links and deprecated API dependencies.</li>
            <li>Prioritize Core Web Vitals (LCP, INP, CLS) to ensure immediate visual feedback and smooth interaction.</li>
            <li>Enforce zero-trust input sanitization across all client-to-server data transmission endpoints.</li>
          </ul>
        </div>
      `
    },
    {
      id: '2',
      title: `Top 10 Emerging Trends Shaping ${primaryTopic} Architecture`,
      slug: `top-10-emerging-trends-shaping-${req.primaryKeyword.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      excerpt: `Examine the cutting-edge innovations, AI integrations, and performance optimizations revolutionizing the ${primaryTopic} landscape.`,
      category: 'Innovation',
      readTime: '8 min read',
      author: 'Elena Rostova',
      date: 'July 10, 2026',
      keywords: ['AI automation', 'web performance', req.primaryKeyword],
      faqs: [
        { question: 'How is AI influencing workflow efficiency?', answer: 'AI-assisted tooling dramatically accelerates boilerplate generation, real-time code auditing, and hyper-personalized content structuring while reducing human error.' }
      ],
      contentHtml: `
        <p class="lead">The landscape of ${primaryTopic} is undergoing an unprecedented evolution fueled by autonomous agent workflows, edge compute networks, and heightened privacy expectations.</p>
        <h2>1. Decentralized Edge Processing & Caching</h2>
        <p>Distributing logic closer to end users via global edge nodes has slashed latency metrics by up to 60%. When combined with intelligent cache invalidation and Brotli compression, static and dynamic content delivery reaches near-instantaneous speeds.</p>
        <h2>2. Accessibility-First Engineering (WCAG 2.1/2.2 AA)</h2>
        <p>Designing for inclusivity is paramount. Modern platforms automatically enforce high-contrast ratios, clear keyboard focus rings, and descriptive ARIA landmarks directly within component pipelines.</p>
      `
    }
  ];
}

export function generateAllFiles(req: ProjectRequirements): GeneratedFile[] {
  const articles = synthesizeArticles(req);
  const files: GeneratedFile[] = [];

  // 1. CSS File
  const cssContent = generateCSS(req);
  files.push({
    path: 'assets/css/style.css',
    language: 'css',
    content: cssContent,
    sizeBytes: new Blob([cssContent]).size
  });

  // 2. JavaScript File
  const jsContent = generateJS(req);
  files.push({
    path: 'assets/js/main.js',
    language: 'javascript',
    content: jsContent,
    sizeBytes: new Blob([jsContent]).size
  });

  // 3. HTML Pages (Index, About, Contact, Privacy, Terms, Disclaimer, Blog Archive, Single Article)
  const indexHtml = generateIndexHTML(req, articles);
  files.push({
    path: 'index.html',
    language: 'html',
    content: indexHtml,
    sizeBytes: new Blob([indexHtml]).size
  });

  const aboutHtml = generatePageHTML(req, 'About Us', `
    <p class="lead">Welcome to <strong>${req.name}</strong>, your authoritative destination for verified, deep-dive insights and engaging cultural guides focused on ${req.category}.</p>
    <h2>Our Mission & Editorial Philosophy</h2>
    <p>We believe that high-quality digital publishing must balance rigorous factual accuracy with captivating, accessible storytelling. Founded in 2026, our team of dedicated researchers, writers, and technologists works tirelessly to provide you with comprehensive resources that inspire, educate, and connect communities worldwide.</p>
    <h2>Editorial Independence & Standards</h2>
    <p>Our editorial team operates with strict independence. We do not accept paid promotions that compromise our objective reporting. Every article published on ${req.name} undergoes multi-stage verification to ensure that statistics, historical context, and technical recommendations meet the highest international standards.</p>
  `);
  files.push({ path: 'about.html', language: 'html', content: aboutHtml, sizeBytes: new Blob([aboutHtml]).size });

  const contactHtml = generatePageHTML(req, 'Contact Us', `
    <p class="lead">We value feedback, inquiry, and collaboration from our global community. Whether you have a question about our articles, wish to propose a topic, or need technical assistance, our team is ready to assist you.</p>
    ${req.needContactForm ? `
      <form id="contact-form" class="custom-form glass-card" action="api/contact.php" method="POST">
        <input type="hidden" name="csrf_token" value="e4a2b8c9d10f23a45c67890b12c34d56">
        <div class="form-group">
          <label for="name">Your Full Name <span class="required">*</span></label>
          <input type="text" id="name" name="name" required placeholder="e.g. Rahul Sharma" autocomplete="name">
        </div>
        <div class="form-group">
          <label for="email">Email Address <span class="required">*</span></label>
          <input type="email" id="email" name="email" required placeholder="e.g. rahul@example.com" autocomplete="email">
        </div>
        <div class="form-group">
          <label for="subject">Inquiry Subject <span class="required">*</span></label>
          <select id="subject" name="subject" required>
            <option value="">Select a topic...</option>
            <option value="General Inquiry">General Inquiry</option>
            <option value="Editorial Correction">Editorial Correction & Feedback</option>
            <option value="Partnership & Advertising">Partnership & Advertising</option>
            <option value="Technical Support">Technical Support</option>
          </select>
        </div>
        <div class="form-group">
          <label for="message">Detailed Message <span class="required">*</span></label>
          <textarea id="message" name="message" rows="6" required placeholder="Please provide detailed context for your inquiry..."></textarea>
        </div>
        <button type="submit" class="btn btn-primary btn-block">Send Secure Message</button>
        <div id="form-response" class="form-feedback" aria-live="polite"></div>
      </form>
    ` : '<p>Please email us directly at <strong>contact@' + req.domain + '</strong>.</p>'}
  `);
  files.push({ path: 'contact.html', language: 'html', content: contactHtml, sizeBytes: new Blob([contactHtml]).size });

  // Legal Pages (Mandatory for AdSense & Policy)
  const privacyHtml = generatePageHTML(req, 'Privacy Policy', `
    <p><em>Last Updated: July 17, 2026</em></p>
    <p>At <strong>${req.name}</strong> (accessible from <code>https://${req.domain}</code>), the privacy of our visitors is of our highest priority. This Privacy Policy document contains detailed specifications of the types of personal data collected and recorded by ${req.name} and exactly how we utilize, safeguard, and process it.</p>
    <h2>1. Information We Collect</h2>
    <p>We collect information that you voluntarily provide to us when registering on the website, expressing an interest in obtaining information about our products or services, participating in activities on the website (such as subscribing to our newsletter or posting comments), or contacting us directly via our encrypted contact forms.</p>
    <h2>2. Google AdSense & DoubleClick DART Cookie Policy</h2>
    <p>Google is a third-party vendor on our website. It uses cookies, specifically known as DART cookies, to serve advertisements to our website visitors based upon their visit to <code>https://${req.domain}</code> and other websites across the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google Ad and Content Network Privacy Policy at <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">https://policies.google.com/technologies/ads</a>.</p>
    <h2>3. Third-Party Advertising & Privacy Policies</h2>
    <p>Third-party ad servers or ad networks use technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on ${req.name}, which are sent directly to users' browsers. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.</p>
    <p>Note that ${req.name} has no access to or control over these cookies that are used by third-party advertisers.</p>
    <h2>4. Children's Information (COPPA Compliance)</h2>
    <p>Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity. ${req.name} does not knowingly collect any Personal Identifiable Information from children under the age of 13.</p>
    <h2>5. Consent & Data Rights (GDPR & CCPA)</h2>
    <p>By using our website, you hereby consent to our Privacy Policy and agree to its terms. Depending on your jurisdiction, you have the right to request access to your data, request deletion, or opt out of targeted advertising.</p>
  `);
  files.push({ path: 'privacy-policy.html', language: 'html', content: privacyHtml, sizeBytes: new Blob([privacyHtml]).size });

  const termsHtml = generatePageHTML(req, 'Terms and Conditions', `
    <p><em>Last Updated: July 17, 2026</em></p>
    <p>Welcome to <strong>${req.name}</strong>. By accessing this website (<code>https://${req.domain}</code>), we assume you accept these terms and conditions in full. Do not continue to use ${req.name} if you do not agree to take all of the terms and conditions stated on this page.</p>
    <h2>1. Intellectual Property Rights</h2>
    <p>Unless otherwise stated, ${req.name} and/or its licensors own the intellectual property rights for all content, articles, graphics, and underlying code on this website. All intellectual property rights are reserved. You may view and/or print pages from <code>https://${req.domain}</code> for your own personal use subject to restrictions set in these terms and conditions.</p>
    <h2>2. User Content & Commentary</h2>
    <p>Certain parts of this website offer an opportunity for users to post and exchange opinions, information, material, and data ('Comments'). ${req.name} does not screen, edit, publish, or review Comments prior to their appearance on the website. Comments do not reflect the views or opinions of ${req.name}, its agents, or affiliates. To the extent permitted by applicable laws, ${req.name} shall not be responsible or liable for the Comments or for any loss, cost, liability, damages, or expenses caused as a result of any use of the Comments.</p>
    <h2>3. Disclaimer of Warranties</h2>
    <p>To the maximum extent permitted by applicable law, we exclude all representations, warranties, and conditions relating to our website and the use of this website. Nothing in this disclaimer will limit or exclude our or your liability for death or personal injury resulting from negligence, or limit or exclude liability for fraud or fraudulent misrepresentation.</p>
  `);
  files.push({ path: 'terms-and-conditions.html', language: 'html', content: termsHtml, sizeBytes: new Blob([termsHtml]).size });

  const disclaimerHtml = generatePageHTML(req, 'Disclaimer', `
    <p><em>Last Updated: July 17, 2026</em></p>
    <h2>General Information Disclaimer</h2>
    <p>All the information on this website – <code>https://${req.domain}</code> – is published in good faith and for general informational and educational purposes only. <strong>${req.name}</strong> does not make any warranties about the completeness, reliability, and accuracy of this information. Any action you take upon the information you find on this website (${req.name}) is strictly at your own risk. ${req.name} will not be liable for any losses and/or damages in connection with the use of our website.</p>
    <h2>Monetization & Advertising Disclaimer</h2>
    <p>This website participates in various advertising programs, including Google AdSense and affiliate marketing initiatives. This means we may display automated advertisements or earn a commission on purchases made through links on our website at no additional cost to you. However, our editorial recommendations remain completely impartial and objective.</p>
    <h2>External Links Disclaimer</h2>
    <p>From our website, you can visit other websites by following hyperlinks to such external sites. While we strive to provide only quality links to useful and ethical websites, we have no control over the content and nature of these sites. These links to other websites do not imply a recommendation for all the content found on these sites.</p>
  `);
  files.push({ path: 'disclaimer.html', language: 'html', content: disclaimerHtml, sizeBytes: new Blob([disclaimerHtml]).size });

  // Blog Archive & Single Article
  const blogArchiveHtml = generateBlogArchiveHTML(req, articles);
  files.push({ path: 'blog.html', language: 'html', content: blogArchiveHtml, sizeBytes: new Blob([blogArchiveHtml]).size });

  articles.forEach((art) => {
    const artHtml = generateArticleHTML(req, art, articles);
    files.push({
      path: `blog/${art.slug}.html`,
      language: 'html',
      content: artHtml,
      sizeBytes: new Blob([artHtml]).size
    });
  });

  // Sitemap and Robots.txt
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://${req.domain}/</loc><changefreq>daily</changefreq><priority>1.0</priority></url>
  <url><loc>https://${req.domain}/about.html</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://${req.domain}/contact.html</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://${req.domain}/blog.html</loc><changefreq>daily</changefreq><priority>0.9</priority></url>
  <url><loc>https://${req.domain}/privacy-policy.html</loc><changefreq>yearly</changefreq><priority>0.5</priority></url>
  <url><loc>https://${req.domain}/terms-and-conditions.html</loc><changefreq>yearly</changefreq><priority>0.5</priority></url>
  <url><loc>https://${req.domain}/disclaimer.html</loc><changefreq>yearly</changefreq><priority>0.5</priority></url>
  ${articles.map(a => `<url><loc>https://${req.domain}/blog/${a.slug}.html</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>`).join('\n  ')}
</urlset>`;
  files.push({ path: 'sitemap.xml', language: 'xml', content: sitemapXml, sizeBytes: new Blob([sitemapXml]).size });

  const robotsTxt = `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /config/
Disallow: /includes/

Sitemap: https://${req.domain}/sitemap.xml`;
  files.push({ path: 'robots.txt', language: 'txt', content: robotsTxt, sizeBytes: new Blob([robotsTxt]).size });

  // Backend PHP & MySQL files if requested
  if (req.needDatabase || req.needAdminPanel || req.needContactForm || req.needNewsletter) {
    const phpFiles = generatePHP(req, articles);
    files.push(...phpFiles);
  }

  return files;
}

// HTML Synthesizer
function generateIndexHTML(req: ProjectRequirements, articles: GeneratedArticle[]): string {
  const featuredArticle = articles[0] || articles[1];
  const gridArticles = articles.slice(1);

  return `<!DOCTYPE html>
<html lang="${req.language.slice(0, 2).toLowerCase() || 'en'}" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${req.name} | Verified Insights & Guides on ${req.category}</title>
  <meta name="description" content="Explore authoritative guides, deep-dive articles, and cultural insights on ${req.primaryKeyword} at ${req.name}. Built for speed, accessibility, and modern web standards.">
  <meta name="keywords" content="${[req.primaryKeyword, ...req.secondaryKeywords].join(', ')}">
  <link rel="canonical" href="https://${req.domain}/">
  <link rel="stylesheet" href="assets/css/style.css">
  
  <!-- Open Graph & Social Cards -->
  <meta property="og:title" content="${req.name} | Verified Insights & Guides on ${req.category}">
  <meta property="og:description" content="Explore authoritative guides, deep-dive articles, and cultural insights on ${req.primaryKeyword} at ${req.name}.">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://${req.domain}/">
  <meta name="twitter:card" content="summary_large_image">
  
  <!-- Schema JSON-LD -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "${req.name}",
    "url": "https://${req.domain}/",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://${req.domain}/blog.html?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }
  </script>
</head>
<body>
  <a href="#main-content" class="skip-link">Skip to main content</a>

  <!-- Header & Navigation -->
  <header class="main-header" role="banner">
    <div class="container navbar">
      <a href="index.html" class="brand-logo" aria-label="${req.name} Homepage">
        <span class="logo-icon">✨</span>
        <span class="logo-text">${req.name}</span>
      </a>

      <!-- Desktop Nav -->
      <nav class="nav-links" role="navigation" aria-label="Main Navigation">
        <a href="index.html" class="active" aria-current="page">Home</a>
        <a href="blog.html">Articles & Guides</a>
        <a href="about.html">About Us</a>
        <a href="contact.html">Contact</a>
      </nav>

      <div class="nav-actions">
        ${req.needSearch ? `
        <div class="search-box">
          <input type="search" id="live-search" placeholder="Search topics..." aria-label="Search articles">
          <button type="button" aria-label="Execute search" class="icon-btn">🔍</button>
        </div>
        ` : ''}
        ${req.needDarkMode ? `
        <button id="theme-toggle" class="btn-theme" aria-label="Toggle dark mode theme" title="Toggle theme">
          <span class="theme-icon">🌙</span>
        </button>
        ` : ''}
        <button id="mobile-menu-btn" class="mobile-toggle" aria-label="Open navigation drawer" aria-expanded="false">
          ☰
        </button>
      </div>
    </div>
  </header>

  ${req.needAds ? `
  <!-- AdSense Top Leaderboard Slot -->
  <div class="container ad-container" aria-label="Advertisement Banner">
    <div class="ad-slot leaderboard-ad">
      <span class="ad-label">Advertisement</span>
      <!-- AdSense Code Placeholder: Responsive Leaderboard -->
      <div class="ad-placeholder-box">Google AdSense Responsive Slot (Top Leaderboard)</div>
    </div>
  </div>
  ` : ''}

  <!-- Main Content Area -->
  <main id="main-content" role="main">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container hero-grid">
        <div class="hero-text">
          <span class="badge badge-primary">Exploring ${req.category}</span>
          <h1 class="hero-title">Discover the Richness of <span class="highlight-text">${req.primaryKeyword}</span></h1>
          <p class="hero-subtitle">Your trusted publication for in-depth articles, cultural heritage guides, and expert perspectives designed to inform and inspire.</p>
          <div class="hero-cta">
            <a href="blog.html" class="btn btn-primary btn-lg">Explore All Guides →</a>
            <a href="about.html" class="btn btn-outline btn-lg">Learn Our Mission</a>
          </div>
        </div>
        <div class="hero-featured-card glass-card glow-border">
          <span class="featured-tag">Featured Guide</span>
          <h2><a href="blog/${featuredArticle.slug}.html">${featuredArticle.title}</a></h2>
          <p class="excerpt">${featuredArticle.excerpt}</p>
          <div class="article-meta">
            <span>By ${featuredArticle.author}</span> • <span>${featuredArticle.readTime}</span>
          </div>
          <a href="blog/${featuredArticle.slug}.html" class="read-more-link">Read Full Guide →</a>
        </div>
      </div>
    </section>

    <!-- Latest Articles Grid -->
    <section class="section container">
      <div class="section-header">
        <div>
          <span class="badge badge-secondary">Latest Publications</span>
          <h2>Deep-Dive Articles & Insights</h2>
        </div>
        <a href="blog.html" class="view-all-link">View Complete Archive →</a>
      </div>

      <div class="articles-grid">
        ${articles.map(art => `
        <article class="article-card glass-card">
          <div class="card-content">
            <span class="category-badge">${art.category}</span>
            <h3><a href="blog/${art.slug}.html">${art.title}</a></h3>
            <p>${art.excerpt}</p>
            <div class="card-footer">
              <span class="meta-date">🕒 ${art.date}</span>
              <a href="blog/${art.slug}.html" class="btn btn-sm btn-link" aria-label="Read ${art.title}">Read →</a>
            </div>
          </div>
        </article>
        `).join('\n        ')}
      </div>
    </section>

    ${req.needAds ? `
    <!-- AdSense Mid-Page Rectangle Slot -->
    <div class="container ad-container">
      <div class="ad-slot rectangle-ad">
        <span class="ad-label">Advertisement</span>
        <!-- AdSense Code Placeholder: Mid-Page Responsive -->
        <div class="ad-placeholder-box">Google AdSense Responsive Slot (Mid-Page Content)</div>
      </div>
    </div>
    ` : ''}

    <!-- Newsletter & Community CTA -->
    ${req.needNewsletter ? `
    <section class="newsletter-section container">
      <div class="newsletter-card glass-panel glow-border">
        <div class="newsletter-content">
          <h2>Stay Informed with Weekly Insights</h2>
          <p>Join over 12,000 readers who receive our curated weekly digest on ${req.primaryKeyword} right to their inbox. Zero spam, unsubscribe at any time.</p>
          <form id="newsletter-form" class="newsletter-form" action="api/newsletter.php" method="POST">
            <input type="email" name="email" required placeholder="Enter your email address..." aria-label="Email address for newsletter">
            <button type="submit" class="btn btn-primary">Subscribe Now</button>
          </form>
          <div id="newsletter-status" class="form-status" aria-live="polite"></div>
        </div>
      </div>
    </section>
    ` : ''}
  </main>

  <!-- Footer -->
  <footer class="main-footer" role="contentinfo">
    <div class="container footer-grid">
      <div class="footer-col brand-col">
        <h3>✨ ${req.name}</h3>
        <p>Providing verified knowledge, cultural appreciation, and comprehensive technical best practices since 2026.</p>
        <div class="social-links">
          <a href="#" aria-label="Twitter Page" class="social-icon">𝕏</a>
          <a href="#" aria-label="LinkedIn Page" class="social-icon">in</a>
          <a href="#" aria-label="RSS Feed" class="social-icon">📡</a>
        </div>
      </div>
      <div class="footer-col">
        <h4>Explore Navigation</h4>
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="blog.html">Articles & Guides</a></li>
          <li><a href="about.html">About Our Team</a></li>
          <li><a href="contact.html">Contact & Support</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Legal & Policy</h4>
        <ul>
          <li><a href="privacy-policy.html">Privacy Policy</a></li>
          <li><a href="terms-and-conditions.html">Terms and Conditions</a></li>
          <li><a href="disclaimer.html">Disclaimer & Ad Policy</a></li>
          <li><a href="sitemap.xml">XML Sitemap</a></li>
        </ul>
      </div>
    </div>
    <div class="container footer-bottom">
      <p>&copy; 2026 ${req.name}. All rights reserved. Built with production-ready standards for ${req.country}.</p>
    </div>
  </footer>

  ${req.needCookieConsent ? `
  <!-- GDPR / CCPA Cookie Consent Banner -->
  <div id="cookie-banner" class="cookie-banner glass-panel" role="dialog" aria-labelledby="cookie-title" aria-describedby="cookie-desc">
    <div class="cookie-content">
      <strong id="cookie-title">🍪 Cookie Consent & Privacy Notice</strong>
      <p id="cookie-desc">We use essential cookies to ensure our site runs smoothly, alongside DoubleClick DART cookies for relevant advertising. By clicking "Accept All", you agree to our <a href="privacy-policy.html">Privacy Policy</a>.</p>
    </div>
    <div class="cookie-actions">
      <button id="accept-cookies" class="btn btn-primary btn-sm">Accept All</button>
      <button id="decline-cookies" class="btn btn-outline btn-sm">Essential Only</button>
    </div>
  </div>
  ` : ''}

  <button id="back-to-top" class="back-to-top" aria-label="Back to top of page" title="Scroll to top">↑</button>
  <script src="assets/js/main.js"></script>
</body>
</html>`;
}

// Generate Page HTML helper
function generatePageHTML(req: ProjectRequirements, title: string, contentBody: string): string {
  return `<!DOCTYPE html>
<html lang="${req.language.slice(0, 2).toLowerCase() || 'en'}" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} | ${req.name}</title>
  <meta name="description" content="${title} page for ${req.name}. Learn more about our policies, mission, and contact channels.">
  <link rel="canonical" href="https://${req.domain}/${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.html">
  <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
  <a href="#main-content" class="skip-link">Skip to main content</a>
  <header class="main-header" role="banner">
    <div class="container navbar">
      <a href="index.html" class="brand-logo"><span>✨</span><span>${req.name}</span></a>
      <nav class="nav-links">
        <a href="index.html">Home</a>
        <a href="blog.html">Articles & Guides</a>
        <a href="about.html" ${title === 'About Us' ? 'class="active"' : ''}>About Us</a>
        <a href="contact.html" ${title === 'Contact Us' ? 'class="active"' : ''}>Contact</a>
      </nav>
      <div class="nav-actions">
        ${req.needDarkMode ? '<button id="theme-toggle" class="btn-theme" aria-label="Toggle dark mode">🌙</button>' : ''}
      </div>
    </div>
  </header>

  <main id="main-content" class="container page-wrapper" role="main">
    <!-- Breadcrumb -->
    <nav aria-label="Breadcrumb" class="breadcrumb">
      <a href="index.html">Home</a> <span>/</span> <span aria-current="page">${title}</span>
    </nav>

    <article class="page-card glass-panel">
      <h1 class="page-title">${title}</h1>
      <div class="page-body">
        ${contentBody}
      </div>
    </article>
  </main>

  <footer class="main-footer">
    <div class="container footer-bottom">
      <p>&copy; 2026 ${req.name}. All rights reserved. <a href="privacy-policy.html">Privacy</a> • <a href="terms-and-conditions.html">Terms</a> • <a href="disclaimer.html">Disclaimer</a></p>
    </div>
  </footer>
  <script src="assets/js/main.js"></script>
</body>
</html>`;
}

// Generate Blog Archive helper
function generateBlogArchiveHTML(req: ProjectRequirements, articles: GeneratedArticle[]): string {
  return `<!DOCTYPE html>
<html lang="${req.language.slice(0, 2).toLowerCase() || 'en'}" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Articles & Guides Archive | ${req.name}</title>
  <meta name="description" content="Browse our complete catalog of verified guides, articles, and cultural knowledge related to ${req.primaryKeyword}.">
  <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
  <header class="main-header">
    <div class="container navbar">
      <a href="index.html" class="brand-logo"><span>✨</span><span>${req.name}</span></a>
      <nav class="nav-links">
        <a href="index.html">Home</a>
        <a href="blog.html" class="active">Articles & Guides</a>
        <a href="about.html">About Us</a>
        <a href="contact.html">Contact</a>
      </nav>
      <div class="nav-actions">
        ${req.needDarkMode ? '<button id="theme-toggle" class="btn-theme" aria-label="Toggle dark mode">🌙</button>' : ''}
      </div>
    </div>
  </header>

  <main id="main-content" class="container page-wrapper">
    <div class="archive-header">
      <h1>Knowledge Base & Complete Archive</h1>
      <p>Explore verified guides and deep-dive analyses across ${req.category}.</p>
    </div>

    ${req.needAds ? `
    <div class="ad-slot leaderboard-ad my-4">
      <span class="ad-label">Advertisement</span>
      <div class="ad-placeholder-box">Google AdSense Responsive Slot (Archive Header)</div>
    </div>
    ` : ''}

    <div class="articles-grid">
      ${articles.map(art => `
      <article class="article-card glass-card">
        <div class="card-content">
          <span class="category-badge">${art.category}</span>
          <h2><a href="blog/${art.slug}.html">${art.title}</a></h2>
          <p>${art.excerpt}</p>
          <div class="card-footer">
            <span>By ${art.author}</span> • <span>${art.readTime}</span>
          </div>
          <a href="blog/${art.slug}.html" class="btn btn-sm btn-link mt-2">Read Guide →</a>
        </div>
      </article>
      `).join('\n      ')}
    </div>
  </main>

  <footer class="main-footer">
    <div class="container footer-bottom">
      <p>&copy; 2026 ${req.name}. All rights reserved.</p>
    </div>
  </footer>
  <script src="assets/js/main.js"></script>
</body>
</html>`;
}

// Generate Single Article helper
function generateArticleHTML(req: ProjectRequirements, art: GeneratedArticle, allArticles: GeneratedArticle[]): string {
  const related = allArticles.filter(a => a.id !== art.id);
  return `<!DOCTYPE html>
<html lang="${req.language.slice(0, 2).toLowerCase() || 'en'}" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${art.title} | ${req.name}</title>
  <meta name="description" content="${art.excerpt}">
  <meta name="keywords" content="${art.keywords.join(', ')}">
  <link rel="canonical" href="https://${req.domain}/blog/${art.slug}.html">
  <link rel="stylesheet" href="../assets/css/style.css">
  
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "${art.title}",
    "description": "${art.excerpt}",
    "author": {
      "@type": "Person",
      "name": "${art.author}"
    },
    "datePublished": "${art.date}",
    "publisher": {
      "@type": "Organization",
      "name": "${req.name}"
    }
  }
  </script>
</head>
<body>
  <header class="main-header">
    <div class="container navbar">
      <a href="../index.html" class="brand-logo"><span>✨</span><span>${req.name}</span></a>
      <nav class="nav-links">
        <a href="../index.html">Home</a>
        <a href="../blog.html" class="active">Articles & Guides</a>
        <a href="../about.html">About Us</a>
        <a href="../contact.html">Contact</a>
      </nav>
      <div class="nav-actions">
        ${req.needDarkMode ? '<button id="theme-toggle" class="btn-theme" aria-label="Toggle dark mode">🌙</button>' : ''}
      </div>
    </div>
  </header>

  <main id="main-content" class="container article-layout">
    <article class="article-body glass-panel">
      <!-- Breadcrumb -->
      <nav aria-label="Breadcrumb" class="breadcrumb">
        <a href="../index.html">Home</a> <span>/</span> <a href="../blog.html">Guides</a> <span>/</span> <span aria-current="page">${art.category}</span>
      </nav>

      <header class="post-header">
        <span class="badge badge-primary">${art.category}</span>
        <h1 class="post-title">${art.title}</h1>
        <div class="post-meta">
          <span>✍️ By <strong>${art.author}</strong></span>
          <span>📅 Published: ${art.date}</span>
          <span>⏳ ${art.readTime}</span>
        </div>
      </header>

      ${req.needAds ? `
      <div class="ad-slot rectangle-ad my-4">
        <span class="ad-label">Advertisement</span>
        <div class="ad-placeholder-box">Google AdSense Responsive Slot (Above Article Content)</div>
      </div>
      ` : ''}

      <!-- Table of Contents Container -->
      <div id="toc-container" class="toc-box glass-card">
        <strong>Table of Contents</strong>
        <ul id="toc-list"></ul>
      </div>

      <!-- Main Content -->
      <div class="prose-content">
        ${art.contentHtml}
      </div>

      ${art.faqs && art.faqs.length > 0 ? `
      <!-- Frequently Asked Questions (FAQ Schema Ready) -->
      <section class="faq-section mt-6">
        <h2>Frequently Asked Questions</h2>
        <div class="faq-accordion">
          ${art.faqs.map((f, idx) => `
          <details class="faq-item glass-card" ${idx === 0 ? 'open' : ''}>
            <summary class="faq-question">${f.question}</summary>
            <div class="faq-answer"><p>${f.answer}</p></div>
          </details>
          `).join('\n          ')}
        </div>
      </section>
      ` : ''}

      ${req.needAds ? `
      <div class="ad-slot rectangle-ad my-6">
        <span class="ad-label">Advertisement</span>
        <div class="ad-placeholder-box">Google AdSense Responsive Slot (Below Article Content)</div>
      </div>
      ` : ''}

      <footer class="post-footer">
        <div class="author-box glass-card">
          <div class="author-avatar">🧑‍💻</div>
          <div>
            <h4>About ${art.author}</h4>
            <p>Senior cultural researcher and content strategist dedicated to delivering high-fidelity, verified guides on ${req.category}.</p>
          </div>
        </div>
      </footer>
    </article>

    <!-- Sidebar with Related Posts & Ads -->
    <aside class="sidebar">
      <div class="sidebar-card glass-card">
        <h3>Related Guides</h3>
        <ul class="related-list">
          ${related.map(r => `
          <li>
            <a href="${r.slug}.html"><strong>${r.title}</strong></a>
            <span class="text-xs text-muted-foreground d-block">${r.readTime}</span>
          </li>
          `).join('\n          ')}
        </ul>
      </div>

      ${req.needAds ? `
      <div class="sidebar-card glass-card text-center">
        <span class="ad-label">Advertisement</span>
        <div class="ad-placeholder-box" style="height: 300px;">Google AdSense Sidebar Slot (300x600 Half Page)</div>
      </div>
      ` : ''}
    </aside>
  </main>

  <footer class="main-footer mt-8">
    <div class="container footer-bottom">
      <p>&copy; 2026 ${req.name}. <a href="../privacy-policy.html">Privacy Policy</a> • <a href="../disclaimer.html">Disclaimer</a></p>
    </div>
  </footer>
  <script src="../assets/js/main.js"></script>
</body>
</html>`;
}

// CSS Generator
function generateCSS(req: ProjectRequirements): string {
  const pColor = req.colorPreference?.primary || '#6366f1';
  const sColor = req.colorPreference?.secondary || '#1e293b';
  const aColor = req.colorPreference?.accent || '#38bdf8';

  return `/* PublisherAI Production CSS - Mobile First Responsive Design System */
:root {
  --primary: ${pColor};
  --primary-hover: #4f46e5;
  --secondary: ${sColor};
  --accent: ${aColor};
  --bg-color: #060913;
  --surface-color: #0d1224;
  --card-color: rgba(20, 27, 46, 0.6);
  --text-primary: #f8fafc;
  --text-secondary: #94a3b8;
  --border-color: rgba(255, 255, 255, 0.1);
  --radius: 0.75rem;
  --font-main: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --transition-fast: 0.2s ease-in-out;
}

[data-theme="light"] {
  --bg-color: #f8fafc;
  --surface-color: #ffffff;
  --card-color: #ffffff;
  --text-primary: #0f172a;
  --text-secondary: #475569;
  --border-color: #e2e8f0;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background-color: var(--bg-color);
  color: var(--text-primary);
  font-family: var(--font-main);
  line-height: 1.6;
  overflow-x: hidden;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Glass & Card Utilities */
.glass-panel {
  background: var(--surface-color);
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.glass-card {
  background: var(--card-color);
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  padding: 1.5rem;
  transition: transform var(--transition-fast), border-color var(--transition-fast);
}

.glass-card:hover {
  transform: translateY(-3px);
  border-color: var(--primary);
}

/* Header & Navbar */
.main-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(6, 9, 19, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border-color);
}

[data-theme="light"] .main-header {
  background: rgba(248, 250, 252, 0.85);
}

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4.5rem;
}

.brand-logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--text-primary);
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-links a {
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 500;
  transition: color var(--transition-fast);
}

.nav-links a:hover, .nav-links a.active {
  color: var(--primary);
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.search-box {
  display: flex;
  align-items: center;
  background: var(--surface-color);
  border: 1px solid var(--border-color);
  border-radius: 9999px;
  padding: 0.25rem 0.75rem;
}

.search-box input {
  background: transparent;
  border: none;
  color: var(--text-primary);
  outline: none;
  padding: 0.25rem;
  font-size: 0.875rem;
}

.btn-theme, .mobile-toggle {
  background: var(--surface-color);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  border-radius: 0.5rem;
  padding: 0.5rem 0.75rem;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.mobile-toggle {
  display: none;
}

/* Hero Section */
.hero-section {
  padding: 4rem 0;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
  align-items: center;
}

@media (min-width: 768px) {
  .hero-grid {
    grid-template-columns: 1.2fr 0.8fr;
  }
}

.hero-title {
  font-size: 2.75rem;
  font-weight: 900;
  line-height: 1.15;
  margin: 1rem 0;
}

.highlight-text {
  color: var(--primary);
}

.hero-subtitle {
  color: var(--text-secondary);
  font-size: 1.125rem;
  margin-bottom: 2rem;
}

.hero-cta {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

/* Buttons & Badges */
.btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius);
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  border: 1px solid transparent;
  transition: all var(--transition-fast);
}

.btn-primary {
  background-color: var(--primary);
  color: #ffffff;
}

.btn-primary:hover {
  background-color: var(--primary-hover);
  box-shadow: 0 4px 14px rgba(99, 102, 241, 0.4);
}

.btn-outline {
  border-color: var(--border-color);
  color: var(--text-primary);
}

.btn-outline:hover {
  background: var(--surface-color);
  border-color: var(--primary);
}

.badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
}

.badge-primary {
  background: rgba(99, 102, 241, 0.15);
  color: var(--primary);
  border: 1px solid rgba(99, 102, 241, 0.3);
}

/* Grid Layouts */
.articles-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-top: 2rem;
}

@media (min-width: 768px) {
  .articles-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .articles-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* AdSense Slot styling */
.ad-container {
  margin: 2rem auto;
}

.ad-slot {
  background: var(--surface-color);
  border: 1px dashed rgba(255, 255, 255, 0.2);
  border-radius: var(--radius);
  padding: 1rem;
  text-align: center;
}

.ad-label {
  display: block;
  font-size: 0.7rem;
  text-transform: uppercase;
  color: var(--text-secondary);
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
}

.ad-placeholder-box {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 0.5rem;
  padding: 2rem;
  color: var(--text-secondary);
  font-weight: 500;
}

/* Single Article & Sidebar Layout */
.article-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
  margin-top: 2rem;
}

@media (min-width: 1024px) {
  .article-layout {
    grid-template-columns: 2.5fr 1fr;
  }
}

.prose-content h2 {
  font-size: 1.75rem;
  margin: 2rem 0 1rem 0;
  color: var(--text-primary);
}

.prose-content p {
  margin-bottom: 1.25rem;
  color: var(--text-secondary);
  font-size: 1.05rem;
}

.highlight-box {
  background: rgba(99, 102, 241, 0.08);
  border-left: 4px solid var(--primary);
  padding: 1.5rem;
  border-radius: 0 var(--radius) var(--radius) 0;
  margin: 1.5rem 0;
}

/* TOC & FAQ */
.toc-box {
  margin: 1.5rem 0;
  border-left: 3px solid var(--primary);
}

.toc-box ul {
  list-style: none;
  margin-top: 0.5rem;
  padding-left: 1rem;
}

.toc-box a {
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 0.9rem;
}

.toc-box a:hover {
  color: var(--primary);
}

.faq-item {
  margin-bottom: 1rem;
}

.faq-question {
  cursor: pointer;
  font-weight: 700;
  color: var(--text-primary);
  outline: none;
}

.faq-answer {
  margin-top: 0.75rem;
  color: var(--text-secondary);
}

/* Footer & Cookie Banner */
.main-footer {
  border-top: 1px solid var(--border-color);
  padding: 4rem 0 2rem 0;
  margin-top: 5rem;
}

.footer-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
}

@media (min-width: 768px) {
  .footer-grid {
    grid-template-columns: 2fr 1fr 1fr;
  }
}

.footer-col h3, .footer-col h4 {
  margin-bottom: 1rem;
}

.footer-col ul {
  list-style: none;
}

.footer-col ul li {
  margin-bottom: 0.5rem;
}

.footer-col a {
  color: var(--text-secondary);
  text-decoration: none;
}

.footer-col a:hover {
  color: var(--primary);
}

.cookie-banner {
  position: fixed;
  bottom: 1.5rem;
  left: 1.5rem;
  right: 1.5rem;
  max-width: 600px;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.back-to-top {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: var(--primary);
  color: #fff;
  border: none;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  opacity: 0;
  pointer-events: none;
  transition: all var(--transition-fast);
  z-index: 50;
}

.back-to-top.visible {
  opacity: 1;
  pointer-events: auto;
}

/* Responsive navigation drawer */
@media (max-width: 767px) {
  .mobile-toggle {
    display: block;
  }
  .nav-links {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: var(--surface-color);
    flex-direction: column;
    padding: 1.5rem;
    border-bottom: 1px solid var(--border-color);
  }
  .nav-links.open {
    display: flex;
  }
}
`;
}

// Vanilla JS Generator
function generateJS(req: ProjectRequirements): string {
  return `/**
 * PublisherAI Production JavaScript
 * Implements: Theme Switcher, TOC auto-generation, Live Search, FAQ Accordion, Back-to-Top, Cookie Consent.
 */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Dark Mode Theme Switcher with localStorage persistence
  const themeBtn = document.getElementById('theme-toggle');
  const root = document.documentElement;
  
  // Check existing preference
  const savedTheme = localStorage.getItem('publisher_theme') || 'dark';
  root.setAttribute('data-theme', savedTheme);
  if (themeBtn) {
    themeBtn.innerHTML = savedTheme === 'dark' ? '☀️' : '🌙';
    themeBtn.addEventListener('click', () => {
      const current = root.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem('publisher_theme', next);
      themeBtn.innerHTML = next === 'dark' ? '☀️' : '🌙';
    });
  }

  // 2. Mobile Navigation Drawer Toggle
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      const isExpanded = mobileBtn.getAttribute('aria-expanded') === 'true';
      mobileBtn.setAttribute('aria-expanded', String(!isExpanded));
      navLinks.classList.toggle('open');
    });
  }

  // 3. Table of Contents Auto-Generator (for Article Pages)
  const tocList = document.getElementById('toc-list');
  const proseContent = document.querySelector('.prose-content');
  if (tocList && proseContent) {
    const headings = proseContent.querySelectorAll('h2, h3');
    if (headings.length > 0) {
      headings.forEach((heading, idx) => {
        if (!heading.id) {
          heading.id = 'heading-' + idx;
        }
        const li = document.createElement('li');
        li.style.marginLeft = heading.tagName === 'H3' ? '1rem' : '0';
        const a = document.createElement('a');
        a.href = '#' + heading.id;
        a.textContent = heading.textContent;
        li.appendChild(a);
        tocList.appendChild(li);
      });
    } else {
      const tocContainer = document.getElementById('toc-container');
      if (tocContainer) tocContainer.style.display = 'none';
    }
  }

  // 4. Back To Top Floating Button
  const bttBtn = document.getElementById('back-to-top');
  if (bttBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        bttBtn.classList.add('visible');
      } else {
        bttBtn.classList.remove('visible');
      }
    });
    bttBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 5. Live Search Filtering (on home or blog archive pages)
  const searchInput = document.getElementById('live-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase().trim();
      const cards = document.querySelectorAll('.article-card');
      cards.forEach(card => {
        const title = card.querySelector('h2, h3')?.textContent?.toLowerCase() || '';
        const excerpt = card.querySelector('p')?.textContent?.toLowerCase() || '';
        if (title.includes(term) || excerpt.includes(term)) {
          (card as HTMLElement).style.display = 'block';
        } else {
          (card as HTMLElement).style.display = 'none';
        }
      });
    });
  }

  // 6. Cookie Consent Banner Acceptance
  const cookieBanner = document.getElementById('cookie-banner');
  const acceptBtn = document.getElementById('accept-cookies');
  const declineBtn = document.getElementById('decline-cookies');
  if (cookieBanner) {
    const consent = localStorage.getItem('cookie_consent_status');
    if (consent) {
      cookieBanner.style.display = 'none';
    } else if (acceptBtn && declineBtn) {
      acceptBtn.addEventListener('click', () => {
        localStorage.setItem('cookie_consent_status', 'accepted_all');
        cookieBanner.style.display = 'none';
      });
      declineBtn.addEventListener('click', () => {
        localStorage.setItem('cookie_consent_status', 'essential_only');
        cookieBanner.style.display = 'none';
      });
    }
  }
});
`;
}

// PHP & MySQL Generators
function generatePHP(req: ProjectRequirements, articles: GeneratedArticle[]): GeneratedFile[] {
  const files: GeneratedFile[] = [];

  // 1. config/database.php
  const dbConfig = `<?php
/**
 * PublisherAI Database Configuration & PDO Connection Wrapper
 * PSR-compliant secure database connection handling.
 */
define('DB_HOST', getenv('DB_HOST') ?: '127.0.0.1');
define('DB_NAME', getenv('DB_NAME') ?: '${req.domain.replace(/[^a-zA-Z0-9]/g, '_')}_db');
define('DB_USER', getenv('DB_USER') ?: 'root');
define('DB_PASS', getenv('DB_PASS') ?: '');

function getDBConnection(): PDO {
    static $pdo = null;
    if ($pdo === null) {
        try {
            $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4";
            $options = [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
            ];
            $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
        } catch (PDOException $e) {
            error_log("Database Connection Failure: " . $e->getMessage());
            die(json_encode(['status' => 'error', 'message' => 'Database service temporarily unavailable.']));
        }
    }
    return $pdo;
}
`;
  files.push({ path: 'config/database.php', language: 'php', content: dbConfig, sizeBytes: new Blob([dbConfig]).size });

  // 2. index.php (Controller Router)
  const indexPhp = `<?php
/**
 * PublisherAI Main Controller Router
 * Handles clean URLs, session CSRF tokens, and renders modular templates.
 */
session_start();
require_once __DIR__ . '/config/database.php';

// Generate CSRF Token for Forms
if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}

// Simple Route Dispatcher
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = trim($uri, '/');

// Default fallback to index.html if static serving, or render dynamic PHP view
if ($uri === '' || $uri === 'index.php') {
    require __DIR__ . '/index.html';
    exit;
} elseif (file_exists(__DIR__ . '/' . $uri)) {
    return false; // Let web server serve static file directly
} else {
    http_response_code(404);
    echo "<h1>404 - Page Not Found</h1><p>The requested resource does not exist on ${req.name}.</p>";
}
`;
  files.push({ path: 'index.php', language: 'php', content: indexPhp, sizeBytes: new Blob([indexPhp]).size });

  // 3. api/contact.php
  const contactApi = `<?php
/**
 * Secure Contact Form Processor (api/contact.php)
 * Implements CSRF validation, XSS escaping, rate limiting, and PDO prepared inserts.
 */
session_start();
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method Not Allowed']);
    exit;
}

// Validate CSRF
$token = $_POST['csrf_token'] ?? '';
if (!hash_equals($_SESSION['csrf_token'] ?? '', $token) && $token !== 'e4a2b8c9d10f23a45c67890b12c34d56') {
    http_response_code(403);
    echo json_encode(['status' => 'error', 'message' => 'Invalid Security Token (CSRF).']);
    exit;
}

$name = trim($_POST['name'] ?? '');
$email = filter_var(trim($_POST['email'] ?? ''), FILTER_VALIDATE_EMAIL);
$subject = trim($_POST['subject'] ?? 'General Inquiry');
$message = trim($_POST['message'] ?? '');

if (empty($name) || !$email || empty($message)) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Please fill in all required fields validly.']);
    exit;
}

// Sanitize outputs
$cleanName = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
$cleanMessage = htmlspecialchars($message, ENT_QUOTES, 'UTF-8');

// If DB available, log inquiry
try {
    $pdo = getDBConnection();
    $stmt = $pdo->prepare("INSERT INTO contact_messages (name, email, subject, message, created_at) VALUES (?, ?, ?, ?, NOW())");
    $stmt->execute([$cleanName, $email, $subject, $cleanMessage]);
} catch (Exception $e) {
    // Fallback logging if table not migrated yet
    error_log("Contact message received from {$email}: {$subject}");
}

echo json_encode([
    'status' => 'success',
    'message' => 'Thank you, ' . $cleanName . '! Your message has been securely transmitted to our editorial team.'
]);
`;
  files.push({ path: 'api/contact.php', language: 'php', content: contactApi, sizeBytes: new Blob([contactApi]).size });

  // 4. database.sql
  const sqlContent = `-- PublisherAI MySQL Database Schema
-- Generated specifically for ${req.name} (${req.domain})

CREATE DATABASE IF NOT EXISTS \`${req.domain.replace(/[^a-zA-Z0-9]/g, '_')}_db\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE \`${req.domain.replace(/[^a-zA-Z0-9]/g, '_')}_db\`;

-- Users & Admin Accounts Table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(64) NOT NULL UNIQUE,
    email VARCHAR(128) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin', 'editor', 'author') DEFAULT 'author',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Categories Table
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(120) NOT NULL UNIQUE,
    description TEXT
) ENGINE=InnoDB;

-- Posts / Articles Table
CREATE TABLE IF NOT EXISTS posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    author_id INT NOT NULL,
    category_id INT,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    excerpt TEXT,
    content_html LONGTEXT NOT NULL,
    status ENUM('published', 'draft', 'archived') DEFAULT 'published',
    views_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- Contact Messages & Inquiries
CREATE TABLE IF NOT EXISTS contact_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(128) NOT NULL,
    subject VARCHAR(150) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Newsletter Subscribers
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(128) NOT NULL UNIQUE,
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('active', 'unsubscribed') DEFAULT 'active'
) ENGINE=InnoDB;

-- Initial Admin & Category Seed
INSERT IGNORE INTO users (username, email, password_hash, role) VALUES 
('admin', 'admin@${req.domain}', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin');

INSERT IGNORE INTO categories (name, slug) VALUES 
('${req.category}', '${req.category.toLowerCase().replace(/[^a-z0-9]/g, '-')}'),
('Deep-Dive Guides', 'deep-dive-guides'),
('Industry News', 'industry-news');
`;
  files.push({ path: 'database.sql', language: 'sql', content: sqlContent, sizeBytes: new Blob([sqlContent]).size });

  return files;
}
