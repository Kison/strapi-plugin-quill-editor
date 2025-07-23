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
    border: 1px solid #dcdce4;

    .ql-toolbar {
      border-bottom: 1px solid #dcdce4;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
    }

    .ql-container {
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      min-height: 300px;
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
        const fontIndex = toolbar.findIndex(item =>
          Array.isArray(item) && item.some(subItem => (subItem as any).font !== undefined)
        );
        if (fontIndex >= 0) {
          toolbar[fontIndex] = [{ font: customFonts } as any];
        }
      }

      // Update colors if provided
      if (customColors && customColors.length > 0) {
        const colorIndex = toolbar.findIndex(item =>
          Array.isArray(item) && item.some(subItem => (subItem as any).color !== undefined)
        );
        if (colorIndex >= 0) {
          toolbar[colorIndex] = [{ color: customColors } as any, { background: customColors } as any];
        }
      }

      // Update font sizes if provided
      if (customFontSizes && customFontSizes.length > 0) {
        const sizeIndex = toolbar.findIndex(item =>
          Array.isArray(item) && item.some(subItem => (subItem as any).size !== undefined)
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
