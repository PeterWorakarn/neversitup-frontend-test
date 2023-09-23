import { NextPage } from 'next';
import { useEffect } from 'react';
import { authTokenHandler } from '../../utils/constant';
import { useRouter } from 'next/router';

export const withPageAuth = (Page: NextPage) => {
  const PageWithAuth: NextPage = (props) => {
    const router = useRouter()
    useEffect(() => {
      if (!authTokenHandler.get()) {
        router.push('/login')
      }
    }, [])
    return <Page {...props} />;
  }
  return PageWithAuth
}