import { useState } from 'react'
import { FaSortDown, FaSortUp } from 'react-icons/fa'

import {
  Box,
  Flex,
  Text,
  useColorModeValue,
  ButtonGroup,
  Button,
  Select
} from '@chakra-ui/react'
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  ColumnDef,
  flexRender,
  SortingState
} from '@tanstack/react-table'

type ChakraTableProps<T> = {
  columns: ColumnDef<T>[]
  data: T[]
  title: string
}

const ChakraTable = ({ columns, data, title }: ChakraTableProps<unknown>) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true
  })

  const bg = useColorModeValue('white', 'gray.800')

  return (
    <Box overflowX="auto" bg={bg} padding={5}>
      <Text fontWeight="bold" fontSize="xl" mb="1em">
        {title}
      </Text>
      <Box display="flex">
        {table.getHeaderGroups().map((headerGroup, hgIndex) => (
          <Flex flex="1" minWidth="0" key={hgIndex}>
            {headerGroup.headers.map((header, hIndex) => (
              <Box
                key={hIndex}
                flexGrow={1}
                flexBasis="0"
                fontWeight="bold"
                borderX="1px"
                borderY="1px"
                padding={2}
                borderColor="gray.200"
                onClick={() => header.column.getToggleSortingHandler()}
                _hover={{
                  cursor: headerGroup ? 'pointer' : 'default'
                }}
              >
                <Flex
                  alignItems="center"
                  display="flex"
                  justifyContent="space-between"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {{
                    asc: <FaSortUp />,
                    desc: <FaSortDown />
                  }[header.column.getIsSorted() as string] ?? null}
                </Flex>
              </Box>
            ))}
          </Flex>
        ))}
      </Box>
      <Box>
        {table.getRowModel().rows.map((row, index) => {
          return (
            <Flex flex="1" minWidth="0" key={index}>
              {row.getVisibleCells().map((cell, cIndex) => (
                <Box
                  flexGrow={1}
                  flexBasis="0"
                  borderX="1px"
                  borderBottom="1px"
                  padding={1}
                  borderColor="gray.200"
                  key={cIndex}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Box>
              ))}
            </Flex>
          )
        })}
      </Box>
      <Box
        display="flex"
        alignItems={'center'}
        justifyContent="flex-end"
        mt="1em"
      >
        <Select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value))
          }}
          width="auto"
          marginRight="1em"
        >
          {[10, 20, 50, 100].map((pageSizeOption) => (
            <option key={pageSizeOption} value={pageSizeOption}>
              Mostrar {pageSizeOption} por página
            </option>
          ))}
        </Select>
        <ButtonGroup size="sm">
          <Button
            onClick={() => table.setPageIndex(0)}
            isDisabled={!table.getCanPreviousPage()}
            variant="outline"
          >
            {'<<'}
          </Button>
          <Button
            onClick={() => table.previousPage()}
            isDisabled={!table.getCanPreviousPage()}
            variant="outline"
          >
            {'<'}
          </Button>
          {Array.from({ length: table.getPageCount() }, (_, i) => (
            <Button
              key={i}
              onClick={() => table.setPageIndex(i)}
              isDisabled={table.getState().pagination.pageIndex === i}
              variant="outline"
              backgroundColor={
                table.getState().pagination.pageIndex === i
                  ? '#81b33b'
                  : undefined
              }
              color={
                table.getState().pagination.pageIndex === i
                  ? 'white'
                  : undefined
              }
            >
              {i + 1}
            </Button>
          ))}
          <Button
            onClick={() => table.nextPage()}
            isDisabled={!table.getCanNextPage()}
            variant="outline"
          >
            {'>'}
          </Button>
          <Button
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            isDisabled={!table.getCanNextPage()}
            variant="outline"
          >
            {'>>'}
          </Button>
        </ButtonGroup>
      </Box>
    </Box>
  )
}

export default ChakraTable
