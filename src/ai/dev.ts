import { config } from 'dotenv';
config();

import '@/ai/flows/generate-initial-model-prompt.ts';
import '@/ai/flows/suggest-data-sources.ts';