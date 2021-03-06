import { tags, servers, securitySchemes } from '@/main/docs/helpers';

import { authPaths, userPaths } from '@/main/docs/paths';

import {
  loginSchema,
  firstLoginSchema,
  firstAccessSchema,
  createUserSchema,
  updateUserSchema,
} from '@/main/docs/schemas';

export default {
  openapi: '3.0.0',
  info: {
    title: 'Node Leap API',
    version: '1.0.0',
    description: 'API',
    contact: {
      email: 'tech@loomi.com.br',
    },
  },
  servers,
  tags,
  paths: {
    ...authPaths,
    ...userPaths,
  },
  schemas: {
    createUserSchema: createUserSchema,
    updateUserSchema: updateUserSchema,
    firstAccess: firstAccessSchema,
    loginSchema: loginSchema,
    firstLoginSchema: firstLoginSchema,
  },
  components: {
    securitySchemes,
  },
};
