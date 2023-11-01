import * as core from '@actions/core'
import type Analytics from '@rudderstack/rudder-sdk-node'

export async function run(client: Analytics): Promise<void> {
  try {
    const event: string = core.getInput('event')
    const userId: string = core.getInput('userId')
    // const properties: string = core.getInput('properties')

    console.log(`Sending event to ${process.env.RUDDERSTACK_DATAPLANE_URL}`)

    client.track({
      event,
      userId
      // properties: properties,
    })

    core.setOutput('success', 'true')
  } catch (error) {
    if (error instanceof Error) {
      const errorMessage = `Run failed: ${error.message}`
      core.setFailed(errorMessage)
    }
  }
}
