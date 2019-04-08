const AWS = require('aws-sdk');
const MetadataService  = new AWS.MetadataService();

const getMetric = (value) => {
  return {
    MetricData: [ /* required */
      {
        MetricName: 'CUSTOM_METRIC', /* required */
        Unit: 'Count',
        Value: value,
      },
    ],
    Namespace: 'CUSTOM' /* required */
  };
};



const sendCustomMetric = (metricValue) => {
  return new Promise((resolve, reject) => {
    MetadataService.request('/latest/meta-data/iam/security-credentials/CloudWatchPublisher', (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      const securityCredentials = JSON.parse(data);
      AWS.config.update({
        accessKeyId: securityCredentials.AccessKeyId,
        secretAccessKey: securityCredentials.SecretAccessKey,
        sessionToken: securityCredentials.Token,
        region: 'us-east-1',
      });

      const CloudWatch = new AWS.CloudWatch();

      CloudWatch.putMetricData(getMetric(metricValue), function(err, data) {
        if (err) {
          reject(err);
          return;
        }
        resolve(data);
      });
    });
  });
};

module.exports = {
  sendCustomMetric,
};
