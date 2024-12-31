const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');
const Availability = require('../src/models/availabilityModel');
const User = require('../src/models/userModel');

describe('Availability Controller', () => {
  let token;
  let professorId;

  beforeAll(async () => {
    await mongoose.connect(process.env.DOCUMENTDB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const professor = new User({ name: 'Professor', email: 'professor@example.com', password: 'password', role: 'professor' });
    await professor.save();
    professorId = professor._id;

    token = jwt.sign({ id: professor._id, role: professor.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  });

  afterAll(async () => {
    await User.deleteMany({});
    await Availability.deleteMany({});
    await mongoose.connection.close();
  });

  it('should add availability', async () => {
    const response = await request(app)
      .post('/api/availability')
      .set('Authorization', `Bearer ${token}`)
      .send({ timeSlots: ['2023-10-01T10:00:00Z', '2023-10-01T11:00:00Z'] });

    expect(response.status).toBe(201);
    expect(response.body.timeSlots).toEqual(['2023-10-01T10:00:00Z', '2023-10-01T11:00:00Z']);
  });

  it('should update availability', async () => {
    const response = await request(app)
      .put('/api/availability')
      .set('Authorization', `Bearer ${token}`)
      .send({ timeSlots: ['2023-10-01T12:00:00Z'] });

    expect(response.status).toBe(200);
    expect(response.body.timeSlots).toEqual(['2023-10-01T12:00:00Z']);
  });

  it('should delete availability', async () => {
    const response = await request(app)
      .delete('/api/availability')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Availability deleted');
  });
});