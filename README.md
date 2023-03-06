# 구현방법 
## 16버전 변경 
1. node_module 폴더제거
2. package.json 변경
```json
{
  "name": "enrollment-react-app-server",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "react": "^16.14.0",
    "react-dom": "^16.14.0",
    "react-scripts": "5.0.1",
    "web-vitals": "^2.1.4"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}


```
3. 16버전 새로 설치
4. pulic내 favicon, index.html 남기고 모두 지우기 
5. src내 index.js남기고 모두 지우기
6. public> index.html 변경 
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <title>Enrollment App</title>
  </head>
  <body>

    <div id="root"></div>
   
  </body>
</html>

```

7. src>index.js 변경 
```js
import React from 'react';
import ReactDOM from 'react-dom';


ReactDOM.render(
  <React.StrictMode>
      <h1>리액트 테스트</h1>
  </React.StrictMode>,document.getElementById('root')
);

```


8. components 폴더에 component로 사용할 파일들 추가

9. server 폴더 생성
10. server  폴더 안 index.js 생성 
11. 