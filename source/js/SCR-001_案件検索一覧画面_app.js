import { searchProjects } from "./services/SCR-001_案件検索一覧画面_projectSearchService.js";

// 画面全体の状態をまとめて管理する。
// 検索条件、検索結果、件数、メッセージ、ローディング状態を1つの state に集約する。
const state = {
  projectName: "",
  nationalityAllowed: "all",
  items: [],
  totalCount: 0,
  loading: false,
  errorMessage: "",
  infoMessage: "",
  hasSearched: false
};

// 初期化処理の入口。
// イベント登録、フォーム同期、初期描画、ボタン状態の初期化をまとめて実行する。
function initializeApp() {
  bindEvents();
  syncForm();
  renderSummary();
  renderMessages();
  renderResults();
  updateLoadingState(false);
}

// 画面内のイベントを一括登録する。
// 検索・入力変更・クリアの3系統に分けて、各ハンドラへ責務を委ねる。
function bindEvents() {
  document.getElementById("search-form")?.addEventListener("submit", handleSearch);
  document.getElementById("projectName")?.addEventListener("input", handleProjectNameChange);
  document.getElementById("nationalityAllowed")?.addEventListener("change", handleNationalityChange);
  document.getElementById("clearBtn")?.addEventListener("click", handleClear);
}

// 案件名入力の変更を state に反映する。
// 入力中でも条件サマリーだけは更新して、今の検索条件を見えるようにする。
function handleProjectNameChange(event) {
  state.projectName = event.target.value;
  renderSummary();
}

// 国籍条件の変更を state に反映する。
// 条件表示の更新だけ行い、検索は明示的な実行時に限定する。
function handleNationalityChange(event) {
  state.nationalityAllowed = event.target.value;
  renderSummary();
}

// 検索ボタン押下時の処理。
// ダミーAPIを呼び出し、成功・0件・失敗の各状態に応じて表示を切り替える。
async function handleSearch(event) {
  event.preventDefault();

  // 多重送信を防止するため、検索中は再実行しない。
  if (state.loading) {
    return;
  }

  // 検索開始の状態へ切り替える。
  state.hasSearched = true;
  state.loading = true;
  state.errorMessage = "";
  state.infoMessage = "";
  renderSummary();
  renderMessages();
  renderResults();
  updateLoadingState(true);

  try {
    // サービス層に条件を渡して検索結果を取得する。
    const result = await searchProjects({
      projectName: state.projectName,
      nationalityAllowed: state.nationalityAllowed
    });

    // 成功時は結果と件数を反映する。0件の場合は情報メッセージを出す。
    state.items = result.items;
    state.totalCount = result.totalCount;
    state.infoMessage = result.totalCount === 0 ? "検索結果は0件です。" : "";
  } catch (error) {
    // 失敗時は一覧を空にし、ユーザー向けのエラーメッセージを設定する。
    state.items = [];
    state.totalCount = 0;
    state.errorMessage = error instanceof Error ? error.message : "データ取得に失敗しました。";
  } finally {
    // 最後に描画を更新し、ローディング状態を解除する。
    state.loading = false;
    renderSummary();
    renderMessages();
    renderResults();
    updateLoadingState(false);
  }
}

// クリアボタン押下時の処理。
// 入力、結果、メッセージ、件数を初期状態へ戻す。
function handleClear() {
  state.projectName = "";
  state.nationalityAllowed = "all";
  state.items = [];
  state.totalCount = 0;
  state.loading = false;
  state.errorMessage = "";
  state.infoMessage = "";
  state.hasSearched = false;

  syncForm();
  renderSummary();
  renderMessages();
  renderResults();
  updateLoadingState(false);
}

// state の値をフォームへ同期する。
// 初期化後や再描画時に、表示と state の差分が残らないようにする。
function syncForm() {
  const projectNameInput = document.getElementById("projectName");
  const nationalitySelect = document.getElementById("nationalityAllowed");

  if (projectNameInput) {
    projectNameInput.value = state.projectName;
  }

  if (nationalitySelect) {
    nationalitySelect.value = state.nationalityAllowed;
  }
}

// ローディング中の操作制御。
// 検索中は入力とボタンを無効化して、多重実行を避ける。
function updateLoadingState(isLoading) {
  const searchButton = document.getElementById("searchBtn");
  const clearButton = document.getElementById("clearBtn");
  const projectNameInput = document.getElementById("projectName");
  const nationalitySelect = document.getElementById("nationalityAllowed");

  if (searchButton) {
    searchButton.textContent = isLoading ? "検索中..." : "検索";
    searchButton.disabled = isLoading;
  }

  if (clearButton) {
    clearButton.disabled = isLoading;
  }

  if (projectNameInput) {
    projectNameInput.disabled = isLoading;
  }

  if (nationalitySelect) {
    nationalitySelect.disabled = isLoading;
  }
}

// 件数と条件サマリーを描画する。
// 未検索、検索中、失敗、成功の文言をここで切り替える。
function renderSummary() {
  const resultCount = document.getElementById("result-count");
  const resultsMeta = document.getElementById("results-meta");
  const resultsCondition = document.getElementById("results-condition");

  if (resultCount) {
    resultCount.textContent = String(state.totalCount);
  }

  if (resultsMeta) {
    if (!state.hasSearched) {
      resultsMeta.textContent = "検索条件を指定して「検索」を押してください。";
    } else if (state.loading) {
      resultsMeta.textContent = "検索中です。";
    } else if (state.errorMessage) {
      resultsMeta.textContent = "検索に失敗しました。";
    } else {
      resultsMeta.textContent = `${state.totalCount}件の検索結果を表示しています。`;
    }
  }

  if (resultsCondition) {
    const parts = [];

    if (state.projectName.trim()) {
      parts.push(`案件名: ${state.projectName.trim()}`);
    }

    if (state.nationalityAllowed !== "all") {
      parts.push(`国籍条件: ${state.nationalityAllowed}`);
    }

    resultsCondition.textContent = parts.length ? `条件: ${parts.join(" / ")}` : "";
  }
}

// メッセージ領域を描画する。
// エラー、情報、未検索メッセージの優先度を決めて表示する。
function renderMessages() {
  const messageRegion = document.getElementById("message-region");

  if (!messageRegion) {
    return;
  }

  const messages = [];

  if (state.errorMessage) {
    messages.push(`<div class="message message-error">${escapeHtml(state.errorMessage)}</div>`);
  }

  if (state.infoMessage) {
    messages.push(`<div class="message message-info">${escapeHtml(state.infoMessage)}</div>`);
  }

  if (!state.hasSearched && !state.errorMessage && !state.infoMessage) {
    messages.push(`<div class="message message-success">検索前です。条件を入力して検索を実行してください。</div>`);
  }

  messageRegion.innerHTML = messages.join("");
}

// 検索結果領域を描画する。
// 未検索、ローディング、エラー、0件、一覧表示の各状態を切り替える。
function renderResults() {
  const resultsArea = document.getElementById("results-area");

  if (!resultsArea) {
    return;
  }

  if (!state.hasSearched) {
    resultsArea.innerHTML = `<div class="empty-state">一覧はまだ表示されていません。検索を実行すると結果がここに表示されます。</div>`;
    return;
  }

  if (state.loading) {
    resultsArea.innerHTML = `<div class="loading-state"><span class="loading-state__spinner" aria-hidden="true"></span>検索条件に合う案件を取得しています...</div>`;
    return;
  }

  if (state.errorMessage) {
    resultsArea.innerHTML = `<div class="empty-state">エラーのため一覧は表示されませんでした。条件を見直すか、再度検索してください。</div>`;
    return;
  }

  if (state.totalCount === 0) {
    resultsArea.innerHTML = `<div class="empty-state">該当する案件はありませんでした。</div>`;
    return;
  }

  resultsArea.innerHTML = `
    <div class="table-wrap">
      <table class="projects-table">
        <thead>
          <tr>
            <th>案件ID</th>
            <th>案件名</th>
            <th>勤務地</th>
            <th class="align-right">単価(万円)</th>
            <th>国籍条件</th>
          </tr>
        </thead>
        <tbody id="results-body"></tbody>
      </table>
    </div>
  `;

  const tbody = document.getElementById("results-body");
  if (!tbody) {
    return;
  }

  tbody.replaceChildren(...state.items.map(createResultRow));
}

// 1行分の結果要素を生成する。
// 行単位でDOMを組み立て、一覧の見通しを保つ。
function createResultRow(item) {
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td>${escapeHtml(item.projectId)}</td>
    <td>${escapeHtml(item.projectName)}</td>
    <td>${escapeHtml(item.location)}</td>
    <td class="align-right">${escapeHtml(String(item.maxUnitPrice))}</td>
    <td>${escapeHtml(item.nationalityAllowed)}</td>
  `;
  return tr;
}

// HTMLエスケープ。
// 一覧に表示する値をそのまま埋め込まず、安全化してから描画する。
function escapeHtml(value) {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;"
  };

  return String(value).replace(/[&<>"']/g, (match) => map[match]);
}

// DOM読み込み完了後に初期化する。
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeApp);
} else {
  initializeApp();
}
