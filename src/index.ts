import Analytics from '@rudderstack/rudder-sdk-node'
import { run } from './main'

const DATAPLANE_URL: string = process.env.DATAPLANE_URL || ''
const RUDDERSTACK_WRITE_KEY: string = process.env.RUDDERSTACK_WRITE_KEY || ''

const client = new Analytics(RUDDERSTACK_WRITE_KEY, {
  dataPlaneUrl: DATAPLANE_URL
})

// eslint-disable-next-line @typescript-eslint/no-floating-promises
run(client)
