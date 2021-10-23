import { useRouter } from 'next/router'
import { supabase } from '../../utils/supabaseClient'

const Poll = ({ user }) => {
    const router = useRouter()
    const { id } = router.query

    return <p>Post: {id} User: {user}</p>
}

export async function getServerSideProps({ req }) {
    const { user } = await supabase.auth.api.getUserByCookie()

    if (!user) {
        // If no user, redirect to index.
        console.log(user)
        //return { props: {}, redirect: { destination: '/', permanent: false } }
    }

    // If there is a user, return it.
    return { props: { user } }
}

export default Poll