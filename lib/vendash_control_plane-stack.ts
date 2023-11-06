import * as cdk from "aws-cdk-lib"
import { Construct } from "constructs"
import {
  CodePipeline,
  CodePipelineSource,
  ShellStep,
} from "aws-cdk-lib/pipelines"
import { PipelineStage } from "./PipelineStage"

export class VendashControlPlaneStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    const pipeline = new CodePipeline(this, "AwesomePipeline", {
      pipelineName: "awesomepipline",
      synth: new ShellStep("Synth", {
        input: CodePipelineSource.gitHub(
          "ray836/vendash-control-plane",
          "main"
        ),
        commands: ["npm ci", "npx cdk synth"],
      }),
    })

    const testStage = pipeline.addStage(
      new PipelineStage(this, "Pipeline", {
        stageName: "test",
      })
    )
  }
}
