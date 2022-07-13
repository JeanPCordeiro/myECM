#!/bin/bash

echo
echo "Decommission myECM stack"
echo

echo "Remove S3 buckets content"
aws s3 rm s3://myecm-s3-acq --recursive
aws s3 rm s3://myecm-s3-tp --recursive
aws s3 rm s3://myecm-s3-batch --recursive
aws s3 rm s3://myecm-s3-ecs --recursive
aws s3 rm s3://myecm-s3-view --recursive

echo
echo "Remove myECM Stack"
sam delete --stack-name myecm --debug --no-prompts --region eu-west-1
