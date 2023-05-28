import React from 'react'
import { RiRoadMapLine } from 'react-icons/ri'

import { IconButton } from '@chakra-ui/react'
import { createColumnHelper } from '@tanstack/react-table'
import dayjs from 'dayjs'
import { useDefaultReport } from 'hooks/useDefaultReport'

import GoogleMap from 'components/GoogleMap'
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
  latitude: number
  longitude: number
  created_at: string
  actions: string
}

const genre = {
  male: 'Macho',
  female: 'Fêmea'
}

export default function Nascimentos() {
  const { data } = useDefaultReport({ route: 'api/birth' })
  const [visible, setVisible] = React.useState(false)
  const [selected, setSelected] = React.useState<Birth | null>(null)

  const columnHelper = createColumnHelper<Birth>()

  const onClick = (info: any) => {
    setSelected(info.row.original)
    setVisible(true)
  }

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
    }),
    columnHelper.accessor('actions', {
      id: 'actions',
      header: () => <span>Ações</span>,
      cell: (info) => (
        <IconButton
          icon={<RiRoadMapLine onClick={() => onClick(info)} />}
          w={2}
          h={4}
          padding={0}
          variant="outline"
          onClick={() => onClick(info)}
          aria-label={''}
        />
      ),
      footer: (info) => info.column.id
    })
  ]

  if (!data) return <></>

  return (
    <Sidebar>
      <ChakraTable title="Nascimentos" columns={columns as any} data={data} />
      <GoogleMap
        lat={selected?.latitude || -16.1470305}
        lng={selected?.longitude || -57.345575}
        zoom={50}
        visible={visible}
        onClose={() => setVisible(false)}
      />
    </Sidebar>
  )
}
