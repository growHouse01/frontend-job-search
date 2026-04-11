/**
 * ProjectResultTable.js
 * 案件一覧テーブルコンポーネント
 */

/**
 * 検索結果テーブルを描画
 * @param {Array} items - 案件データ配列
 */
export function renderProjectResultTable(items) {
  const container = document.getElementById("result-table-container");
  if (!container) return;

  // 結果がない場合
  if (!items || items.length === 0) {
    container.innerHTML = `
      <div class="result-table">
        <p class="no-results">検索結果がありません</p>
      </div>
    `;
    return;
  }

  // テーブルHTMLを構築
  const tableRows = items.map(item => `
    <tr>
      <td>${escapeHtml(item.projectId)}</td>
      <td>${escapeHtml(item.projectName)}</td>
      <td>${escapeHtml(item.location)}</td>
      <td class="align-right">${item.maxUnitPrice}万円</td>
      <td>${escapeHtml(item.nationalityAllowed)}</td>
    </tr>
  `).join("");

  const html = `
    <div class="result-table">
      <table class="projects-table">
        <thead>
          <tr>
            <th>案件ID</th>
            <th>案件名</th>
            <th>勤務地</th>
            <th>上限単価</th>
            <th>国籍可否</th>
          </tr>
        </thead>
        <tbody>
          ${tableRows}
        </tbody>
      </table>
    </div>
  `;

  container.innerHTML = html;
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
