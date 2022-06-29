# Serverless ECM POV

(C) JP.Cordeiro for CATS

[![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod)](https://gitpod.io/from-referrer/)

This repo contains AWS SAM templates that deploy a Proof Of Value for a serverless ECM application. This application uses Amazon ML services like Comprehend and Rekognition to index documents and images, and then sends the results to the Amazon DynamoDB Service for indexing.

This application uses an event-based architecture, with Amazon EventBridge as the serverless event bus.


```bash
.
├── README.MD                   <-- This instructions file
├── analyzers                   <-- Source code for Lambda functions
│   └── analyzeText             <-- Text analyzer
│   └── analyzeImage            <-- Image analyzer
│   └── template.yaml           <-- SAM template for Analyzers
│   └── package.json            <-- NodeJS dependencies and scripts
├── converters                  <-- Source code for Lambda functions
│   └── processDOCX             <-- Converts DOCX file into text
│   └── processPDF              <-- Converts PDF files into text
│   └── template.yaml           <-- SAM template for Converters
│   └── package.json            <-- NodeJS dependencies and scripts
├── loaders                     <-- Source code for Lambda functions
│   └── loadToDB                <-- Load indexing info into ES
│   └── template.yaml           <-- SAM template for Loaders
│   └── package.json            <-- NodeJS dependencies and scripts
├── parser                      <-- Source code for a lambda function
│   └── parserFunction          <-- Main Lambda handler
│   └── template.yaml           <-- SAM template for Parser
│   └── package.json            <-- NodeJS dependencies and scripts
├── global                      <-- Source code for a lambda function
│   └── template.yaml           <-- SAM template for basic application
```

## Requirements

* AWS CLI already configured with Administrator permission
* [NodeJS 12.x installed](https://nodejs.org/en/download/)
* You can use GitPod (https://www.gitpod.io/) as you development environment with all this requirements.

## Installation Instructions

1. [Create an AWS account](https://portal.aws.amazon.com/gp/aws/developer/registration/index.html) if you do not already have one and login.

1. Clone the repo onto your local development machine using `git clone`.

1. Then run:
``` 
sam build -u
sam deploy --guided --capabilities CAPABILITY_NAMED_IAM
```
Follow the prompts in the deploy process to set the stack name, AWS Region, unique bucket names, DynamoDB domain endpoint, and other parameters.


## How it works

* Upload PDF, DOCX or JPG, PNG files to the TP or BATCH buckets.
* After a few seconds you will see the index in DynamoDB has been updated with labels and entities for the object and the files moved to the ECS bucket.

==============================================

This application features are extracted from [Serverless Document Repository repo](https://github.com/aws-samples/s3-to-lambda-patterns/tree/master/decoupled-docrepo) provided by Amazon.


SPDX-License-Identifier: MIT-0
