mkdir dist
cp remove-api-from-uri/index.js dist/index.js
zip -r dist.zip dist
export AWS_PROFILE=cloudformation
aws s3api put-object --bucket mu-findingcre-lambda-functions --key remove-api-from-uri --region us-east-1 --body ./dist.zip

