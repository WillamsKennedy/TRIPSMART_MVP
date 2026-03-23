import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const N8N_BASE_URL = 'https://willamsknd.app.n8n.cloud/webhook';
serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, params } = await req.json();

    const webhookPaths: Record<string, string> = {
      'get-tourist-spots': '/get-tourist-spots',
      'get-accommodations': '/get-accommodations',
      'get-restaurants': '/get-restaurants',
      'get-transport-prices': '/get-transport-prices',
      'generate-itinerary': '/generate-itinerary',
    };

    const path = webhookPaths[action];
    if (!path) {
      return new Response(
        JSON.stringify({ success: false, error: `Unknown action: ${action}` }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const webhookUrl = `${N8N_BASE_URL}${path}`;
    console.log(`Calling n8n webhook: ${webhookUrl}`);

    console.log('Payload:', params);//-----------------

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });

    console.log('Payload:', params);//---------------

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`n8n webhook failed [${response.status}]: ${errorBody}`);
    }

    const data = await response.json();

    return new Response(
      JSON.stringify({ success: true, data }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: unknown) {
    console.error('n8n webhook error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ success: false, error: message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
