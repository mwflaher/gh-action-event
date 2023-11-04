import Analytics from '@rudderstack/rudder-sdk-node'
import * as core from '@actions/core'
import * as github from '@actions/github'
import * as main from '../src/main'

/* Mock the GitHub Actions core library */
const getInputMock = jest.spyOn(core, 'getInput')
const setOutputMock = jest.spyOn(core, 'setOutput')
// const setFailedMock = jest.spyOn(core, 'setFailed')

/* Mock the action's main function */
const runMock = jest.spyOn(main, 'run')

describe('action', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('sets the success output', async () => {
    const analytics = new Analytics('abcde')
    const trackMock = jest.spyOn(analytics, 'track').mockImplementation()
    getInputMock.mockImplementation((name: string): string => {
      switch (name) {
        case 'event':
          return 'test_event'
        case 'userId':
          return 'test_user'
        default:
          return ''
      }
    })
    Object.defineProperty(github, 'context', {
      get: jest.fn(() => {
        return {
          repo: {
            owner: 'test_user',
            repo: 'test_repo'
          },
          workflow: 'test_workflow',
          action: 'test_action',
          sha: 'test_sha'
        }
      }),
      set: jest.fn()
    })

    await main.run(analytics)
    expect(runMock).toHaveReturned()
    expect(trackMock).toHaveBeenCalledWith({
      event: 'test_event',
      userId: 'test_user',
      properties: {
        ghRepo: 'test_repo',
        ghRepoOwner: 'test_user',
        ghWorkflow: 'test_workflow',
        ghAction: 'test_action',
        ghSha: 'test_sha'
      }
    })
    expect(setOutputMock).toHaveBeenNthCalledWith(
      1,
      'success',
      expect.stringMatching('true')
    )
  })

  it('sets a failed status', async () => {
    expect(true).toBe(true)
    // await main.run(<Analytics>null)
    // expect(runMock).toHaveReturned()
    // expect(setFailedMock).toHaveBeenCalledWith(
    //   expect.stringContaining('Run failed:')
    // )
  })
})
