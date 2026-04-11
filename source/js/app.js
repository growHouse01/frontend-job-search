/**
 * app.js
 * 案件検索一覧画面 - メインアプリケーション
 * ページ全体の state 管理と API 呼び出しを担当
 */

import { searchProjects } from "./services/projectSearchService.js";
import { renderProjectSearchForm } from "./components/ProjectSearchForm.js";
import { renderProjectSearchActions } from "./components/ProjectSearchActions.js";
import { renderProjectMessageArea } from "./components/ProjectMessageArea.js";
import { renderProjectResultTable } from "./components/ProjectResultTable.js";

/**
 * アプリケーション状態
 */
let appState = {
  // 検索条件
  projectName: "",
  nationalityAllowed: "",
  // 検索結果
  items: [],
  totalCount: 0,
  // UI状態
  loading: false,
  errorMessage: "",
  infoMessage: ""
};

/**
 * アプリケーション初期化
 */
export function initializeApp() {
  render();
  attachEventListeners();
}

/**
 * 全画面を再描画
 */
function render() {
  renderProjectSearchForm(appState, handleConditionChange);
  renderProjectSearchActions(appState.loading, handleSearch, handleClear);
  renderProjectMessageArea(appState.totalCount, appState.errorMessage, appState.infoMessage);
  renderProjectResultTable(appState.items);
}

/**
 * 検索条件変更時のハンドラ
 * @param {Object} newCondition - 新しい検索条件
 */
function handleConditionChange(newCondition) {
  appState.projectName = newCondition.projectName;
  appState.nationalityAllowed = newCondition.nationalityAllowed;
  render();
}

/**
 * 検索ボタン押下時のハンドラ
 */
async function handleSearch() {
  // ローディング状態
  appState.loading = true;
  appState.errorMessage = "";
  appState.infoMessage = "";
  render();

  try {
    // API呼び出し
    const result = await searchProjects(appState.projectName, appState.nationalityAllowed);
    
    // 結果を state に反映
    appState.items = result.items;
    appState.totalCount = result.totalCount;

    // 0件の場合は情報メッセージを表示
    if (appState.totalCount === 0) {
      appState.infoMessage = "検索結果は0件です";
    }

    appState.loading = false;
    render();
  } catch (error) {
    // エラー処理
    console.error("Search error:", error);
    appState.errorMessage = "データ取得に失敗しました";
    appState.items = [];
    appState.totalCount = 0;
    appState.loading = false;
    render();
  }
}

/**
 * クリアボタン押下時のハンドラ
 */
function handleClear() {
  // 初期状態に戻す
  appState = {
    projectName: "",
    nationalityAllowed: "",
    items: [],
    totalCount: 0,
    loading: false,
    errorMessage: "",
    infoMessage: ""
  };
  render();
}

/**
 * 追加のイベントリスナー設定
 * （Enterキーで検索実行など）
 */
function attachEventListeners() {
  const projectNameInput = document.getElementById("projectName");
  if (projectNameInput) {
    projectNameInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        handleSearch();
      }
    });
  }
}

// ページロード時に初期化
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeApp);
} else {
  initializeApp();
}
