import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, params } = await req.json();
    const N8N_WEBHOOK_BASE_URL = Deno.env.get('N8N_WEBHOOK_BASE_URL');

    if (!N8N_WEBHOOK_BASE_URL) {
      // Return mock response when n8n is not configured
      return new Response(
        JSON.stringify({
          success: true,
          mock: true,
          message: 'n8n webhook URL not configured. Using mock data.',
          data: null,
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Route to appropriate n8n webhook based on action
    const webhookUrls: Record<string, string> = {
      'get-states': `${N8N_WEBHOOK_BASE_URL}/get-states`,
      'get-tourist-spots': `${N8N_WEBHOOK_BASE_URL}/get-tourist-spots`,
      'get-accommodations': `${N8N_WEBHOOK_BASE_URL}/get-accommodations`,
      'get-restaurants': `${N8N_WEBHOOK_BASE_URL}/get-restaurants`,
      'get-routes': `${N8N_WEBHOOK_BASE_URL}/get-routes`,
      'get-transport-prices': `${N8N_WEBHOOK_BASE_URL}/get-transport-prices`,
    };

    const webhookUrl = webhookUrls[action];
    if (!webhookUrl) {
      return new Response(
        JSON.stringify({ success: false, error: `Unknown action: ${action}` }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });

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
