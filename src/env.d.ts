// Define the type of the environment variables.
declare interface Env {
  readonly NODE_ENV: string;
  // Replace the following with your own environment variables.
  // Example: NGX_VERSION: string;
  readonly NODE_ENV: string;
  readonly NG_APP_API_KEY: string;
  readonly NG_APP_AUTH_DOMAIN: string;
  readonly NG_APP_PROJECT_ID: string;
  readonly NG_APP_STORAGE_BUCKET: string;
  readonly NG_APP_MESSAGING_SENDER_ID: string;
  readonly NG_APP_APP_ID: string;
  readonly NG_APP_MEASUREMENT_ID: string;
}

// Choose how to access the environment variables.
// Remove the unused options.

// 1. Use import.meta.env.YOUR_ENV_VAR in your code. (conventional)
declare interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// 2. Use _NGX_ENV_.YOUR_ENV_VAR in your code. (customizable)
// You can modify the name of the variable in angular.json.
// ngxEnv: {
//  define: '_NGX_ENV_',
// }
declare const _NGX_ENV_: Env;

// 3. Use process.env.YOUR_ENV_VAR in your code. (deprecated)
declare namespace NodeJS {
  export interface ProcessEnv extends Env {}
}
