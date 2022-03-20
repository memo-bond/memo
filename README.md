## Tech stack

- typescript ^4.5.5

- Monorepo: lerna & yarn workspace - packages:

      - api: Serverless - Firebase Functions

      - common: Shared Models, Entities & Utils between Backend & Frontend

      - admin: Ant Design Pro framework

          - firebase hosting

          - firebase authentication

          - firebase firestore

      - memo: Memo UI

- CI/CD: Circle CI - auto deploy UI when master branch is changed

- Domain: namecheap

- Cloudflare for DNS & SSL & DDoS protection

- GCP


### Setup Dev (MacOS)

``` shell
      
      # install brew
      /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
      # instal nvm - Node Version Manager
      brew install nvm
      # install node v14.18.3
      nvm install v14.18.3
      # install yarn global
      npm i -g yarn
      
```

### At root directory of our project, run build yarn workspace

```

yarn
      
```

### Start Memo Admin

``` shell

      cd packages/admin
      # resolve dependencies & start app
      yarn && yarn start
      
```
==> http://localhost:8000


## Start Backend

``` shell

      cd packages/api/functions
      # resolve dependencies & start firebase emulator
      yarn && yarn serve

```

==> http://localhost:5001/memo-9b895/asia-southeast1/api


## prerequire

``` shell

# typescript
npm install -g typescript
# lerna
npm install --global lerna


```

### build @memo-bond/common


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
yarn --cwd packages/common link "@memo-bond/common"

```

### start admin with custom PORT 8880

```
  
cd packages/admin
yarn && PORT=8880 yarn start

```
