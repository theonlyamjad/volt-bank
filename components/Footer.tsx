'use client'

import { logoutAccount } from '@/lib/actions/user.action'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FooterProps } from '@/types/index'

const Footer = ({ user, type = 'desktop' }: FooterProps) => {
  const router = useRouter();

  const handleLogOut = async () => {
    try {
      const result = await logoutAccount();
      
      if (result?.success) {
        router.push('/sign-in');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  return (
    <footer className="footer">
      <div className={type === 'mobile' ? 'footer_name-mobile' : 'footer_name'}>
        <p className="text-xl font-bold text-gray-700">
          {user?.firstName?.[0] || 'U'}
        </p>
      </div>

      <div className={type === 'mobile' ? 'footer_email-mobile' : 'footer_email'}>
          <h1 className="text-14 truncate text-gray-700 font-semibold">
            {user?.firstName}
          </h1>
          <p className="text-14 truncate font-normal text-gray-600">
            {user?.emails}
          </p>
      </div>

      <div className="footer_image cursor-pointer" onClick={handleLogOut}>
        <Image src="/icons/logout.svg" width={20} height={20} alt="logout" />
      </div>
    </footer>
  )
}

export default Footer