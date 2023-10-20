import * as core from '@actions/core'
import type Analytics from '@rudderstack/rudder-sdk-node'

export async function run(client: Analytics): Promise<void> {
  try {
    const event: string = core.getInput('name')
    const user: string = core.getInput('user')
    const properties: string = core.getInput('properties')

    client.track({
      event: event,
      userId: user,
      // properties: properties,
    })

    core.setOutput('success', 'true')
  }
  catch (error) {
    if (error instanceof Error) core.setFailed("Run failed: " + error.message)
  }
}
