import { Stack, StackProps } from "aws-cdk-lib"
import { Construct } from "constructs"
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs"
import { Runtime } from "aws-cdk-lib/aws-lambda"
import { join } from "path"
import { LambdaIntegration } from "aws-cdk-lib/aws-apigateway"

interface LambdaStackProps extends StackProps {
  stageName?: string
}

export class LambdaStack extends Stack {
  public readonly lambdaIntegration: LambdaIntegration
  constructor(scope: Construct, id: string, props: LambdaStackProps) {
    super(scope, id, props)
    const nodeLambda = new NodejsFunction(this, "helloLambda", {
      runtime: Runtime.NODEJS_18_X,
      handler: "handler",
      entry: join(__dirname, "..", "services", "hello.ts"),
      environment: {
        STAGE: props.stageName!,
      },
    })
    this.lambdaIntegration = new LambdaIntegration(nodeLambda)
  }
}
