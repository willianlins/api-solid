import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAutheticateUser } from '@/utils/test/create-and-authenticate-use'
import { prisma } from '@/lib/prisma'

describe('Validate Check-in (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to validate a check-in', async () => {
    const { token } = await createAndAutheticateUser(app, true)
    const user = await prisma.user.findFirstOrThrow()

    const gym = await prisma.gym.create({
      data: {
        title: 'JavaScript Gym',
        latitude: -27.2092052,
        longitude: -49.6401091,
      },
    })

    let checkin = await prisma.checkIn.create({
      data: {
        gym_id: gym.id,
        user_id: user.id,
      },
    })

    const response = await request(app.server)
      .patch(`/check-ins/${checkin.id}/validate`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(204)

    checkin = await prisma.checkIn.findUniqueOrThrow({
      where: {
        id: checkin.id,
      },
    })

    expect(checkin.validated_at).toEqual(expect.any(Date))
  })
})
