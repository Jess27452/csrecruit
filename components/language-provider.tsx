"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Language = "en" | "zh";

const translations = {
  en: {
    home: "Home", resources: "Resources", categories: "Categories", search: "Search",
    addResource: "Add Resource", submitResource: "Submit a resource", madeForCommunity: "Made for the CS community.",
    brandDescription: "Community-curated resources for CS recruiting.", builtByStudents: "Built by students, for students",
    heroBefore: "Everything you need for", heroAccent: "CS recruiting.",
    heroDescription: "Discover and share the best resources for coding interviews, OAs, projects, resumes, and internships.",
    browseResources: "Browse Resources", searchResources: "Search resources", searchPlaceholder: "Search LeetCode, resume templates, internship lists…",
    curatedResources: "curated resources", focusedCategories: "focused categories", freeToBrowse: "free to browse",
    browseByTopic: "Browse by topic", startWhere: "Start where you need help.",
    browseDescription: "Skip the endless bookmarks. Find practical, community-reviewed resources organized around your next recruiting step.",
    insideEach: "Inside each category", seeWhat: "See what you’ll find.",
    insideDescription: "Jump straight to a useful resource, or open a category to explore the full collection.",
    browse: "Browse", topThisWeek: "Top this week", recommended: "Resources students keep recommending.", viewAll: "View all resources",
    knowUseful: "Know something useful?", helpNext: "Help the next student find it faster.",
    shareDescription: "Share a resource that made recruiting clearer. Every submission is reviewed before it appears publicly.",
    communityLibrary: "Community library", resourceLibraryDescription: "Find practical guides, lists, templates, and repositories recommended by students.",
    allCategories: "All categories", allSubcategories: "All subcategories", allTags: "All tags", mostUpvoted: "Most Upvoted", newest: "Newest", popular: "Popular",
    communityReviewed: "Community reviewed", noResults: "No resources match those filters. Try a broader search.",
    resource: "resource", resourcesCount: "resources", resourceCategory: "Resource category", allResources: "All resources",
    categoryCurated: "resources curated by the CSRecruit community.", all: "All", viewResource: "View Resource", addedBy: "Added by",
    backToResources: "Back to resources", communityContribution: "Community contribution", shareResource: "Share a resource that helped.",
    submitIntro: "Keep it focused and useful. We validate links, prevent duplicate URLs, and review every submission before it becomes public.",
    resourceName: "Resource Name", category: "Category", subcategory: "Subcategory", chooseCategory: "Choose a category", chooseSubcategory: "Choose a subcategory",
    descriptionLabel: "One-sentence Description", descriptionPlaceholder: "What is this resource and why is it useful?", tags: "Tags",
    tagsPlaceholder: "Algorithms, LeetCode, Chinese (comma-separated)", optionalNotes: "Optional Notes", notesPlaceholder: "Anything reviewers should know?",
    noAccountRequired: "No account required", pendingNote: "Your submission will stay pending until an administrator approves it. Notes are visible only to reviewers.",
    submitting: "Submitting…", submittedThanks: "Thanks! Your resource was submitted for review.", submittedDetail: "No account was needed. An administrator will review it before it appears publicly.", addAnother: "Add Another",
  },
  zh: {
    home: "首页", resources: "资源", categories: "分类", search: "搜索",
    addResource: "添加资源", submitResource: "提交资源", madeForCommunity: "为计算机学生社区而建。",
    brandDescription: "由社区共同整理的计算机求职资源。", builtByStudents: "由学生创建，为学生服务",
    heroBefore: "计算机求职所需资源", heroAccent: "一站汇集。",
    heroDescription: "发现并分享编程面试、在线笔试、项目、简历和实习方面的优质资源。",
    browseResources: "浏览资源", searchResources: "搜索资源", searchPlaceholder: "搜索 LeetCode、简历模板、实习列表……",
    curatedResources: "个精选资源", focusedCategories: "个核心分类", freeToBrowse: "免费浏览",
    browseByTopic: "按主题浏览", startWhere: "从你需要帮助的地方开始。",
    browseDescription: "不再翻找无尽书签。按照求职阶段，快速找到实用且经过社区推荐的资源。",
    insideEach: "分类内容", seeWhat: "看看每个分类里有什么。",
    insideDescription: "直接打开实用资源，或进入分类浏览完整合集。",
    browse: "浏览", topThisWeek: "本周热门", recommended: "学生们持续推荐的资源。", viewAll: "查看全部资源",
    knowUseful: "有好资源想分享？", helpNext: "帮助下一位同学更快找到它。",
    shareDescription: "分享让求职更清晰的资源。每项提交都会经过审核后公开。",
    communityLibrary: "社区资源库", resourceLibraryDescription: "查找学生推荐的实用指南、清单、模板和代码仓库。",
    allCategories: "全部分类", allSubcategories: "全部子分类", allTags: "全部标签", mostUpvoted: "点赞最多", newest: "最新", popular: "热门",
    communityReviewed: "社区审核", noResults: "没有符合筛选条件的资源，请尝试扩大搜索范围。",
    resource: "个资源", resourcesCount: "个资源", resourceCategory: "资源分类", allResources: "全部资源",
    categoryCurated: "由 CSRecruit 社区精选的资源。", all: "全部", viewResource: "查看资源", addedBy: "添加者",
    backToResources: "返回资源库", communityContribution: "社区贡献", shareResource: "分享帮助过你的资源。",
    submitIntro: "请保持内容清晰实用。我们会验证链接、防止重复网址，并在公开前审核每项提交。",
    resourceName: "资源名称", category: "分类", subcategory: "子分类", chooseCategory: "选择分类", chooseSubcategory: "选择子分类",
    descriptionLabel: "一句话介绍", descriptionPlaceholder: "这个资源是什么，为什么有用？", tags: "标签",
    tagsPlaceholder: "算法、LeetCode、中文（用逗号分隔）", optionalNotes: "补充说明（选填）", notesPlaceholder: "有什么需要审核者了解的信息？",
    noAccountRequired: "无需账号", pendingNote: "提交内容会保持待审核状态，管理员批准后才会公开。补充说明仅审核者可见。",
    submitting: "正在提交……", submittedThanks: "谢谢！你的资源已提交审核。", submittedDetail: "无需创建账号。管理员审核通过后，资源将公开显示。", addAnother: "继续添加",
  },
} as const;

export type TranslationKey = keyof typeof translations.en;

const categoryTranslations: Record<string, { name: string; description: string }> = {
  Coding: { name: "编程", description: "LeetCode、算法和系统设计资源。" },
  Recruiting: { name: "招聘准备", description: "在线笔试、面试和公司招聘经验。" },
  Projects: { name: "项目", description: "帮助你用作品证明能力的创意、教程和案例。" },
  Resume: { name: "简历", description: "帮助打造更强申请材料的模板、指南和示例。" },
  Opportunities: { name: "求职机会", description: "实习清单、应届岗位和招聘网站。" },
};

const subcategoryTranslations: Record<string, string> = {
  LeetCode: "LeetCode 刷题", "Algorithm Roadmaps": "算法路线图", "System Design": "系统设计",
  "OA Questions": "在线笔试题", "Technical Interview Questions": "技术面试题", "Behavioral Interview Questions": "行为面试题",
  "Company Interview Experiences": "公司面经", "GitHub Interview Repositories": "GitHub 面试资源库",
  "Software Engineering": "软件工程", "Machine Learning": "机器学习", "Product Management": "产品管理",
  "US Resume Templates": "美国简历模板", "China Resume Templates": "中国简历模板", "Resume Guides": "简历指南", "Example Resumes": "简历示例",
  "Internship Lists": "实习清单", "New Grad Lists": "应届岗位清单", "Job Boards": "招聘网站", "GitHub Internship Repositories": "GitHub 实习资源库",
};

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey) => string;
  categoryName: (name: string) => string;
  categoryDescription: (name: string, fallback: string) => string;
  subcategoryName: (name: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const saved = window.localStorage.getItem("csrecruit-language");
    if (saved === "zh") {
      // Restore the browser-only preference after hydration.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLanguageState("zh");
      document.documentElement.lang = "zh-CN";
    }
  }, []);

  function setLanguage(next: Language) {
    setLanguageState(next);
    window.localStorage.setItem("csrecruit-language", next);
    document.documentElement.lang = next === "zh" ? "zh-CN" : "en";
  }

  return <LanguageContext.Provider value={{
    language,
    setLanguage,
    t: (key) => translations[language][key],
    categoryName: (name) => language === "zh" ? categoryTranslations[name]?.name ?? name : name,
    categoryDescription: (name, fallback) => language === "zh" ? categoryTranslations[name]?.description ?? fallback : fallback,
    subcategoryName: (name) => language === "zh" ? subcategoryTranslations[name] ?? name : name,
  }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}
