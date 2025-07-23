import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';
import { Box } from '@strapi/design-system';

// Define the toolbar options for the Quill editor
const modules = {
  toolbar: [
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'font': [] }],
    [{ 'size': ['small', false, 'large', 'huge'] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'align': [] }],
    ['link', 'image'],
    ['clean']
  ],
};

const formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike',
  'color', 'background',
  'list', 'bullet',
  'align',
  'link', 'image'
];

// Styled component for the editor container
const EditorContainer = styled(Box)`
  .quill {
    border-radius: 4px;
    border: 1px solid #dcdce4;

    .ql-toolbar {
      border-bottom: 1px solid #dcdce4;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
    }

    .ql-container {
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      min-height: 200px;
    }
  }
`;

interface QuillEditorProps {
  name: string;
  onChange: (e: { target: { name: string; value: string } }) => void;
  value: string;
  disabled?: boolean;
  error?: string;
}

const QuillEditor: React.FC<QuillEditorProps> = ({
  name,
  onChange,
  value,
  disabled = false,
  error,
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
