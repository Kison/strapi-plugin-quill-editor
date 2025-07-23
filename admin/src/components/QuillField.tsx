import React from 'react';
import { Field, Box, Typography } from '@strapi/design-system';
import { useIntl } from 'react-intl';
import QuillEditor from './QuillEditor';

interface QuillFieldProps {
  name: string;
  onChange: (e: { target: { name: string; value: string } }) => void;
  value: string;
  intlLabel: {
    id: string;
    defaultMessage: string;
  };
  required?: boolean;
  disabled?: boolean;
  error?: string;
  description?: {
    id: string;
    defaultMessage: string;
  };
  attribute?: {
    type: string;
  };
}

const QuillField: React.FC<QuillFieldProps> = ({
  name,
  onChange,
  value,
  intlLabel,
  required = false,
  disabled = false,
  error = '',
  description,
}) => {
  const { formatMessage } = useIntl();
  const labelId = `${name}-label`;
  const hintId = `${name}-hint`;
  const errorId = `${name}-error`;

  return (
    <Field name={name} id={name} error={error} hint={description && formatMessage(description)}>
      <Box>
        <Box paddingBottom={1}>
          <Typography variant="pi" fontWeight="bold" textColor="neutral800" id={labelId}>
            {formatMessage(intlLabel)}
            {required && (
              <Typography textColor="danger600" fontWeight="bold" as="span">
                *
              </Typography>
            )}
          </Typography>
        </Box>
        <Box paddingBottom={1}>
          <QuillEditor
            name={name}
            onChange={onChange}
            value={value}
            disabled={disabled}
            error={error}
          />
        </Box>
        {description && (
          <Box paddingBottom={1}>
            <Typography variant="pi" id={hintId}>
              {formatMessage(description)}
            </Typography>
          </Box>
        )}
        {error && (
          <Box>
            <Typography variant="pi" textColor="danger600" id={errorId}>
              {error}
            </Typography>
          </Box>
        )}
      </Box>
    </Field>
  );
};

export default QuillField;
