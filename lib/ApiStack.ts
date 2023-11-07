import { Stack, StackProps } from "aws-cdk-lib"
import { Construct } from "constructs"
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs"
import { Runtime } from "aws-cdk-lib/aws-lambda"
import { join } from "path"
import { LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway"

interface ApiStackProps extends StackProps {
  lambdaIntegration: LambdaIntegration
}

export class ApiStack extends Stack {
  constructor(scope: Construct, id: string, props: ApiStackProps) {
    super(scope, id, props)

    const api = new RestApi(this, "VDApi")
    const machineResource = api.root.addResource("machine")
    machineResource.addMethod("GET", props.lambdaIntegration)
  }
}
