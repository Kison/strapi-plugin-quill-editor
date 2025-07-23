import React from 'react';
import {
  Box,
  Field,
  Flex,
} from '@strapi/design-system';
import { useIntl } from 'react-intl';
import { useField, type InputProps } from '@strapi/strapi/admin';
import QuillEditor from './QuillEditor';
import { PLUGIN_ID } from '../pluginId';

type QuillFieldInputProps = InputProps & {
  labelAction?: React.ReactNode;
};

export const QuillFieldInput = ({
  name,
  hint,
  label,
  labelAction,
  required = false,
  disabled = false,
}: QuillFieldInputProps) => {
  const { formatMessage } = useIntl();
  const field = useField(name);
  const value = field.value ?? '';
  const error = field.error;

  return (
    <Field.Root name={name} id={name} error={error} hint={hint} required={required}>
      <Flex direction="column" alignItems="stretch" gap={1}>
        <Field.Label action={labelAction}>
          {label ??
            formatMessage({
              id: `${PLUGIN_ID}.quill.label`,
              defaultMessage: 'Rich Text (Quill)',
            })}
        </Field.Label>

        <Box paddingBottom={1}>
          <QuillEditor
            name={name}
            value={value}
            onChange={(e) => field.onChange(name, e.target.value)}
            disabled={disabled}
            error={error}
          />
        </Box>

        <Field.Hint />
        <Field.Error />
      </Flex>
    </Field.Root>
  );
};

export default QuillFieldInput;
