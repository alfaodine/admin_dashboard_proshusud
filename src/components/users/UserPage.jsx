import React from 'react'
import { useContext } from 'react';
import FirebaseContext from '../../context/FirebaseContext';
import PageUserLayout from './PageUserLayout';



function UserPage() {

    function getPathInfo(){
        let path = window.location.href
        let startIndex = path.lastIndexOf('=')
        let userEmail = path.substring(startIndex+1)
        return userEmail
    }
    let userEmail = getPathInfo()
    const {myList, myUsers} = useContext(FirebaseContext)

    let userInfo = myUsers.filter((item) => {
        if (item.email === userEmail){
            return item
        }
    })

    let userOrders = myList.filter((item) => {
        if (item.email === userEmail){
            return item
        }
    })

    console.log(userInfo[0])

  return (
    <PageUserLayout userInfo={userInfo[0]} userOrders={userOrders} />
  )
}

export default UserPage