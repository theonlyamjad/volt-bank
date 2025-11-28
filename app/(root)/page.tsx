import HeaderBox from '@/components/HeaderBox'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import RightSidebar from '@/components/RightSidebar'
import { getLoggedInUser } from '@/lib/actions/user.action'
import { redirect } from 'next/navigation'
import type { IBank } from '@/lib/models/Bank'
import type { ITransaction } from '@/lib/models/Transaction'

const Home = async () => {
  // Fetch logged-in user data
  const loggedIn = await getLoggedInUser();

  // Redirect if not authenticated
  if (!loggedIn) {
    redirect('/sign-in');
  }

  // TODO: Fetch user's banks and transactions
  const userBanks: IBank[] = [];
  const userTransactions: ITransaction[] = [];
  const totalBanks = 0;
  const totalCurrentBalance = 0;

  return (
    <section className='home'>
      <div className='home-content'>
        <header className='home-header'>
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.firstName || "Guest"}
            subtext="A modern, youth-focused digital banking experience built for speed, simplicity and control."
          />
          <TotalBalanceBox
            accounts={[]}
            totalBanks={totalBanks}
            totalCurrentBalance={totalCurrentBalance}
          />
        </header>
        RECENT TRANSACTIONS
      </div>
      <RightSidebar 
        user={loggedIn}
        transactions={userTransactions}
        banks={userBanks}
      />
    </section>
  )
}

export default Home