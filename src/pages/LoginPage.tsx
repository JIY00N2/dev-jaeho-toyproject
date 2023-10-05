import { Button, Center, Text, Stack, Flex } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';

const GOOGLE_CLIENT_ID =
  '382921464283-7i13lqaj0skejg2oksn7gnsenuons90q.apps.googleusercontent.com';
const GOOGLE_REDIRECT_URI = 'http://localhost:5173/home';
const GITHUB_CLIENT_ID = '519820bf4bdd0f5a51e3';

// window.location.assign == window.location == window.location.href
const LoginPage = () => {
  // 구글 로그인 1번 방법
  const handleClickGoogleLogin = () => {
    window.location.href = `https://accounts.google.com/o/oauth2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=openid email profile`;
  };
  // 구글 로그인 2번 방법(라이브러리 사용)
  const handleClickGoogleLogin2 = useGoogleLogin({
    onSuccess: (res) => {
      window.location.href = GOOGLE_REDIRECT_URI;
      console.log(res);
    },
    onError: (res) => console.log(res),
    flow: 'auth-code',
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
            재호팀 사이드 프로젝트
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
          <Button variant={'outline'}>
            <Link to={'/signup'}>
              <Center>
                <Text>Create Account</Text>
              </Center>
            </Link>
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