import React from 'react'

import { createColumnHelper } from '@tanstack/react-table'
import dayjs from 'dayjs'
import { useDefaultReport } from 'hooks/useDefaultReport'

import { Sidebar } from 'components/Sidebar'
import ChakraTable from 'components/Table'

type Birth = {
  id: number
  weight: number
  medication: string
  earring: number
  picket: number
  genre: 'male' | 'female'
  mother: string
  created_at: string
}

const genre = {
  male: 'Macho',
  female: 'Fêmea'
}

export default function Nascimentos() {
  const { data } = useDefaultReport({ route: 'api/birth' })

  const columnHelper = createColumnHelper<Birth>()

  const columns = [
    columnHelper.accessor('weight', {
      id: 'weight',
      cell: (info) => info.getValue(),
      header: () => <span>Peso</span>,
      footer: (info) => info.column.id
    }),
    columnHelper.accessor('medication', {
      id: 'medication',
      cell: (info) => info.getValue(),
      header: () => <span>Medicação</span>,
      footer: (info) => info.column.id
    }),
    columnHelper.accessor('earring', {
      id: 'earring',
      cell: (info) => info.getValue(),
      header: () => <span>Brinco</span>,
      footer: (info) => info.column.id
    }),
    columnHelper.accessor('picket', {
      id: 'picket',
      cell: (info) => info.getValue(),
      header: () => <span>Picket</span>,
      footer: (info) => info.column.id
    }),
    columnHelper.accessor('genre', {
      id: 'genre',
      cell: (info) => genre[info.getValue()],
      header: () => <span>Gênero</span>,
      footer: (info) => info.column.id
    }),
    columnHelper.accessor('mother', {
      id: 'mother',
      cell: (info) => info.getValue(),
      header: () => <span>Mãe</span>,
      footer: (info) => info.column.id
    }),
    columnHelper.accessor('created_at', {
      id: 'created_at',
      cell: (info) => dayjs(info.getValue()).format('DD/MM/YYYY HH:mm:ss'),
      header: () => <span>Registrado em</span>,
      footer: (info) => info.column.id
    })
  ]

  if (!data) return <></>

  return (
    <Sidebar>
      <ChakraTable title="Nascimentos" columns={columns} data={data} />
    </Sidebar>
  )
}
