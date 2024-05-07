import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://gliscfokeivkvdrwzlsv.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdsaXNjZm9rZWl2a3Zkcnd6bHN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MDQ0MDEsImV4cCI6MjAzMDA4MDQwMX0.XTXSScKdkRFNKbvB5lbPy8-XBtEec7oMac29BSb71Is"
;

export const supabase = createClient(supabaseUrl, supabaseKey);


