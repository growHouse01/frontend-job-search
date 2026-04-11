# コンポーネント一覧

画面ID: SCR-001
画面名: 案件検索一覧画面

---

## 1. コンポーネント一覧

| コンポーネント名 | 種別 | 役割 | 入力 | 出力 |
|-----------------|------|------|------|------|
| ProjectSearchPage | page | 画面全体とstate管理 | なし | なし |
| ProjectSearchForm | component | 検索条件入力 | projectName, nationalityAllowed | onConditionChange |
| ProjectSearchActions | component | 検索・クリアボタン | onSearch, onClear, loading | click event |
| ProjectMessageArea | component | 件数・メッセージ表示 | totalCount, errorMessage, infoMessage | なし |
| ProjectResultTable | component | 案件一覧テーブル表示 | items | なし |

---

## 2. 分割方針
- ページコンポーネントは state 管理と API 呼び出しを担当する
- 子コンポーネントは表示責務中心とする
- 子コンポーネントは可能な限り副作用を持たない
