import { createClient } from "@supabase/supabase-js"

const config = useRuntimeConfig()

// Initialize Supabase client

const supabase = createClient(
    config.supabaseUrl,
    config.supabaseAnonKey
)

// ✅ Email validation helper
function isValidEmail(email: string): boolean {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
}

export default defineEventHandler(async (event) => {
    // Verify origin
    const origin = (getHeader(event, "origin") || getHeader(event, "referer") || "").replace(/\/$/, "")
    const ALLOWED_ORIGIN = ['http://localhost:3000', 'https://arinzejustin.netlify.app']; // e.g. https://yourdomain.com
    if (!ALLOWED_ORIGIN.includes(origin)) {
        return { status: false, message: "Unauthorized request" }
    }

    // Parse body
    const body = await readBody<{ email: string }>(event)
    const email = body.email?.toLowerCase()?.trim()

    if (!email || !isValidEmail(email)) {
        return { status: false, message: "Invalid email address." }
    }

    // 🔍 Check if email exists
    const { data, error } = await supabase
        .from("subscribers")
        .select("email")
        .eq("email", email)

    if (error) return { status: false, message: error.message }

    if (!data || data.length === 0) {
        return { status: false, message: "Email is not subscribed." }
    }

    // ❌ Remove from table
    const { error: delError } = await supabase
        .from("subscribers")
        .delete()
        .eq("email", email)

    if (delError) return { status: false, message: delError.message }

    return { status: true, message: "Successfully unsubscribed!" }
})
