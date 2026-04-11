const PROJECTS = [
  {
    projectId: "PJ-001",
    projectName: "Java基幹システム改修",
    location: "東京",
    maxUnitPrice: 65,
    nationalityAllowed: "可"
  },
  {
    projectId: "PJ-002",
    projectName: "Web受注管理システム開発",
    location: "神奈川",
    maxUnitPrice: 70,
    nationalityAllowed: "不可"
  },
  {
    projectId: "PJ-003",
    projectName: "保険業務システム刷新",
    location: "千葉",
    maxUnitPrice: 68,
    nationalityAllowed: "要確認"
  },
  {
    projectId: "PJ-004",
    projectName: "製造業向け生産管理システム",
    location: "埼玉",
    maxUnitPrice: 72,
    nationalityAllowed: "可"
  },
  {
    projectId: "PJ-005",
    projectName: "公共系ポータル開発",
    location: "東京",
    maxUnitPrice: 60,
    nationalityAllowed: "不可"
  },
  {
    projectId: "PJ-006",
    projectName: "ECサイト機能追加",
    location: "大阪",
    maxUnitPrice: 62,
    nationalityAllowed: "可"
  },
  {
    projectId: "PJ-007",
    projectName: "会計パッケージ導入支援",
    location: "名古屋",
    maxUnitPrice: 75,
    nationalityAllowed: "要確認"
  },
  {
    projectId: "PJ-008",
    projectName: "物流システム再構築",
    location: "福岡",
    maxUnitPrice: 67,
    nationalityAllowed: "不可"
  },
  {
    projectId: "PJ-009",
    projectName: "人事給与システム保守",
    location: "東京",
    maxUnitPrice: 58,
    nationalityAllowed: "可"
  },
  {
    projectId: "PJ-010",
    projectName: "案件管理システム開発",
    location: "京都",
    maxUnitPrice: 64,
    nationalityAllowed: "要確認"
  }
];

// 非同期処理を模擬する待機関数。
// ダミーAPIでもローディング表示を確認しやすいように少し遅延させる。
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// 検索用に値を正規化する。
// 空白や大文字小文字差を吸収して、部分一致判定を安定させる。
function normalize(value) {
  return String(value ?? "").trim().toLowerCase();
}

// 案件検索ダミーAPI。
// 案件名は部分一致、国籍条件は完全一致で絞り込み、件数付きで返却する。
export async function searchProjects({ projectName = "", nationalityAllowed = "all" } = {}) {
  // 実APIを想定した待機を入れて、画面のローディング制御を確認しやすくする。
  await delay(350);

  const keyword = normalize(projectName);

  // エラー表示の確認用に、特定キーワードで例外を発生させる。
  if (keyword === "__error__" || keyword === "error" || keyword === "エラー") {
    throw new Error("ダミー検索でエラーを発生させました");
  }

  // 検索条件に応じて配列をフィルタリングする。
  const items = PROJECTS.filter((project) => {
    const matchesName = !keyword || normalize(project.projectName).includes(keyword);
    const matchesNationality =
      nationalityAllowed === "all" || project.nationalityAllowed === nationalityAllowed;

    return matchesName && matchesNationality;
  });

  return {
    items,
    totalCount: items.length
  };
}
