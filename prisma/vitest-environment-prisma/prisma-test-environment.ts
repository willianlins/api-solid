import { Environment } from 'vitest/environments'

export default <Environment>(<unknown>{
  name: 'prisma',
  async setup() {
    console.log('Setup')

    return {
      teardown() {
        console.log('Teardown')
      },
    }
  },
})
