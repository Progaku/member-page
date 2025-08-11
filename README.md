# MemberPage

# Init

```sh
npm install -g @angular/cli
npm install -g firebase-tools
firebase login:ci
cp example.env .env
```

## serve

```sh
ng serve
```

## deploy

```sh
ng build
firebase deploy
```

## Biome

### vscode

1. [Biome VS Code extension](https://marketplace.visualstudio.com/items?itemName=biomejs.biome)をインストール

### IntelliJ

1. biomeプラグインをインストール
2. 設定 > 言語&フレームワーク > biome
3. `Run ** on save` にすべてチェック
