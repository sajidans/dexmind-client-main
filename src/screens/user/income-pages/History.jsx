import React from 'react'
import { GlowButton } from '../../../components/ui/Buttons'
import HistoryTable from '../../user/HistoryTable'

const History = () => {
  return (
    <div className='p-10'>
          <GlowButton text="Asset History" onClick={() => console.log("Clicked")} />
          <div>
              <HistoryTable />
          </div>
    </div>
  )
}

export default History
