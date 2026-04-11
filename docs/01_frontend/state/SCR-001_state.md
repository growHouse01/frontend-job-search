# SCR-001 案件検索一覧画面 state設計

画面ID: SCR-001
画面名: 案件検索一覧画面
path: /projects

---

## 1. state方針
- state は画面単位で保持する
- 初期値、検索中、成功、0件、失敗、クリア後の遷移を明示する
- 画面表示に必要な状態は HTML 側ではなく state 側で管理する

---

## 2. state一覧

| state名 | 型 | 初期値 | 説明 |
|--------|----|--------|------|
| projectName | string | "" | 案件名検索条件 |
| nationalityAllowed | string | "all" | 国籍条件検索条件 |
| items | array | [] | 案件検索結果一覧 |
| totalCount | number | 0 | 検索結果件数 |
| loading | boolean | false | API実行中フラグ |
| errorMessage | string | "" | エラーメッセージ |
| infoMessage | string | "" | 情報メッセージ |
| hasSearched | boolean | false | 検索実行済みフラグ |

---

## 3. state遷移

### 3.1 初期表示
- projectName = ""
- nationalityAllowed = "all"
- items = []
- totalCount = 0
- loading = false
- errorMessage = ""
- infoMessage = ""
- hasSearched = false

### 3.2 検索ボタン押下
- hasSearched = true
- loading = true
- errorMessage = ""
- infoMessage = ""

### 3.3 API成功時
- items = APIレスポンス.items
- totalCount = APIレスポンス.totalCount
- loading = false
- totalCount が 0 の場合は infoMessage = "検索結果は0件です。"

### 3.4 API失敗時
- items = []
- totalCount = 0
- loading = false
- errorMessage = エラーメッセージ

### 3.5 クリアボタン押下
- projectName = ""
- nationalityAllowed = "all"
- items = []
- totalCount = 0
- loading = false
- errorMessage = ""
- infoMessage = ""
- hasSearched = false

---

## 4. 実装メモ
- 純JavaScriptの場合は `state` オブジェクトで管理する
- Reactの場合は `useState` で管理する
- Vueの場合は `ref` または `reactive` で管理する
- 画面固有の表示フラグは `hasSearched` のように用途が分かる名前で持つ
