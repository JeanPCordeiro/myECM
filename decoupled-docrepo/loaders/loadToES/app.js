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

// The standard Lambda handler
exports.handler = async (event) => {
  console.log(JSON.stringify(event, null, 2))

  try {
    // Payload object for ES
    let payload = {
      id: Date.now(),
      index: event.detail.type,
      content: {
        Key: event.detail.key,
        Bucket: event.detail.bucket,
        entities: event.detail.entities
      }
    }

    // Images use labels instead of entities
    if (event["detail-type"] === "NewImage" ) {
      payload.entities = event.detail.labels
    }
 
    console.log('Payload: ', JSON.stringify(payload, null, 2))
    //JPC await indexDocument(payload)

  } catch (err) {
    console.error(`Handler error: ${err}`)
  }
}
