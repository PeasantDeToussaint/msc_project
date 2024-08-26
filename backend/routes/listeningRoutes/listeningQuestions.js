import express from 'express';
import { 
  getListeningTest, 
  submitListeningTest, 
  getListeningImage, 
  getListeningAudio,
  getAvailableTestIds 
} from '../../controllers/listening/listeningController.js';

const router = express.Router();

router.get('/availableTest', getAvailableTestIds);
router.get('/:testId', getListeningTest);
router.get('/image/:audioRecordingId/:section', getListeningImage);
router.get('/audio/:audioRecordingId', getListeningAudio);
router.post('/:testId/submit', submitListeningTest);

export default router;
