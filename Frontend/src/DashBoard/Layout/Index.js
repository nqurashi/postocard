import React from 'react'
import Navebar from './Navebar'
import Sidebar from './Sidebar'

const Index = ({children}) => {
  return (
    <div>
        <Navebar/>
        {children}
        <Sidebar/>
    </div>
  )
}

export default Index