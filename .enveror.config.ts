import { Obstract } from 'obstractor';

const enveror_config: Obstract = {
  STAGE: {
    type: 'string',
    validate: (input) => [['dev', 'prod'].includes(input), 'dev or prod'],
    nullable: true,
    default: 'dev',
  },
};

export default enveror_config;
