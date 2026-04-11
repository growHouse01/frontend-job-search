/**
 * ProjectSearchForm.js
 * 検索条件入力コンポーネント
 */

/**
 * 検索条件フォームを描画
 * @param {Object} state - 現在の状態
 * @param {string} state.projectName - 案件名
 * @param {string} state.nationalityAllowed - 国籍可否
 * @param {Function} onConditionChange - 条件変更時のコールバック
 */
export function renderProjectSearchForm(state, onConditionChange) {
  const container = document.getElementById("search-form-container");
  if (!container) return;

  // 初回描画時のみHTMLを生成
  if (!container.querySelector(".search-form")) {
    container.innerHTML = `
      <div class="search-form">
        <div class="form-group">
          <label for="projectName">案件名:</label>
          <input 
            type="text" 
            id="projectName" 
            placeholder="案件名を入力"
            maxlength="100"
          />
        </div>
        <div class="form-group">
          <label for="nationalityAllowed">国籍可否:</label>
          <select id="nationalityAllowed">
            <option value="">-- 選択してください --</option>
            <option value="可">可</option>
            <option value="不可">不可</option>
            <option value="要確認">要確認</option>
          </select>
        </div>
      </div>
    `;

    // イベントリスナーは初回のみ設定
    const projectNameInput = document.getElementById("projectName");
    const nationalityAllowedSelect = document.getElementById("nationalityAllowed");

    projectNameInput?.addEventListener("input", (e) => {
      onConditionChange({
        projectName: e.target.value,
        nationalityAllowed: nationalityAllowedSelect.value
      });
    });

    nationalityAllowedSelect?.addEventListener("change", (e) => {
      onConditionChange({
        projectName: projectNameInput.value,
        nationalityAllowed: e.target.value
      });
    });
  }

  // 状態更新のみ（DOMの再生成なし）
  const projectNameInput = document.getElementById("projectName");
  const nationalityAllowedSelect = document.getElementById("nationalityAllowed");
  
  if (projectNameInput) {
    projectNameInput.value = state.projectName;
  }
  if (nationalityAllowedSelect) {
    nationalityAllowedSelect.value = state.nationalityAllowed;
  }
}

/**
 * HTMLエスケープ
 */
function escapeHtml(text) {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#039;"
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}
