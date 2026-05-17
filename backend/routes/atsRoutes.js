import express from 'express';
const router = express.Router();
import upload from '../middleware/upload.js';
import {uploadResume,analyzeResumeController} from '../controllers/atsController.js';
import {protect} from '../middleware/authMiddleware.js';

router.use(protect);

router.post('/upload', upload.single('resume'), uploadResume);
router.post('/analyze', analyzeResumeController);

export default router;