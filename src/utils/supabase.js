/* eslint-disable no-undef */
import { createClient }  from'@supabase/supabase-js';
const  supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
const  serviceKey = process.env.REACT_APP_SERVICE_KEY;
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;

export const supabase = createClient(supabaseUrl, supabaseKey);
export const supabaseService = createClient(supabaseUrl, serviceKey);