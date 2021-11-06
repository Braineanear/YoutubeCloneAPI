import dotenv from 'dotenv';
import Joi from 'joi';

dotenv.config({ path: '.env' });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid('production', 'development', 'test')
      .required(),
    PORT: Joi.number().default(3000),
    REDIS_HOST: Joi.string().required(),
    REDIS_PORT: Joi.number().required(),
    REDIS_USERNAME: Joi.string().required(),
    REDIS_PASSWORD: Joi.string().required(),
    DATABASE_CONNECTION: Joi.string().required(),
    DATABASE_PASSWORD: Joi.string().required(),
    AWS_ACCESS_KEY_ID: Joi.string().required(),
    AWS_SECRET_ACCESS_KEY: Joi.string().required(),
    AWS_REGION: Joi.string().required(),
    AWS_BUCKET_NAME: Joi.string().required(),
    JWT_SECRET: Joi.string().required(),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().required(),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number().required(),
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number().required(),
    JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number().required(),
    SMTP_HOST: Joi.string().required(),
    SMTP_PORT: Joi.number().required(),
    SMTP_USERNAME: Joi.string().required(),
    SMTP_PASSWORD: Joi.string().required(),
    EMAIL_FROM: Joi.string().required()
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  redis: {
    host: envVars.REDIS_HOST,
    port: envVars.REDIS_PORT,
    password: envVars.REDIS_PASSWORD
  },
  db: {
    url: envVars.DATABASE_CONNECTION,
    pass: envVars.DATABASE_PASSWORD
  },
  aws: {
    accessKey: {
      id: envVars.AWS_ACCESS_KEY_ID,
      secret: envVars.AWS_SECRET_ACCESS_KEY
    },
    region: envVars.AWS_REGION,
    bucketName: envVars.AWS_BUCKET_NAME
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    accessToken: {
      expire: envVars.JWT_ACCESS_EXPIRATION_MINUTES
    },
    refreshToken: {
      expire: envVars.JWT_REFRESH_EXPIRATION_DAYS
    },
    resetPasswordToken: {
      expire: envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES
    },
    verifyEmailToken: {
      expire: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES
    }
  },
  email: {
    smtp: {
      host: envVars.SMTP_HOST,
      port: envVars.SMTP_PORT,
      auth: {
        user: envVars.SMTP_USERNAME,
        pass: envVars.SMTP_PASSWORD
      }
    },
    from: envVars.EMAIL_FROM
  }
};

export default config;
