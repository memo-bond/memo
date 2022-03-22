
```
    npx google-artifactregistry-auth
    gcloud config set artifacts/location us-central1
    gcloud artifacts tags list --package=@memo-bond/common --repository=memo-bond
    gcloud artifacts versions list --package=@memo-bond/common --repository=memo-bond
```

```shell

gcloud functions deploy api     \
    --project=memo-9b895        \
    --region=asia-southeast1    \
    --runtime=nodejs14          \
    --source=lib                \
    --set-env-vars=NPM_REGISTRY=https://us-central1-npm.pkg.dev/memo-9b895/memo-bond/,NPM_SCOPE=@memo-bond

```

```shell
    
    # google cloud build command

    npm install --package-lock-only --quiet    

```