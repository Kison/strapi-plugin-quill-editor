import type { Core } from '@strapi/strapi';
import { PLUGIN_ID } from './pluginId';

const register = ({ strapi }: { strapi: Core.Strapi }) => {
  strapi.customFields.register({
    name: 'quill',
    plugin: PLUGIN_ID,
    type: 'string',
  });
};

export default register;
