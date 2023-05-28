import { useEffect, useState } from 'react'

import api from 'services/api'

type HookProp = {
  route: string
}

export function useDefaultReport({ route }: HookProp) {
  const [load, setLoad] = useState<boolean>(true)
  const [data, setData] = useState(undefined)
  const [isFetching, setIsFetching] = useState<boolean>(false)

  useEffect(() => {
    if (load) {
      setIsFetching(true)
      fetch()
      setLoad(false)
    }
  }, [load, setLoad])

  async function fetch() {
    const { data } = await api.get(route)
    setIsFetching(false)
    setData(data)
  }

  async function refetch() {
    setLoad(true)
  }

  return {
    isFetching,
    data,
    refetch
  }
}
