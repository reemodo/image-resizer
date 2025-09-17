"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const imageProcessor_1 = require("../../src/utils/imageProcessor");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
describe('resizeImage utility', () => {
    const src = path_1.default.join(process.cwd(), 'images', 'full', 'fjord.jpg');
    beforeAll(() => {
        if (!fs_1.default.existsSync(src)) {
            fail('Add sample image images/full/fjord.jpg before running unit tests.');
        }
    });
    it('creates a resized image with valid inputs', async () => {
        const resultPath = await (0, imageProcessor_1.resizeImage)('fjord.jpg', 150, 150);
        expect(resultPath).toBeDefined();
        expect(fs_1.default.existsSync(resultPath)).toBeTrue();
    });
    it('throws on invalid width/height', async () => {
        await expectAsync((0, imageProcessor_1.resizeImage)('fjord.jpg', -10, 100)).toBeRejectedWithError('Invalid width');
    });
    it('throws when source not found', async () => {
        await expectAsync((0, imageProcessor_1.resizeImage)('nope.jpg', 100, 100)).toBeRejectedWithError('Source image not found');
    });
});
