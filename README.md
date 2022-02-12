we are using Yarn Workspace & Lerna for packages management

for link lerna
`
  lerna bootstrap
`

for link yarn
`
  cd packages/common && yarn link

  cd packages/memo && yarn link "@memo/common"
`