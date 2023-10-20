import * as core from '@actions/core'
import * as main from '../src/main'

/* Mock the GitHub Actions core library */
// const debugMock = jest.spyOn(core, 'debug')
// const getInputMock = jest.spyOn(core, 'getInput')
// const setFailedMock = jest.spyOn(core, 'setFailed')
const setOutputMock = jest.spyOn(core, 'setOutput')

/* Mock the action's main function */
const runMock = jest.spyOn(main, 'run')

describe('action', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('sets the success output', async () => {
    // getInputMock.mockImplementation((name: string): string => {
    //   switch (name) {
    //     case 'success':
    //       return 'true'
    //     default:
    //       return 'false'
    //   }
    // })
    await main.run()
    expect(runMock).toHaveReturned()
    expect(setOutputMock).toHaveBeenNthCalledWith(
      1,
      'success',
      expect.stringMatching('true')
    )
  })

  // it('sets a failed status', async () => {
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
  // })
})
