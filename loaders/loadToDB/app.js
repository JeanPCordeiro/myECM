/*
  Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
  Permission is hereby granted, free of charge, to any person obtaining a copy of this
  software and associated documentation files (the "Software"), to deal in the Software
  without restriction, including without limitation the rights to use, copy, modify,
  merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
  permit persons to whom the Software is furnished to do so.
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
  INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
  PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
  HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
  OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
  SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

'use strict'

const AWS = require('aws-sdk')
AWS.config.region = process.env.AWS_REGION 
//JPC const { indexDocument } = require('./indexDocument')

const docClient = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3()

// The standard Lambda handler
exports.handler = async (event) => {
  console.log(JSON.stringify(event, null, 2))



  try {
    // Payload object for ES
    let payload = {
      TableName : process.env.DBTableName,
      Item: {
        Id: event.id,
        Date: event.time,
        Type: event.detail.type,
        File: event.detail.key,
        Bucket: process.env.ECSBucketName,
        SourceBucket: event.detail.bucket,
        Entities: event.detail.entities
      }
    }
    

    // Images use labels instead of entities
    if (event["detail-type"] === "NewImage" ) {
      payload.Item.Entities = event.detail.labels
    }
 
    console.log('Payload: ', JSON.stringify(payload, null, 2))
    //JPC await indexDocument(payload)

    await docClient.put(payload).promise();


    var params = {
      CopySource: event.detail.bucket + '/' + event.detail.key,
      Bucket: process.env.ECSBucketName,
      Key: event.detail.key
    };
    console.log('params: ', JSON.stringify(params, null, 2))
    await s3.copyObject(params).promise()


    var params = {  Bucket: event.detail.bucket, Key: event.detail.key };
    console.log('params: ', JSON.stringify(params, null, 2))
    await s3.deleteObject(params).promise()


  } catch (err) {
    console.error(`Handler error: ${err}`)
  }
}
