# VUE-HW-COMMANDS

## Auto generate files with template

## Install

```
$ npm install vue-hw-commands
```

## Usage

### 1. Template Create

컴포넌트 , 페이지 , 플러그인 의 기본 템플릿을 생성한다.

- 컴포넌트 / 페이지 기본 템플릿 생성

```
$ vue-hw-template {FOLDER_NAME}
```

- 플러그인 기본 템플릿 생성

```
$ vue-hw-template {FOLDER_NAME} -P
or
$ vue-hw-template {FOLDER_NAME} -plugin
```

- Generate files
  FORDER_NAME
  ㄴ index.ts
  ㄴ {{name}}.scss
  ㄴ {{name}}.ts
  ㄴ {{name}}.vue

### 2. TS-Lint 설정

lint 설정의 일반화를 위하여 사용한다.

- prettier, ts-config 기본 설정

```
$ vue-hw-lint
```

### 3. Publish 설정

서비스 배포 전, 로컬에서 Build된 배포환경을 테스트 하기위해 사용한다.

- koa 를 활용한 web-server 를 설정

```
$ vue-hw-pre-publish  // 기본 포트 3000으로 설정
or
$ vue-hw-pre-publish {PORT}
```
