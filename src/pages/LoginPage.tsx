import { Button, Center, Text, Stack, Flex } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';

export const REDIRECT_URI = 'http://localhost:5173/home';

export const GOOGLE_CLIENT_ID =
  '382921464283-7i13lqaj0skejg2oksn7gnsenuons90q.apps.googleusercontent.com';
export const GOOGLE_SECRET_KEY = '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';

export const GITHUB_CLIENT_ID = '519820bf4bdd0f5a51e3';
export const GITHUB_SECRET_KEY = 'f4ac2e5f55df933cb70309e2f3ee1dece31a763e';

const LoginPage = () => {
  // 구글 로그인 1번 방법
  const handleClickGoogleLogin = () => {
    window.location.href = `https://accounts.google.com/o/oauth2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=openid email profile`;
  };

  // 구글 로그인 2번 방법(라이브러리 사용)
  const handleClickGoogleLogin2 = useGoogleLogin({
    onSuccess: (res) => {
      window.location.href = REDIRECT_URI;
      console.log(res);
    },
    onError: (res) => console.log(res),
    flow: 'implicit',
  });

  const handleClickGithubLogin = () => {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}`;
  };

  return (
    <Flex p={10} height={'100vh'} justifyContent={'center'}>
      <Stack spacing={2} maxW={'md'} w={'full'} justifyContent={'space-evenly'}>
        <Image src="/images/puppy.png" alt="로그인 배경 화면" />
        <Center>
          <Text fontSize="2xl" fontWeight={'bold'}>
            사이드 프로젝트
          </Text>
        </Center>
        <Stack
          w={'full'}
          maxW={'md'}
          flexDirection={'column'}
          gap={2}
          marginInlineStart={'0'}>
          {/* 첫번째 방법 */}
          <Button
            variant={'outline'}
            leftIcon={<FcGoogle />}
            onClick={handleClickGoogleLogin}>
            <Center>
              <Text>Sign in with Google1</Text>
            </Center>
          </Button>
          {/* 두번째 방법 */}
          <Button
            variant={'outline'}
            leftIcon={<FcGoogle />}
            onClick={() => handleClickGoogleLogin2()}>
            <Center>
              <Text>Sign in with Google2</Text>
            </Center>
          </Button>
          <Button
            variant={'outline'}
            leftIcon={<FaGithub />}
            onClick={handleClickGithubLogin}>
            <Center>
              <Text>Sign in with Github</Text>
            </Center>
          </Button>
          <Button as={Link} to="/signup" variant={'outline'} p={'0'}>
            <Center>
              <Text>Create Account</Text>
            </Center>
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
};

export default LoginPage;

const Image = styled.img`
  border-radius: 20px;
  width: 100%;
  height: 50%;
  object-fit: cover;
`;
