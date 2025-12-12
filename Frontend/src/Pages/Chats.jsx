import React from 'react'
import { ChatState } from '../context/ChatProvider'
import { Box } from '@chakra-ui/react'
import SideDrawer from '../Components/miscellneous/SideDrawer'
import MyChats from '../Components/MyChats'
import ChatBox from '../Components/ChatBox'

const Chats = () => {
  const {user} = ChatState()
  return (
    <div style={{width:"100%"}}>
      {/* sidedrawer */}
      {user && <SideDrawer/>}
      
      <Box
      d="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px"
      >
        {user && <MyChats/>}
        {user && <ChatBox/>}
      </Box>
    </div>
  )
}

export default Chats
