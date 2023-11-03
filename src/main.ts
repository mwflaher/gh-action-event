import * as core from '@actions/core'
import * as github from '@actions/github'

import type Analytics from '@rudderstack/rudder-sdk-node'

export async function run(client: Analytics): Promise<void> {
  try {
    const event: string = core.getInput('event')
    const userId: string = core.getInput('userId')
    // const properties: string = core.getInput('properties')

    console.log(`Sending event to ${process.env.RUDDERSTACK_DATAPLANE_URL}`)

    const { repo } = github.context

    client.track({
      event,
      userId,
      properties: {
        ghRepo: repo
      }
    })

    core.setOutput('success', 'true')
  } catch (error) {
    if (error instanceof Error) {
      const errorMessage = `Run failed: ${error.message}`
      core.setFailed(errorMessage)
    }
  }
}
