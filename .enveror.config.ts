import { Obstract } from 'obstractor';

const enveror_config: Obstract = {
  STAGE: {
    type: 'string',
    validate: (input) => [['dev', 'prod'].includes(input), 'dev or prod'],
    nullable: true,
    default: 'dev',
  },
  // CLOUD: { type: 'object' },
  // API: {
  //   type: 'object',
  //   validate: (input) => {},
  // },
  // WORKER_COUNT: { type: 'number' },
  // TIMEOUT_SECONDS: { type: 'number' },
  // EMPTY: { type: 'undefined' },
  // EMPTY_STRING: { type: 'string' },
  // DEVELOPER: { NAME: { type: 'string' } },
};

export default enveror_config;
