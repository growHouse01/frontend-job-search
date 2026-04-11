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
            maxlength="20"
          />
        </div>
        <div class="form-group">
          <label for="nationalityAllowed">国籍可否 <span class="required">※</span>:</label>
          <select id="nationalityAllowed" required>
            <option value="全て">全て</option>
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
 * 検索条件のバリデーション
 * @param {string} nationalityAllowed - 国籍可否
 * @returns {Object} {isValid: boolean, errorMessage: string}
 */
export function validateProjectSearch(nationalityAllowed) {
  if (!nationalityAllowed || nationalityAllowed.trim() === "") {
    return { isValid: false, errorMessage: "国籍可否を選択してください" };
  }
  return { isValid: true, errorMessage: "" };
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
