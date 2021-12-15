import { guard } from 'decoders';
import { indexerWellDecoder } from './indexer-well-decoder';

export const responseGuard = guard(indexerWellDecoder);
