# Serverless ECM POV

(C) JP.Cordeiro for CATS

[![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod)](https://gitpod.io/from-referrer/)

This repo contains AWS SAM templates that deploy a Proof Of Value for a serverless ECM application. This application uses Amazon ML services like Comprehend and Rekognition to index documents and images, and then sends the results to the Amazon DynamoDB Service for indexing.

This application uses an event-based architecture, with Amazon EventBridge as the serverless event bus.


```bash
.
├── README.MD                   <-- This instructions file
├── template.yaml               <-- SAM template for Application
├── analyzers                   <-- Source code for Lambda functions
│   └── analyzeText             <-- Text analyzer
│   └── analyzeImage            <-- Image analyzer
│   └── package.json            <-- NodeJS dependencies and scripts
├── converters                  <-- Source code for Lambda functions
│   └── processDOCX             <-- Converts DOCX file into text
│   └── processPDF              <-- Converts PDF files into text
│   └── package.json            <-- NodeJS dependencies and scripts
├── loaders                     <-- Source code for Lambda functions
│   └── loadToDB                <-- Load indexing info into DB and target bucket
│   └── package.json            <-- NodeJS dependencies and scripts
├── parser                      <-- Source code for a lambda function
│   └── parserFunction          <-- Parses input bucket 
│   └── package.json            <-- NodeJS dependencies and scripts
```

## Requirements

* AWS and AWS SAM CLI configured with Administrator permission
* [NodeJS 12.x installed](https://nodejs.org/en/download/)
* You can use GitPod (https://www.gitpod.io/) as you development environment with all this requirements.

## Installation Instructions

1. Clone the repo onto your local development machine using `git clone`.

1. Then run:
``` 
sam build -u
sam deploy --guided --capabilities CAPABILITY_NAMED_IAM
```
Follow the prompts in the deploy process to set the stack name, AWS Region, unique bucket names, DynamoDB domain endpoint, and other parameters.


aws s3 sync ACQsite/. s3://myecm-s3-acq

Acquisition URL : https://myecm-s3-acq.s3-eu-west-1.amazonaws.com/index.html

aws s3 rm s3://bucket-name --recursive

## How it works

* Upload PDF, DOCX or JPG, PNG files to the TP or BATCH buckets.
* After a few seconds you will see the index in DynamoDB has been updated with labels and entities for the object and the files moved to the ECS bucket.

==============================================

This application features are extracted from [Serverless Document Repository repo](https://github.com/aws-samples/s3-to-lambda-patterns/tree/master/decoupled-docrepo) provided by Amazon.


SPDX-License-Identifier: MIT-0
