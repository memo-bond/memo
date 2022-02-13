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


### build @memo/common


```
  cd packages/common && yarn build => dist folder generated
```

### for link lerna


```
  lerna bootstrap
```

### for link yarn


```
  cd packages/common && yarn link => create yarn link

  cd packages/memo && yarn link "@memo/common" => link @memo/common to @memo/memo
```

### start memo local PORT 8000 is default

```
  cd packages/memo && yarn && yarn start
```
