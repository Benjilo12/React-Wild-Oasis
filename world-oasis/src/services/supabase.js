import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://afieotbnxywmqtcuelka.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmaWVvdGJueHl3bXF0Y3VlbGthIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYwMzc0MTMsImV4cCI6MjAzMTYxMzQxM30.pKtaocVIc95BXf4_JA41XVrsePrI4ZwPQm4JtUXwjoo";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
