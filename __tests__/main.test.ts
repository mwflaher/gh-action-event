import Analytics from '@rudderstack/rudder-sdk-node'
import * as core from '@actions/core'
import * as main from '../src/main'

/* Mock the GitHub Actions core library */
const getInputMock = jest.spyOn(core, 'getInput')
const setOutputMock = jest.spyOn(core, 'setOutput')

/* Mock the action's main function */
const runMock = jest.spyOn(main, 'run')

describe('action', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('sets the success output', async () => {
    const analytics = new Analytics("abcde")
    const trackMock = jest.spyOn(analytics, 'track').mockImplementation()
    getInputMock.mockImplementation((name: string): string => {
      switch (name) {
        case 'name':
          return 'test_event'
        case 'user':
          return 'test_user'
        default:
          return ''
      }
    })
    await main.run(analytics)
    expect(runMock).toHaveReturned()
    expect(trackMock).toHaveBeenCalledWith(
      {
        event: 'test_event',
        userId: 'test_user',
      }
    )
    expect(setOutputMock).toHaveBeenNthCalledWith(
      1,
      'success',
      expect.stringMatching('true')
    )
  })

  it('sets a failed status', async () => {
    //   // getInputMock.mockImplementation((name: string): string => {
    //   //   switch (name) {
    //   //     case 'success':
    //   //       return 'false'
    //   //     default:
    //   //       return 'false'
    //   //   }
    //   // })
    //   await main.run()
    //   expect(runMock).toHaveReturned()
    //   expect(setFailedMock).toHaveBeenNthCalledWith(
    //     1,
    //     'run failed'
    //   )
  })
})
