import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';
import { Box } from '@strapi/design-system';

// Define the default toolbar options for the Quill editor
const defaultModules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ size: ['small', false, 'large', 'huge'] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ color: [] }, { background: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ align: [] }],
    ['link', 'image'],
    ['clean'],
  ],
};

const defaultFormats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'color',
  'background',
  'list',
  'bullet',
  'align',
  'link',
  'image',
];

// Styled component for the editor container
const EditorContainer = styled(Box)`
  .quill {
    border: 1px solid #4a4a6a !important;
    border-radius: 4px !important;
    box-shadow: 0 1px 4px rgba(33, 33, 52, 0.1);

    .ql-toolbar {
      border: none !important;
      border-bottom: 1px solid #4a4a6a !important;
      border-top-left-radius: 4px !important;
      border-top-right-radius: 4px !important;

      /* Make toolbar icons white */
      .ql-stroke {
        stroke: white;
      }
      .ql-fill {
        fill: white;
      }
      .ql-picker {
        color: white;

        .ql-picker-label {
          color: white;
        }
      }
      .ql-picker-options {
        background-color: #272733;

        .ql-picker-item {
          color: white;
        }
      }
      /* Background color for toolbar */
      background-color: #272733;

      /* Hover effects for better UX */
      button,
      .ql-picker-label {
        transition: background-color 0.2s ease;
      }

      button:hover,
      .ql-picker-label:hover {
        background-color: rgba(255, 255, 255, 0.2);
        border-radius: 3px;

        /* Ensure colors don't change on hover */
        .ql-stroke {
          stroke: white;
        }
        .ql-fill {
          fill: white;
        }
        color: white;
      }

      /* Style for active buttons to keep them white */
      .ql-active {
        background-color: rgba(255, 255, 255, 0.2);
        border-radius: 3px;

        .ql-stroke {
          stroke: white !important;
        }
        .ql-fill {
          fill: white !important;
        }
        color: white !important;
      }
    }

    .ql-container {
      border-bottom-left-radius: 4px !important;
      border-bottom-right-radius: 4px !important;
      min-height: 300px;
      border: none !important;
      border-top: none !important;

      .ql-editor {
        color: white; /* Default text color should be white */
        font-size: 14px;
      }

      /* Only change text color when explicitly modified */
      .ql-editor p,
      .ql-editor h1,
      .ql-editor h2,
      .ql-editor h3,
      .ql-editor h4,
      .ql-editor h5,
      .ql-editor h6,
      .ql-editor ul,
      .ql-editor ol {
        color: white;
      }

      /* Allow color to change only when a specific color class is applied */
      .ql-editor .ql-color-white,
      .ql-editor .ql-color-black,
      .ql-editor .ql-color-red,
      .ql-editor .ql-color-orange,
      .ql-editor .ql-color-yellow,
      .ql-editor .ql-color-green,
      .ql-editor .ql-color-blue,
      .ql-editor .ql-color-purple {
        color: inherit;
      }
    }
  }
`;

interface QuillEditorProps {
  name: string;
  onChange: (e: { target: { name: string; value: string } }) => void;
  value: string;
  disabled?: boolean;
  error?: string;
  // Custom configuration options
  customModules?: Record<string, any>;
  customFormats?: string[];
  customFonts?: string[];
  customColors?: string[];
  customFontSizes?: Array<string | boolean>;
}

const QuillEditor: React.FC<QuillEditorProps> = ({
  name,
  onChange,
  value,
  disabled = false,
  error,
  customModules,
  customFormats,
  customFonts,
  customColors,
  customFontSizes,
}) => {
  const [editorValue, setEditorValue] = useState(value || '');

  useEffect(() => {
    setEditorValue(value || '');
  }, [value]);

  const handleChange = (content: string) => {
    setEditorValue(content);
    onChange({
      target: {
        name,
        value: content,
      },
    });
  };

  // Merge custom configurations with defaults
  const modules = React.useMemo(() => {
    // Start with the default modules
    const mergedModules = { ...defaultModules };

    // If custom modules are provided, merge them
    if (customModules) {
      Object.assign(mergedModules, customModules);
    }

    // If custom toolbar options are provided, update specific toolbar items
    if (customFonts || customColors || customFontSizes) {
      // Create a copy of the toolbar to modify
      const toolbar = [...(mergedModules.toolbar || defaultModules.toolbar)];

      // Update fonts if provided
      if (customFonts && customFonts.length > 0) {
        const fontIndex = toolbar.findIndex(
          (item) =>
            Array.isArray(item) && item.some((subItem) => (subItem as any).font !== undefined)
        );
        if (fontIndex >= 0) {
          toolbar[fontIndex] = [{ font: customFonts } as any];
        }
      }

      // Update colors if provided
      if (customColors && customColors.length > 0) {
        const colorIndex = toolbar.findIndex(
          (item) =>
            Array.isArray(item) && item.some((subItem) => (subItem as any).color !== undefined)
        );
        if (colorIndex >= 0) {
          toolbar[colorIndex] = [
            { color: customColors } as any,
            { background: customColors } as any,
          ];
        }
      }

      // Update font sizes if provided
      if (customFontSizes && customFontSizes.length > 0) {
        const sizeIndex = toolbar.findIndex(
          (item) =>
            Array.isArray(item) && item.some((subItem) => (subItem as any).size !== undefined)
        );
        if (sizeIndex >= 0) {
          toolbar[sizeIndex] = [{ size: customFontSizes } as any];
        }
      }

      // Update the toolbar in the merged modules
      mergedModules.toolbar = toolbar;
    }

    return mergedModules;
  }, [customModules, customFonts, customColors, customFontSizes]);

  // Merge custom formats with defaults
  const formats = React.useMemo(() => {
    if (customFormats && customFormats.length > 0) {
      return customFormats;
    }
    return defaultFormats;
  }, [customFormats]);

  return (
    <EditorContainer>
      <ReactQuill
        theme="snow"
        value={editorValue}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        readOnly={disabled}
      />
      {error && (
        <Box paddingTop={1} color="danger600">
          {error}
        </Box>
      )}
    </EditorContainer>
  );
};

export default QuillEditor;
