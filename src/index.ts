import Analytics from '@rudderstack/rudder-sdk-node'
import { run } from './main'

const RUDDERSTACK_DATAPLANE_URL: string =
  process.env.RUDDERSTACK_DATAPLANE_URL || ''
const RUDDERSTACK_WRITE_KEY: string = process.env.RUDDERSTACK_WRITE_KEY || ''

const client = new Analytics(RUDDERSTACK_WRITE_KEY, {
  dataPlaneUrl: RUDDERSTACK_DATAPLANE_URL
})

// eslint-disable-next-line @typescript-eslint/no-floating-promises
run(client)
