import { PLUGIN_ID } from './pluginId';
import { Initializer } from './components/Initializer';
import { PluginIcon } from './components/PluginIcon';
import { getTranslation } from './utils/getTranslation'

// Define the configuration type
interface QuillPluginConfig {
  customModules?: Record<string, any>;
  customFormats?: string[];
  customFonts?: string[];
  customColors?: string[];
  customFontSizes?: Array<string | boolean>;
}

// Store the plugin configuration
let pluginConfig: QuillPluginConfig = {};

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
        Input: async () => {
          const module = await import('./components/QuillFieldInput');
          // Create a component that passes the configuration to QuillFieldInput
          const ConfiguredQuillFieldInput = (props: any) => {
            return module.QuillFieldInput({
              ...props,
              ...pluginConfig,
            });
          };
          return {
            default: ConfiguredQuillFieldInput,
          };
        },
      },
    });

    app.registerPlugin({
      id: PLUGIN_ID,
      initializer: Initializer,
      isReady: false,
      name: PLUGIN_ID,
    });
  },

  // Method to configure the plugin
  bootstrap(app: any) {
    // Get the plugin configuration from the app
    const config = app.getPlugin(PLUGIN_ID)?.configuration || {};
    pluginConfig = config;
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
