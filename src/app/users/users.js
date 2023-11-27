'use client'
import Link from 'next/link'
import React from 'react'

const Users = () => {
    return (
        <>
            <h1>
                Userslist
            </h1>
            <ul>
                <li><Link href="/users/aakash">Aakash</Link></li>
                <li><Link href="/users/sandeep">Sandeep</Link></li>
                <li><Link href="/users/sagar">Sagar</Link></li>
                <li><Link href="/users/deepak">Deepak</Link></li>
            </ul>
        </>
    )
}

export default Users
