// Bilingual portfolio data
const DATA = {
  name: "Dang Duong",
  handle: "dang_duong",
  role: { en: "Security Engineer", vi: "Kỹ sư An ninh mạng" },
  location: "Ho Chi Minh City, Vietnam",
  email: "haidang28072000@gmail.com",
  phone: "+84 965 745 029",
  linkedin: "linkedin.com/in/dang-duong-84ba74258",

  tagline: {
    en: ["building", "secure", "scalable", "automated", "systems"],
    vi: ["xây dựng", "bảo mật", "mở rộng", "tự động hóa", "hệ thống"],
  },

  summary: {
    en: `Security Engineer with end-to-end experience across infrastructure operations, SOC monitoring, and enterprise security engineering — specializing in cloud security and AI-driven automation. I design scalable security systems, eliminate manual workload through automation, and partner with cybersecurity, pentest, and GRC teams to make organizations more resilient and audit-ready.`,
    vi: `Kỹ sư an ninh mạng với kinh nghiệm toàn diện từ vận hành hạ tầng, giám sát SOC, đến kỹ thuật an ninh doanh nghiệp — chuyên về bảo mật cloud và tự động hoá bằng AI. Tôi thiết kế các hệ thống bảo mật có khả năng mở rộng, loại bỏ công việc thủ công thông qua tự động hoá, và phối hợp với các đội cybersecurity, pentest và GRC để tăng độ vững chãi và sẵn sàng audit.`,
  },

  stats: [
    { num: "5+", lab: { en: "Years experience", vi: "Năm kinh nghiệm" } },
    { num: "8", lab: { en: "Certifications", vi: "Chứng chỉ" } },
    { num: "3×", lab: { en: "CTF #1 (HUTECH)", vi: "Hạng 1 CTF (HUTECH)" } },
    { num: "Top 6", lab: { en: "D4RKC0DE India", vi: "D4RKC0DE Ấn Độ" } },
  ],

  experience: [
    {
      when: "Mar 2023 — Present",
      now: true,
      title: "Information Security Engineer",
      company: "Trusting Social",
      loc: "Ho Chi Minh City",
      bullets: {
        en: [
          "Led design & implementation of enterprise security controls across endpoint protection, DLP, vulnerability management, WAF, and cloud security.",
          "Conducted penetration testing & vulnerability assessments for OS, web apps, and APIs — combining automated scanning with manual validation.",
          "Architected and managed WAF systems with automated DoS/DDoS protection and common-attack pattern coverage.",
          "Owned and secured GCP infrastructure: GKE, Cloud Run, VMs, firewall policies, and storage systems.",
          "Administered enterprise DLP across macOS and Windows.",
          "Built AI-powered automation that eliminated repetitive manual tasks — significantly improving operational efficiency.",
          "Developed LLM-based threat intelligence solutions for automated threat modeling and attack-tree generation.",
          "Evaluated and deployed new security technologies aligned with best practices.",
        ],
        vi: [
          "Dẫn dắt thiết kế & triển khai hệ thống bảo mật doanh nghiệp: endpoint protection, DLP, vulnerability management, WAF, cloud security.",
          "Thực hiện pentest & đánh giá lỗ hổng cho OS, web apps và APIs — kết hợp quét tự động với kiểm tra thủ công.",
          "Thiết kế và vận hành hệ thống WAF với khả năng bảo vệ tự động chống DoS/DDoS và các mẫu tấn công phổ biến.",
          "Sở hữu và bảo mật hạ tầng GCP: GKE, Cloud Run, VMs, firewall, storage.",
          "Quản trị giải pháp DLP doanh nghiệp trên macOS và Windows.",
          "Xây dựng các automation dựa trên AI giúp loại bỏ công việc thủ công lặp lại.",
          "Phát triển hệ thống threat intelligence dùng LLM để mô hình hoá mối đe doạ và tạo attack tree tự động.",
          "Đánh giá và triển khai các công nghệ bảo mật mới theo best practices.",
        ],
      },
      tags: ["GCP", "GKE", "WAF", "DLP", "LLM", "Pentest"],
    },
    {
      when: "Feb 2022 — Mar 2023",
      title: "SOC Engineer",
      company: "MoMo (M_Service)",
      loc: "Ho Chi Minh City",
      bullets: {
        en: [
          "Monitored and responded to security alerts from SIEM systems.",
          "Investigated incidents and produced detailed security reports.",
          "Supported deployment of security tools (McAfee, ManageEngine).",
          "Maintained monitoring stack: Splunk, Nagios, NetFlow, Checkmk.",
        ],
        vi: [
          "Giám sát và phản ứng cảnh báo bảo mật từ các hệ thống SIEM.",
          "Điều tra sự cố và viết báo cáo chi tiết.",
          "Hỗ trợ triển khai công cụ bảo mật (McAfee, ManageEngine).",
          "Vận hành hệ thống monitoring: Splunk, Nagios, NetFlow, Checkmk.",
        ],
      },
      tags: ["SIEM", "Splunk", "Incident Response"],
    },
    {
      when: "Mar 2021 — Feb 2022",
      title: "System Administrator",
      company: "Vietnam IT Solution",
      loc: "Ho Chi Minh City",
      bullets: {
        en: [
          "Managed servers, Active Directory, virtualization, and backup systems.",
          "Designed and maintained network infrastructure (VPN, WAN/LAN, firewalls).",
          "Deployed monitoring (Grafana, Prometheus, PRTG).",
          "Led infrastructure setup for new offices.",
        ],
        vi: [
          "Quản lý server, Active Directory, ảo hoá và hệ thống backup.",
          "Thiết kế và vận hành hạ tầng mạng (VPN, WAN/LAN, firewall).",
          "Triển khai monitoring (Grafana, Prometheus, PRTG).",
          "Dẫn dắt thiết lập hạ tầng cho văn phòng mới.",
        ],
      },
      tags: ["Linux", "AD", "Networking"],
    },
  ],

  skills: [
    {
      cat: "Cloud & Infrastructure",
      items: [
        ["GCP", 5], ["GKE", 5], ["Compute Engine", 5],
        ["Cloud Run", 4], ["Cloud Storage", 4],
      ],
    },
    {
      cat: "Security",
      items: [
        ["WAF", 5], ["DLP", 5], ["Vulnerability Mgmt", 5],
        ["SIEM", 4], ["OWASP", 5], ["API Security", 4],
      ],
    },
    {
      cat: "Systems & Networking",
      items: [
        ["Linux", 5], ["Windows Server", 4], ["VPN", 4], ["WAN/LAN", 4],
      ],
    },
    {
      cat: "Automation & AI",
      items: [
        ["Python", 5], ["MCP", 4], ["n8n", 4], ["LLM Workflows", 5], ["Audit Automation", 4],
      ],
    },
  ],

  certs: [
    { name: "Pro Cloud Security Engineer", body: "Google Cloud", yr: "2026" },
    { name: "ICIP", body: "Cloud Security", yr: "2024" },
    { name: "OWASP API Security Top 10", body: "OWASP", yr: "2024" },
    { name: "Kubernetes", body: "CNCF", yr: "2023" },
    { name: "AZ-104", body: "Microsoft Azure", yr: "2022" },
    { name: "LPIC 1 & 2", body: "Linux Pro Institute", yr: "2022" },
    { name: "CEH", body: "EC-Council", yr: "2021" },
    { name: "CCNA", body: "Cisco", yr: "2020" },
  ],

  education: [
    {
      deg: { en: "B.S. Information Security", vi: "Cử nhân An toàn Thông tin" },
      sch: "Ho Chi Minh University of Technology (HUTECH)",
      meta: { en: "GPA 3.4 / 4.0 · 2018 — 2022", vi: "GPA 3.4 / 4.0 · 2018 — 2022" },
    },
    {
      deg: { en: "Mathematics, Gifted Program", vi: "Chuyên Toán" },
      sch: "Ben Tre High School for Gifted Students",
      meta: { en: "2015 — 2018", vi: "2015 — 2018" },
    },
  ],

  achievements: [
    { rank: "Consolation Prize", name: "ASEAN Student Contest on InfoSec", desc: { en: "2019 & 2020", vi: "2019 & 2020" } },
    { rank: "Rank #1 — 3 years", name: "HUTECH CTF", desc: { en: "Three consecutive championship years", vi: "Vô địch ba năm liên tiếp" } },
    { rank: "Top 6 India · Top 80 World", name: "D4RKC0DE", desc: { en: "International CTF", vi: "CTF quốc tế" } },
    { rank: "Top 27 India", name: "Spoilers (Captain)", desc: { en: "CTF team captain", vi: "Đội trưởng CTF" } },
    { rank: "Top 1 HUTECH", name: "BWarriors (Captain)", desc: { en: "University CTF champions", vi: "Đội trưởng — vô địch trường" } },
    { rank: "Featured", name: "IT Got Talent — HUTECH", desc: { en: "2021 university competition", vi: "Cuộc thi sinh viên HUTECH 2021" } },
  ],

  projects: [
    { name: "MCP Security Automation", body: { en: "MCP-based workflows automating daily security operations.", vi: "Workflow dựa trên MCP tự động hoá vận hành bảo mật hằng ngày." } },
    { name: "GCP VM Inventory Service", body: { en: "Cloud Run service tracking GCP VM inventory across projects.", vi: "Dịch vụ trên Cloud Run theo dõi VM inventory trên GCP." } },
    { name: "LLM Threat Intelligence", body: { en: "LLM-based system generating threat models & attack trees.", vi: "Hệ thống LLM tạo threat model & attack tree tự động." } },
  ],
};

window.DATA = DATA;
