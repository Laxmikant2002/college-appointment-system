const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');
const Appointment = require('../src/models/appointmentModel');
const User = require('../src/models/userModel');
const Availability = require('../src/models/availabilityModel');

describe('Appointment Controller', () => {
  let token;
  let studentId;
  let professorId;

  beforeAll(async () => {
    await mongoose.connect(process.env.DOCUMENTDB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const student = new User({ name: 'Student', email: 'student@example.com', password: 'password', role: 'student' });
    await student.save();
    studentId = student._id;

    const professor = new User({ name: 'Professor', email: 'professor@example.com', password: 'password', role: 'professor' });
    await professor.save();
    professorId = professor._id;

    token = jwt.sign({ id: student._id, role: student.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    const availability = new Availability({ professor: professorId, timeSlots: ['2023-10-01T10:00:00Z'] });
    await availability.save();
  });

  afterAll(async () => {
    await User.deleteMany({});
    await Appointment.deleteMany({});
    await Availability.deleteMany({});
    await mongoose.connection.close();
  });

  it('should book an appointment', async () => {
    const response = await request(app)
      .post('/api/appointments')
      .set('Authorization', `Bearer ${token}`)
      .send({ professorId, timeSlot: '2023-10-01T10:00:00Z' });

    expect(response.status).toBe(201);
    expect(response.body.timeSlot).toBe('2023-10-01T10:00:00Z');
  });

  it('should get available slots', async () => {
    const response = await request(app)
      .get('/api/appointments/available-slots')
      .set('Authorization', `Bearer ${token}`)
      .query({ professorId });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(['2023-10-01T10:00:00Z']);
  });

  it('should get appointments', async () => {
    const response = await request(app)
      .get('/api/appointments')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });
});