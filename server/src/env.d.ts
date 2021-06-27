declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    ENV: string;
    DATABASE_URL: string;
    CORS_ORIGIN: string;
    SECRET1: string;
    SECRET2: string;
    COOKIE_NAME: string;
  }
}
