## Tech stack

- typescript ^4.5.5

- Monorepo: lerna & yarn workspace - packages:

      - api: Serverless - Firebase Cloud Functions

      - common: Shared Models, Entities & Utils between Backend & Frontend

      - memo: Ant Design Pro framework

          - firebase deploy & hosting

          - firebase authentication

- CI/CD: Circle CI - trigger when master branch is changed

- Domain: namecheap

- Cloudflare for DNS & SSL & DDoS protection

- GCP for Dev VM HIGH CPU :D :D :D

### prerequire

typescipt 
```
npm install -g typescript
```

lerna multi package management
```
npm install --global lerna
```

### build @memo/common


```
  yarn --cwd packages/common/ build
```

### for link lerna


```
  lerna bootstrap
```

### for link yarn


```
  yarn --cwd packages/common link

  yarn --cwd packages/common link "@memo/common"
```

### start memo local PORT 8000 is default

```
  cd packages/memo
  yarn
  PORT=8880 yarn start
```
