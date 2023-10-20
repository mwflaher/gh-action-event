import * as core from '@actions/core'
import { isStringObject } from 'util/types'

// const RUDDERSTACK_WRITE_KEY: string =
// process.env.RUDDERSTACK_WRITE_KEY || '2X1p3cBEe8JeaUkIrcgLgYWd6aa'

/**
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    // const event: string = core.getInput('name')
    // const user: string = core.getInput('user')
    // const properties: string = core.getInput('properties')

    core.setOutput('success', 'true')
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}
