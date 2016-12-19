import AWS from 'aws-sdk'
import secrets from '../../../../secrets'

const s3Config = secrets.s3

const getCredentials = (req, res, next) => {
  const { id } = req.user

  AWS.config = {
    accessKeyId: s3Config.id,
    secretAccessKey: s3Config.key
  }

  const s3 = new AWS.S3()
  const timestamp = new Date().getTime()
  const encodedFileName = encodeURIComponent(req.query['file-name'])
  const fileName = id + '/' + timestamp + '/' + encodedFileName
  const fileType = req.query['file-type']
  const s3Params = {
    Bucket: s3Config.bucket,
    Key: fileName,
    Expires: 300,
    ContentType: fileType,
    ACL: 'public-read'
  }

  s3.getSignedUrl('putObject', s3Params, (error, data) => {
    if (error) {
      console.log(error)
      res.status(400).json({ success: false, message: 'Failed to generate S3 credentials!' })
      return next(error)
    }

    const returnData = {
      signedRequest: data,
      url: `https://${s3Config.bucket}.s3.amazonaws.com/${fileName}`
    }

    res.status(200).json({ success: true, data: returnData })
    res.end()
  })
}

export default getCredentials
