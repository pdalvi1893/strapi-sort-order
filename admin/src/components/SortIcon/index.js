import React from "react";
import styled from "styled-components";
import { Icon } from "@strapi/design-system/Icon";
import { Flex } from "@strapi/design-system/Flex";
import ArrowDown from "@strapi/icons/ArrowDown";

const IconBox = styled(Flex)`
  background-color: #f0f0ff; /* primary100 */
  border: 1px solid #d9d8ff; /* primary200 */

  svg {
    transform: scale(0.8); /* Scale down the icon */
  }

  svg > path {
    fill: #4945ff; /* primary600 */
  }
`;

const SortSelectIcon = () => {
  return (
    <IconBox
      justifyContent="center"
      alignItems="center"
      width={7}
      height={6}
      hasRadius
      aria-hidden
    >
      <Icon as={ArrowDown}  />
    </IconBox>
  );
};

export default SortSelectIcon;
