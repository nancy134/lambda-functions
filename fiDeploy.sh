mkdir dist
cp cognito-email-templates/fi-index.js dist/index.js
zip -r dist.zip dist
export AWS_PROFILE=cloudformation
aws s3api put-object --bucket fi-findingcre-lambda-functions --key cognito-email-templates --region us-east-1 --body ./dist.zip

