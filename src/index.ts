import dotenv from 'dotenv'
import Analytics from '@rudderstack/rudder-sdk-node'
import { run } from './main'

dotenv.config();

const DATAPLANE_URL: string = process.env.RS_DATAPLANE_URL || ""
const RUDDERSTACK_WRITE_KEY: string = process.env.RS_WRITE_KEY || ""

const client = new Analytics(RUDDERSTACK_WRITE_KEY, {
  dataPlaneUrl: DATAPLANE_URL,
});

// eslint-disable-next-line @typescript-eslint/no-floating-promises
run(client)
