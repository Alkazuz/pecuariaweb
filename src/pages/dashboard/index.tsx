import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { FaFilter } from 'react-icons/fa'

import { Button } from '@chakra-ui/react'

import { Sidebar } from 'components/Sidebar'

export default function Dashboard() {
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors }
  } = useForm()
  const startDate = watch('startDate')
  const endDate = watch('endDate')

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <Sidebar>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex w-full flex-col justify-between lg:flex-row">
          <div className="flex flex-col gap-2 justify-between w-full lg:flex-row lg:w-2/5">
            <div className="flex gap-2 items-center justify-between lg:justify-normal">
              <label htmlFor="startDate">Período inicial</label>
              <Controller
                name="startDate"
                control={control}
                rules={{}}
                render={({ field }) => (
                  <input className="p-2" type="date" {...field} />
                )}
              />
              {errors.startDate && <p>{errors.startDate.message as any}</p>}
            </div>
            <div className="flex gap-2 items-center justify-between lg:justify-normal">
              <label htmlFor="endDate">Período final</label>
              <Controller
                name="endDate"
                control={control}
                rules={{}}
                render={({ field }) => (
                  <input className="p-2" type="date" {...field} />
                )}
              />
              {errors.endDate && <p>{errors.endDate.message as any}</p>}
            </div>
          </div>
          <div className="flex w-full justify-end lg:w-auto">
            <Button
              className="w-full my-4 lg:w-uto lg:my-0"
              rightIcon={<FaFilter />}
              variant="solid"
              type="submit"
            >
              Filtrar
            </Button>
          </div>
        </div>
      </form>
    </Sidebar>
  )
}
