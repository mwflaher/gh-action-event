import * as core from '@actions/core'
import * as github from '@actions/github'

import type Analytics from '@rudderstack/rudder-sdk-node'

export async function run(client: Analytics): Promise<void> {
  try {
    const event: string = core.getInput('event')
    const userId: string = core.getInput('userId')
    const properties: object = JSON.parse(core.getInput('properties'))

    console.log(`Sending event to ${process.env.RUDDERSTACK_DATAPLANE_URL}`)

    const { action, repo, sha, workflow } = github.context
    const defaultProperties = {
      ghRepo: repo.repo,
      ghRepoOwner: repo.owner,
      ghSha: sha,
      ghWorkflow: workflow,
      ghAction: action
    }

    client.track({
      event,
      userId,
      properties: { ...defaultProperties, ...properties }
    })

    core.setOutput('success', 'true')
  } catch (error) {
    if (error instanceof Error) {
      const errorMessage = `Run failed: ${error.message}`
      console.log(errorMessage)
      core.setOutput('success', 'false')
    }
  }
}
