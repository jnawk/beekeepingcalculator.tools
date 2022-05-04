import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as cdk from 'aws-cdk-lib';
import {   
  aws_cloudfront as cloudfront,
  aws_cloudfront_origins as origins,
  aws_s3 as s3,
  aws_s3_deployment as s3deploy,
} from 'aws-cdk-lib';

export class BeekeepingcalculatorsComStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const websiteBucket = new s3.Bucket(this, 'WebsiteBucket', {versioned: true})
    
    const distribution = new cloudfront.Distribution(this, "Distribution", {
      defaultBehavior: {
        origin: new origins.S3Origin(websiteBucket)
      },
      defaultRootObject: "index.html"
    })

    new s3deploy.BucketDeployment(this, "DeployWebsite", {
      sources: [ s3deploy.Source.asset("./website")],
      destinationBucket: websiteBucket,
      distribution, 
      distributionPaths: ["/*"],
    })

    new cdk.CfnOutput(this, "DistributionDomainName", {
      value: distribution.domainName
    })
  }
}
