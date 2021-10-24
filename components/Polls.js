import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import Link from 'next/link'

export default function Auth({ session }) {
    const [loading, setLoading] = useState(true)
    const [polls, setPolls] = useState(null)

    useEffect(() => {
        getPolls()
    }, [session])

    async function getPolls() {
        try {
            setLoading(true)
            const user = supabase.auth.user()

            let { data, error, status } = await supabase
                .from('polls')
                .select('title, user')
                .eq("user", session.user.id)

            if (error && status !== 406) {
                throw error
            }

            if (data) {
                console.log(data)
                setPolls(data)
            }
        } catch (error) {
            alert(error.message)
        } finally {
            setLoading(false)
        }
    }
    return (<ul>
        {polls ? polls.map((poll, i) => (
            <li key={poll.id}>
                <Link href={'/poll/' + (i + 1)}>
                    <a>{poll.title}</a>
                </Link>
            </li>)) : ''}
    </ul>)
}