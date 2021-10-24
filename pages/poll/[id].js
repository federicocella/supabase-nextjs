import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../../utils/supabaseClient'

const Poll = ({ user }) => {
    const [loading, setLoading] = useState(true)
    const [poll, setPoll] = useState(true)
    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        getPoll()
    }, [user])

    async function getPoll() {
        try {
            setLoading(true)

            let { data, error, status } = await supabase
                .from('polls')
                .select('id, title, user')
                .match({ id: id, user: user.id })
                .single()

            if (error && status !== 406) {
                throw error
            }

            if (data) {
                console.log(data)
                setPoll(data)
            }
        } catch (error) {
            alert(error.message)
        } finally {
            setLoading(false)
        }
    }

    return <h1>{poll.title}</h1>
}

export async function getServerSideProps({ req }) {
    const { user } = await supabase.auth.api.getUserByCookie(req)

    if (!user) {
        // If no user, redirect to index.
        console.log(user)
        //return { props: {}, redirect: { destination: '/', permanent: false } }
    }

    // If there is a user, return it.
    return { props: { user } }
}

export default Poll