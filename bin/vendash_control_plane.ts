#!/usr/bin/env node
import "source-map-support/register"
import * as cdk from "aws-cdk-lib"
import { VendashControlPlaneStack } from "../lib/vendash_control_plane-stack"

const app = new cdk.App()
new VendashControlPlaneStack(app, "VendashControlPlaneStack", {})
