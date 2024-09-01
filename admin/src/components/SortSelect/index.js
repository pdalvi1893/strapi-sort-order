import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Combobox, ComboboxOption } from "@strapi/design-system/Combobox";
import { Stack } from "@strapi/design-system/Stack";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldHint,
} from "@strapi/design-system/Field";
import { useIntl } from "react-intl";

import { auth, useCMEditViewDataManager } from "@strapi/helper-plugin";

const NumberSelect = React.forwardRef(
  (
    {
      value,
      onChange,
      name,
      intlLabel,
      labelAction,
      required,
      attribute,
      description,
      placeholder,
      disabled,
      error,
    },
    forwardedRef
  ) => {
    const { formatMessage } = useIntl();
    const [numbersOptions, setNumbersOptions] = useState([]);
    const isValidValue =
      !value || numbersOptions.some((option) => option.value === value);
    const { layout } = useCMEditViewDataManager();
    let [backendFetch, min, max] = [
      attribute["options-backend-check"] || false,
      attribute["options-min"] && attribute["options-min"] >= 0
        ? attribute["options-min"]
        : 0,
      attribute["options-max"] && attribute["options-max"] >= 1
        ? attribute["options-max"]
        : 100,
    ];

    if (max < min) max = min + 1;

    useEffect(() => {
      const fetchNumbersOptions = async () => {
        try {
          let data = [];
          if (backendFetch) {
            const response = await fetch(
              `/sort-order/fetch/${layout.uid}/${name}`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${auth.getToken()}`,
                },
              }
            );
            data = await response.json();
          }

          data = Array.from({ length: max - min + 1 }, (_, index) => {
            const value = min + index;
            return {
              key: value,
              value: value,
              is_selected: data.some((item) => item === value), // Example logic: select the min value by default
            };
          });

          setNumbersOptions(data);
        } catch (err) {
          console.error("Failed to fetch numbers options", err);
        }
      };

      fetchNumbersOptions();
    }, []);

    return (
      <Field
        name={name}
        id={name}
        error={
          !isValidValue
            ? formatMessage(
                { id: "number-select.unsupported-number" },
                { value }
              )
            : error
        }
        required={required}
        hint={description && formatMessage(description)}
      >
        <Stack spacing={1}>
          <FieldLabel action={labelAction}>
            {formatMessage(intlLabel)}
          </FieldLabel>

          <Combobox
            ref={forwardedRef}
            placeholder={placeholder && formatMessage(placeholder)}
            aria-label={formatMessage(intlLabel)}
            aria-disabled={disabled}
            disabled={disabled}
            value={isValidValue ? value : null}
            onChange={(number) =>
              onChange({
                target: {
                  name: name,
                  value: number,
                  type: attribute.type,
                },
              })
            }
            onClear={() =>
              onChange({
                target: { name: name, value: "", type: attribute.type },
              })
            }
          >
            {numbersOptions
              .sort((a, b) => a.value - b.value)
              .map(({ key, value, is_selected }) => (
                <ComboboxOption value={value} key={key}>
                  <span
                    style={{
                      display: "inline-block",
                      width: "8px",
                      height: "8px",
                      backgroundColor: is_selected ? "blue" : "white", // Blue dot
                      borderRadius: "50%",
                      marginRight: "8px",
                    }}
                  />
                  {value}
                </ComboboxOption>
              ))}
          </Combobox>

          <FieldHint />
          <FieldError />
        </Stack>
      </Field>
    );
  }
);

NumberSelect.defaultProps = {
  description: null,
  disabled: false,
  error: null,
  labelAction: null,
  required: false,
  value: "",
};

NumberSelect.propTypes = {
  intlLabel: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  attribute: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.object,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  labelAction: PropTypes.object,
  required: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default NumberSelect;
