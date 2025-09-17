"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../src/app"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
describe('GET /api/images', () => {
    const srcImage = path_1.default.join(process.cwd(), 'images', 'full', 'littleGirl.jpeg');
    beforeAll(() => {
        if (!fs_1.default.existsSync(srcImage)) {
            fail('Please add a sample image at images/full/littleGirl.jpeg for tests to pass.');
        }
    });
    it('returns 200 and an image for valid parameters', (done) => {
        (0, supertest_1.default)(app_1.default)
            .get('/api/images')
            .query({ filename: 'littleGirl.jpg', width: '200', height: '200' })
            .expect(200)
            .expect('Content-Type', /image/)
            .end((err) => {
            if (err)
                return done.fail(err);
            done();
        });
    });
    it('returns 400 when missing filename', (done) => {
        (0, supertest_1.default)(app_1.default).get('/api/images').query({ width: '200', height: '200' }).expect(400, done);
    });
    it('returns 400 for invalid width/height', (done) => {
        (0, supertest_1.default)(app_1.default).get('/api/images').query({ filename: 'fjord.jpg', width: 'abc', height: '0' }).expect(400, done);
    });
    it('returns 404 for non-existent source image', (done) => {
        (0, supertest_1.default)(app_1.default).get('/api/images').query({ filename: 'no-such.jpg', width: '100', height: '100' }).expect(404, done);
    });
});
