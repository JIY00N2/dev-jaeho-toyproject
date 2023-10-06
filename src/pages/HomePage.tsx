import { useCallback, useEffect, useRef } from 'react';
import {
  // GITHUB_CLIENT_ID,
  // GITHUB_SECRET_KEY,
  GOOGLE_CLIENT_ID,
  GOOGLE_SECRET_KEY,
  REDIRECT_URI,
} from './LoginPage';
import axios from 'axios';

const HomePage = () => {
  // 1. 인가코드
  const code = new URL(window.location.href).searchParams.get('code');
  console.log(code);

  // 2. code로 access Token 요청(googleToken)
  const getGoogleToken = async (code: string) => {
    const url = 'https://oauth2.googleapis.com/token';
    const data = `grant_type=authorization_code&client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&client_secret=${GOOGLE_SECRET_KEY}&code=${code}`;
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    };
    try {
      const response = await axios.post(url, data, { headers });
      return response.data;
    } catch (error) {
      // 오류 처리
      console.error('오류 발생:', error);
      throw error;
    }
  };

  // 사용 예시

  // const getGoogleToken = async (code: string) => {
  //   const response = await fetch(
  //     `https://oauth2.googleapis.com/token?grant_type=authorization_code&client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&client_secret=${GOOGLE_SECRET_KEY}&code=${code}`,
  //     {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
  //       },
  //     },
  //   );
  //   return response.json();
  // };

  // github Token
  // const getGithubToken = async (code: string) => {
  //   const response = await axios.post(
  //     'https://github.com/login/oauth/access_token',
  //     {
  //       code,
  //       client_id: GITHUB_CLIENT_ID,
  //       client_secret: GITHUB_SECRET_KEY,
  //       redirect_uri: REDIRECT_URI,
  //     },
  //     {
  //       headers: {
  //         accept: 'application/json',
  //       },
  //     },
  //   );
  //   return response;
  // };

  useEffect(() => {
    if (code) {
      getGoogleToken(code)
        .then((token) => {
          console.log('토큰:', token);
        })
        .catch((error) => {
          console.error('토큰 요청 중 오류 발생:', error);
        });
      // getGoogleToken(code).then((res) => {
      //   console.log(res.access_token);
      // });

      // getGithubToken(code).then((res) => {
      //   console.log(res.data.access_token);
      // });
    }
  }, [code]);

  // 구글 맵 지도
  const mapRef = useRef<HTMLDivElement>(null);

  const initMap = useCallback(() => {
    if (mapRef.current) {
      new window.google.maps.Map(mapRef.current, {
        center: { lat: 37.647213, lng: 127.070997 },
        zoom: 8,
      });
    }
  }, [mapRef]);

  useEffect(() => {
    initMap();
  }, [initMap]);

  return <div style={{ width: '100%', height: '100vh' }} ref={mapRef}></div>;
};

export default HomePage;
