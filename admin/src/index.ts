import { PLUGIN_ID } from './pluginId';
import { Initializer } from './components/Initializer';
import { PluginIcon } from './components/PluginIcon';
import { getTranslation } from './utils/getTranslation'

export default {
  register(app: any) {
    // Register the Quill Editor as a custom field
    app.customFields.register({
      name: 'quill',
      pluginId: PLUGIN_ID,
      type: 'string',
      intlLabel: {
        id: getTranslation('quill.label'),
        defaultMessage: 'Rich Text (Quill)',
      },
      intlDescription: {
        id: getTranslation('quill.description'),
        defaultMessage: 'Advanced rich text editor with formatting options',
      },
      icon: PluginIcon,
      components: {
        Input: async () =>
          import('./components/QuillFieldInput').then((module) => ({
            default: module.QuillFieldInput,
          })),
      },
    });

    app.registerPlugin({
      id: PLUGIN_ID,
      initializer: Initializer,
      isReady: false,
      name: PLUGIN_ID,
    });
  },

  async registerTrads({ locales }: { locales: string[] }) {
    return Promise.all(
      locales.map(async (locale) => {
        try {
          const { default: data } = await import(`./translations/${locale}.json`);

          return { data, locale };
        } catch {
          return { data: {}, locale };
        }
      })
    );
  },
};
