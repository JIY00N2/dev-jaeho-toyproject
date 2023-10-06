import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  Center,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import {
  registerSchema,
  type RegisterSchemaType,
} from '../utils/registerSchema';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
  });
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<RegisterSchemaType> = (data) => {
    navigate('/home');
    console.log(data);
  };

  return (
    <Center w={'full'} h={'100vh'}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Center>
          <Text fontSize={'xl'} fontWeight={'bold'}>
            회원 정보 입력
          </Text>
        </Center>
        <FormControl isInvalid={!!errors.email} isRequired>
          <FormLabel htmlFor="email">Email 입력</FormLabel>
          <Input
            id="email"
            placeholder="Email 입력해주세요"
            {...register('email')}
          />
          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.userId} isRequired>
          <FormLabel htmlFor="userId">아이디 입력</FormLabel>
          <Input
            id="userId"
            placeholder="아이디를 입력해주세요"
            {...register('userId')}
          />
          <FormErrorMessage>
            {errors.userId && errors.userId.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.password} isRequired>
          <FormLabel htmlFor="password">비밀번호 입력</FormLabel>
          <Input
            id="password"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            {...register('password')}
          />
          <FormErrorMessage>
            {errors.password && errors.password.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.passwordCheck} isRequired>
          <FormLabel htmlFor="passwordCheck">비밀번호 확인 입력</FormLabel>
          <Input
            id="passwordCheck"
            type="password"
            placeholder="비밀번호 확인을 입력해주세요"
            {...register('passwordCheck')}
          />
          <FormErrorMessage>
            {errors.passwordCheck && errors.passwordCheck.message}
          </FormErrorMessage>
        </FormControl>
        <Button
          mt={4}
          colorScheme="teal"
          isLoading={isSubmitting}
          type="submit">
          Submit
        </Button>
      </form>
    </Center>
  );
};

export default SignUpPage;
