/**
 * ProjectSearchActions.js
 * 検索・クリアボタンコンポーネント
 */

/**
 * アクションボタンを描画
 * @param {boolean} isLoading - ローディング状態
 * @param {Function} onSearch - 検索ボタン押下時のコールバック
 * @param {Function} onClear - クリアボタン押下時のコールバック
 */
export function renderProjectSearchActions(isLoading, onSearch, onClear) {
  const container = document.getElementById("search-actions-container");
  if (!container) return;

  container.innerHTML = `
    <div class="search-actions">
      <button 
        id="searchBtn" 
        class="btn btn-primary"
        ${isLoading ? "disabled" : ""}
      >
        ${isLoading ? "検索中..." : "検索"}
      </button>
      <button 
        id="clearBtn" 
        class="btn btn-secondary"
        ${isLoading ? "disabled" : ""}
      >
        クリア
      </button>
    </div>
  `;

  // イベントリスナー設定
  const searchBtn = document.getElementById("searchBtn");
  const clearBtn = document.getElementById("clearBtn");

  searchBtn?.addEventListener("click", onSearch);
  clearBtn?.addEventListener("click", onClear);
}
