/**
 * projectSearchService.js
 * 案件検索ダミーAPI service層
 */

// ダミーデータ
const MOCK_PROJECTS = [
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

/**
 * 案件検索ダミーAPI呼び出し
 * @param {string} projectName - 案件名（部分一致検索）
 * @param {string} nationalityAllowed - 国籍可否（完全一致検索）
 * @returns {Promise<{items: Array, totalCount: number}>}
 */
export async function searchProjects(projectName = "", nationalityAllowed = "") {
  // APIレスポンスをシミュレート（非同期処理）
  return new Promise((resolve, reject) => {
    try {
      // 検索条件でフィルタリング
      let filtered = MOCK_PROJECTS.filter(project => {
        // projectName指定時は部分一致
        if (projectName && !project.projectName.includes(projectName)) {
          return false;
        }
        // nationalityAllowed指定時は完全一致
        if (nationalityAllowed && project.nationalityAllowed !== nationalityAllowed) {
          return false;
        }
        return true;
      });

      // ダミーの非同期処理をシミュレート（100msのディレイ）
      setTimeout(() => {
        resolve({
          items: filtered,
          totalCount: filtered.length
        });
      }, 100);
    } catch (error) {
      reject(error);
    }
  });
}
