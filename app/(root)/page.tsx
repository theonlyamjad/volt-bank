import HeaderBox from '@/components/HeaderBox'
import React from 'react'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import RightSidebar from '@/components/RightSidebar';

const Home = () => {

  const loggedIn = {firsName: "Amjad",lastName:"Ben amara",email:"amjad@gmail.com"};

  return (
    <section className='home'>
      <div className='home-content'>
        <header className='home-header'>
          <HeaderBox
          type="greeting"
          title="Welcome"
          user = {loggedIn?.firsName || "Guest"}
          subtext = "A modern, youth-focused digital banking experience built for speed, simplicity and control."
          />
          <TotalBalanceBox
          accounts={[]}
          totalBanks={1}
          totalCurrentBalance={1250.35}
          />
        </header>
        RECENT TRANSACTIONS
      </div>
      <RightSidebar 
        user={loggedIn}
        transactions={[]}
        banks={[{currentBalance:500},{currentBalance:1000}]}
        />
    </section>
  )
}

export default Home
