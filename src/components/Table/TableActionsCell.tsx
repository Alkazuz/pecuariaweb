import { RxHamburgerMenu } from 'react-icons/rx'

import { Flex, Menu, MenuButton, MenuList, IconButton } from '@chakra-ui/react'

const TableActionsCell = ({ id, nameField, children, ...props }: any) => {
  return (
    <Flex direction="row">
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<RxHamburgerMenu />}
          variant="outline"
        />
        <MenuList>
          {children}
          {props.extra}
        </MenuList>
      </Menu>
    </Flex>
  )
}

TableActionsCell.defaultProps = {
  nameField: 'name',
  edit: true
}

export default TableActionsCell
