import React, { useState } from 'react'
import SuspendedCard from './SuspendedCard'
import { Row } from 'antd'

const SuspendedList = () => {
    const [reload, setReload] = useState(1);
  return (
    <div style={{ background: "white", padding: "30px", borderRadius: "10px" }}>
    <Row gutter={[16, 16]}>
      {/* {blockUser?.map((blUser) => ( */}
        {/* <SuspendedCard key={blUser._id} data={blUser} setReload={setReload} /> */}
        <SuspendedCard  />
        <SuspendedCard  />
        <SuspendedCard  />
        <SuspendedCard  />
        <SuspendedCard  />
        <SuspendedCard  />
        <SuspendedCard  />
        <SuspendedCard  />
      {/* ))} */}
    </Row>
  </div>
  )
}

export default SuspendedList