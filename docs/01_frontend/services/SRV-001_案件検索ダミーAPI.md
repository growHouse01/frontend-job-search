# SRV-001 案件検索ダミーAPI

## 1. 概要
フロントエンド単体開発用のダミーAPI。
バックエンド未実装のため、固定配列データを filter して返却する。

## 2. API情報

| 項目 | 内容 |
|------|------|
| API名 | 案件検索ダミーAPI |
| Method | GET |
| URL | /mock/api/projects |

## 3. リクエスト

| パラメータ | 型 | 必須 | 説明 |
|------------|----|------|------|
| projectName | string |  | 案件名の部分一致検索 |
| nationalityAllowed | string |  | 国籍可否の完全一致検索 |

## 4. レスポンス

```json
{
  "items": [
    {
      "projectId": "PJ-001",
      "projectName": "Java基幹システム改修",
      "location": "東京",
      "maxUnitPrice": 65,
      "nationalityAllowed": "可"
    }
  ],
  "totalCount": 1
}
```

## 5. 擬似検索ルール
- projectName 指定時は案件名の部分一致
- nationalityAllowed 指定時は完全一致
- 両方未指定時は全件返却
