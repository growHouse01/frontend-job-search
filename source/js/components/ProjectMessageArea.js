/**
 * ProjectMessageArea.js
 * 件数・メッセージ表示コンポーネント
 */

/**
 * メッセージエリアを描画
 * @param {number} totalCount - 検索結果件数
 * @param {string} errorMessage - エラーメッセージ
 * @param {string} infoMessage - 情報メッセージ
 */
export function renderProjectMessageArea(totalCount, errorMessage, infoMessage) {
  const container = document.getElementById("message-area-container");
  if (!container) return;

  let content = "";

  // エラーメッセージを表示
  if (errorMessage) {
    content += `<div class="message message-error">${escapeHtml(errorMessage)}</div>`;
  }

  // 情報メッセージを表示
  if (infoMessage) {
    content += `<div class="message message-info">${escapeHtml(infoMessage)}</div>`;
  }

  // 件数を表示（エラーやメッセージがある場合も表示）
  if (totalCount > 0 || (!errorMessage && !infoMessage)) {
    content += `<div class="message message-count">検索結果: <strong>${totalCount}</strong> 件</div>`;
  }

  container.innerHTML = content;
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
