# AI生成指示サンプル

```text
docs/01_frontend 配下の Markdown を正式な設計書として読み取り、
案件検索一覧画面のフロントエンドコードを生成してください。

要件:
- 一覧画面は 1画面のみ
- 検索APIはダミー実装とする
- ダミーデータは docs/01_frontend/samples/mock-project-data.md を利用する
- 画面単位のHTMLは `source/SCR-001_画面名.html` の形式で作成する
- JavaScript は state 管理、イベント処理、API呼び出し、最小限の表示更新に限定する
- `app.js` と `service.js` は画面IDを含むファイル名で作成する
- 画面全体を JavaScript の innerHTML だけで再構築しない
- 新規画面のMDは docs/01_frontend/screens/SCREEN_TEMPLATE.md の見出し順をベースに作成する
- 画面単位のMDファイル名には画面IDを含め、`SCR-001_画面名.md` の形式を基本とする
- services は必要最小限に留める
- HTML、CSS、JavaScript には適切なコメントを記載する
- 特に JavaScript は処理概要、処理内容、主要な分岐、state更新の意図が分かるコメントを関数ごとに入れる
- 検索ボタンとクリアボタンを実装する
- 件数表示、0件表示、エラー表示を実装する
- 純HTML / CSS / JavaScript で実装する
- 生成sourceのルートディレクトリ：source/
```
