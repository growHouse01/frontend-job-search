# SCR-001 案件検索一覧画面 state設計

画面ID: SCR-001
画面名: 案件検索一覧画面

---

## 1. state一覧

### 1.1 検索条件state

| state名 | 型 | 初期値 | 説明 |
|--------|----|--------|------|
| projectName | string | "" | 案件名検索条件 |
| nationalityAllowed | string | "" | 国籍可否検索条件 |

### 1.2 検索結果state

| state名 | 型 | 初期値 | 説明 |
|--------|----|--------|------|
| items | array | [] | 案件検索結果一覧 |
| totalCount | number | 0 | 検索結果件数 |

### 1.3 UI状態state

| state名 | 型 | 初期値 | 説明 |
|--------|----|--------|------|
| loading | boolean | false | API実行中フラグ |
| errorMessage | string | "" | エラーメッセージ |
| infoMessage | string | "" | 情報メッセージ |

---

## 2. state遷移

### 2.1 初期表示
- projectName = ""
- nationalityAllowed = ""
- items = []
- totalCount = 0
- loading = false
- errorMessage = ""
- infoMessage = ""

### 2.2 検索ボタン押下
- loading = true
- errorMessage = ""
- infoMessage = ""

### 2.3 API成功時
- items = APIレスポンス.items
- totalCount = APIレスポンス.totalCount
- loading = false
- totalCount が 0 の場合は infoMessage = "検索結果は0件です"

### 2.4 API失敗時
- loading = false
- errorMessage = "データ取得に失敗しました"

### 2.5 クリアボタン押下
- projectName = ""
- nationalityAllowed = ""
- items = []
- totalCount = 0
- loading = false
- errorMessage = ""
- infoMessage = ""

---

## 3. 実装メモ
- 純JavaScriptの場合は state オブジェクトで管理してよい
- Reactの場合は useState で管理してよい
- Vueの場合は ref または reactive で管理してよい
