import { createClient } from "@supabase/supabase-js"

const config = useRuntimeConfig()

// Initialize Supabase client

const supabase = createClient(
    config.supabaseUrl,
    config.supabaseAnonKey
)

export default defineEventHandler(async (event) => {
    // Verify origin
    // const origin = (getHeader(event, "origin") || getHeader(event, "referer") || "").replace(/\/$/, "");
    // const ALLOWED_ORIGIN = ['http://localhost:3001', 'https://arinzejustin.netlify.app']; // e.g. https://yourdomain.com
    // if (!ALLOWED_ORIGIN.includes(origin)) {
    //     return { status: false, message: "Unauthorized request" };
    // }

    const { data, error } = await supabase.from("subscribers").select("email")

    if (error) return { status: false, message: error.message }

    return { status: true, emails: data.map(d => d.email) }
})
