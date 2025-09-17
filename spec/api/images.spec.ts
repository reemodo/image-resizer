import request from 'supertest';
import app from '../../src/app';
import fs from 'fs';
import path from 'path';

describe('GET /api/images', () => {
  const srcImage = path.join(process.cwd(), 'images', 'full', 'fjord.jpg');

  beforeAll(() => {
    if (!fs.existsSync(srcImage)) {
      fail('Please add images/full/fjord.jpg for tests.');
    }
  });

  it('returns 200 and an image for valid parameters', (done) => {
    request(app)
      .get('/api/images')
      .query({ filename: 'fjord.jpg', width: '200', height: '200' })
      .expect(200)
      .expect('Content-Type', /image/)
      .end((err) => {
        if (err) return done.fail(err);
        done();
      });
  });

  it('returns 400 when missing filename', (done) => {
    request(app).get('/api/images').query({ width: '200', height: '200' }).expect(400, done);
  });

  it('returns 400 for invalid width/height', (done) => {
    request(app).get('/api/images').query({ filename: 'fjord.jpg', width: 'abc', height: '0' }).expect(400, done);
  });

  it('returns 404 for non-existent source image', (done) => {
    request(app).get('/api/images').query({ filename: 'no-such.jpg', width: '100', height: '100' }).expect(404, done);
  });
});
