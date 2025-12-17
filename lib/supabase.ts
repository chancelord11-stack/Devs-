import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pyvjcslnymnknvadnmcz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5dmpjc2xueW1ua252YWRubWN6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU4OTAzMDAsImV4cCI6MjA4MTQ2NjMwMH0.r646GLIpy_B7pbFefJdXFcfxWVmEeZY6YM7L7rRc8NY';

export const supabase = createClient(supabaseUrl, supabaseKey);