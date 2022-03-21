gcloud functions deploy memo_api --trigger-http     \
    --project=memo-9b895        \
    --region=asia-southeast1    \
    --runtime=nodejs14          \
    --source=lib                \
    --set-env-vars=NPM_REGISTRY=https://us-central1-npm.pkg.dev/memo-9b895/memo-bond/,NPM_SCOPE=@memo-bond