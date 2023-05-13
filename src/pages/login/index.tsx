import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  FormErrorMessage,
  Alert,
  AlertIcon
} from '@chakra-ui/react'
import { PRIMARY_APP_COLOR } from 'constants/app'
import { AuthContext } from 'contexts/AuthContext'

type FormData = {
  email: string
  password: string
}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>()

  const { login } = useContext(AuthContext)
  const [unknownError, setUnknownError] = useState<string | null>(null)

  const onSubmit = async ({ email, password }: FormData) => {
    try {
      await login(email, password)
    } catch (err) {
      setUnknownError('Erro ao logar')
    }
  }

  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex flex={1}>
        <Image
          alt={'Login Image'}
          objectFit={'cover'}
          src={
            'https://opresenterural.com.br/wp-content/uploads/2023/01/shutterstock_2027984075.jpg'
          }
        />
      </Flex>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={4} w={'full'} maxW={'md'}>
          <Heading fontSize={'2xl'}>Faça o login com sua conta</Heading>

          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl id="email" isInvalid={!!errors.email}>
              <FormLabel>Email</FormLabel>
              <Input
                focusBorderColor={PRIMARY_APP_COLOR}
                type="email"
                {...register('email', {
                  required: 'Esse campo é obrigatório',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: 'Email inválido'
                  }
                })}
              />
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl id="password" isInvalid={!!errors.password}>
              <FormLabel>Senha</FormLabel>
              <Input
                focusBorderColor={PRIMARY_APP_COLOR}
                type="password"
                {...register('password', {
                  required: 'Esse campo é obrigatório'
                })}
              />
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>
            <Stack spacing={6}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}
              ></Stack>
              <Button
                type="submit"
                backgroundColor={PRIMARY_APP_COLOR}
                colorScheme={PRIMARY_APP_COLOR}
                variant={'solid'}
              >
                Entrar
              </Button>
            </Stack>
          </form>
          {unknownError && (
            <Alert status="error">
              <AlertIcon />
              {unknownError}
            </Alert>
          )}
        </Stack>
      </Flex>
    </Stack>
  )
}
