# enveror

```
This library under alpha version now.
```

environment variables managing library for TypeScript (or JavaScript).

```typescript
$ npm i enveror
```

# feature

- easy to validate type
- easy to define nested environment variables
- easy to use array for environment variables

# how to use

place `.enveror` to current dir as following content.

```
STAGE = "dev"
CLOUD.API_KEY_ID = "hogehoge=hog"
```

```ts
import { Enveror } from 'enveror';

const enveror = new Enveror({});
const stage = enveror.get('STAGE').as_string();
console.log(stage);

const cloud_api_key_id = enveror.get('CLOUD').get('API_KEY_ID').as_string();
// const cloud_api_key_id = enveror.get('CLOUD.API_KEY_ID').as_string(); // same as above
console.log(cloud_api_key_id);
```

# env format

default loaded file is `./.enveror`.

You can write environment variables as following format.

```
STAGE = "dev"
CLOUD.API_KEY_ID = "hogehoge=hog"
CLOUD.API_SECRET_KEY = "fug+;l[l;uw:er\-0-63-096z,nxvcafuga"
CLOUD.STORAGE.IMAGES = "myimages"
CORS_ORIGINS =["http://localhost:3000"]
WORKER_COUNT =4
TIMEOUT_SECONDS= 2.3
EMPTY_STRING=" "
```

above file is interpretted as following object

```json
{
  "STAGE": "dev",
  "CLOUD": {
    "API_KEY_ID": "hogehoge=hog",
    "API_SECRET_KEY": "fug+;l[l;uw:er\\-0-63-096z,nxvcafuga",
    "STORAGE": { "IMAGES": "myimages" }
  },
  "API": { "CORS_ORIGIN": ["http://localhost:3000"] },
  "WORKER_COUNT": 4,
  "TIMEOUT_SECONDS": 2.3,
  "EMPTY_STRING": " "
}
```

**points**

- `""` is interpretted as string var
- `[]` is interpretted as array
- `.` is interpretted as nested key

# supported types

| type       | assertion         |
| ---------- | ----------------- |
| `string`   | as_string()       |
| `number`   | as_number()       |
| `string[]` | as_array_string() |
| `number[]` | as_array_number() |

in additional, string in nested object is accessable by `.get("X").get("Y").as_string()` or `.get("X.Y").as_string()`

# API

## Constructor

```typescript
new Enveror({
  routes = ['./.enveror.local'], // additional enveror file
  disableDefault = false, // disable loading `./.enveror`
});
```

## Methods

| method                  | args                    | return           |
| ----------------------- | ----------------------- | ---------------- |
| `get(key:string):Value` | `key` is key of env var | `Value` of `key` |
| `keys():string[]`       |                         | keys in 1-depth  |
| `to_object():object`    |                         | loaded object    |
| `to_string():string`    |                         |                  |

## Value Methods

`Value` is value container for environment variable(s).

it has type-assertion and children getter.

| method                        | args                  | return                    |
| ----------------------------- | --------------------- | ------------------------- |
| `as_any(): ValueType`         |                       | get var without assertion |
| `as_string(): string`         |                       | assertion for `string`    |
| `as_number(): number`         |                       | assertion for `number`    |
| `as_array_string(): string[]` |                       | assertion for `string[]`  |
| `as_array_number(): number[]` |                       | assertion for `number[]`  |
| `get(key: string): Value`     | `key` is key of child | child `Value` of `key`    |
| `keys(): string[]`            |                       | keys of children          |

# internal type-checker for variable

`KEY = "VAR"`, `KEY= "VAR"`, `KEY ="VAR"` and `KEY="VAR"` is same meaning in this library.

```
/^"._"$/           => "string"
/^[0-9]+$/         => "number"
/^[0-9]+.[0-9]+$/  => "number"
/^\[._\]$/         => "array"
not matched        => Error
```
