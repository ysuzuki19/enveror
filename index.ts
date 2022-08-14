import { Enveror } from './lib/enveror';

const enveror = new Enveror({ routes: ['./.enveror.local'] });
const stage = enveror.get('STAGE').as_string();
console.log(stage);

const cloud_api_key_id = enveror.get('CLOUD').get('API_KEY_ID').as_string();
// const cloud_api_key_id = enveror.get('CLOUD.API_KEY_ID').as_string(); // same as above
console.log(cloud_api_key_id);

const cors_origins = enveror.get('CORS_ORIGINS').as_array_string();
console.log(cors_origins);

console.dir(enveror.to_object());
