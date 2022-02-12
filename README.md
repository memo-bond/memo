we are using Yarn Workspace & Lerna for packages management

build @memo/common
`
  cd packages/common && yarn build => dist folder generated
`

for link lerna
`
  lerna bootstrap
`

for link yarn
`
  cd packages/common && yarn link

  cd packages/memo && yarn link "@memo/common"
`